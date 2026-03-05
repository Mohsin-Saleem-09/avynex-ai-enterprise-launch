import io
import os
import json
import logging
from typing import List, Tuple, Optional

import streamlit as st
from PIL import Image
import numpy as np

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def run_easyocr_on_image(image_path: str, langs: List[str], use_gpu: bool):
    """Run EasyOCR and return results list of (bbox, text, confidence)."""
    try:
        import easyocr
    except Exception as e:
        st.error(f"easyocr import error: {e}")
        return []

    reader = easyocr.Reader(langs, gpu=use_gpu)
    results = reader.readtext(image_path)
    return results


def draw_annotations_pil(image: Image.Image, results) -> Image.Image:
    """Draw bounding boxes and text on image using PIL/OpenCV if available."""
    img = image.convert("RGB")
    # Try OpenCV drawing for better visuals
    try:
        import cv2

        arr = np.array(img)[:, :, ::-1].copy()  # RGB->BGR
        for bbox, text, conf in results:
            pts = np.array(bbox, dtype=np.int32)
            cv2.polylines(arr, [pts], isClosed=True, color=(0, 255, 0), thickness=2)
            # Put text near first point, ensure inside image
            x, y = int(pts[0][0]), int(pts[0][1])
            y = max(10, y)
            # truncate text to avoid overflow
            disp_text = text if len(text) < 200 else text[:200] + "..."
            cv2.putText(arr, disp_text, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 2)
        out = Image.fromarray(arr[:, :, ::-1])
        return out
    except Exception:
        # PIL fallback
        from PIL import ImageDraw, ImageFont

        draw = ImageDraw.Draw(img)
        try:
            font = ImageFont.load_default()
        except Exception:
            font = None
        for bbox, text, conf in results:
            pts = [(int(p[0]), int(p[1])) for p in bbox]
            draw.polygon(pts, outline="lime")
            draw.text(pts[0], text, fill="red", font=font)
        return img


def filter_results_by_confidence(results, threshold: float):
    """Filter OCR results by confidence threshold."""
    filtered = []
    for bbox, text, conf in results:
        if conf >= threshold:
            filtered.append((bbox, text, conf))
    return filtered


def results_to_text(results) -> str:
    lines = []
    for bbox, text, conf in results:
        lines.append(f"{conf:.3f}\t{text}")
    return "\n".join(lines)


def call_gemini_for_refinement(ocr_text: str) -> Tuple[bool, str]:
    """
    Send OCR text to Gemini 2.5-flash for refinement.
    
    Task: Understand NAB application content, correct grammar, fix OCR errors,
    improve formatting, preserve original meaning.
    
    Returns: (success: bool, refined_text: str)
    """
    api_key = "AIzaSyBQDl03SE4aWCi8sxUFStbb3u4BHWZYs48"
    
    if not api_key:
        error_msg = (
            "❌ GEMINI_API_KEY not set!\n\n"
            "To fix:\n"
            "1. Get your API key: https://aistudio.google.com/app/apikeys\n"
            "2. Run in terminal: export GEMINI_API_KEY='your-key-here'\n"
            "3. Refresh this page"
        )
        logger.error(error_msg)
        return False, error_msg
    
    if len(api_key) < 20:
        return False, "❌ Invalid GEMINI_API_KEY format (too short)"
    
    try:
        import google.generativeai as genai
        
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-2.5-flash")
        
        # Refined prompt for NAB application text refinement
        refinement_prompt = f"""You are an expert text refinement specialist. Your task is to:

1. Correct all grammatical mistakes
2. Fix OCR errors (misrecognized characters, broken words, etc.)
3. Improve formatting and readability (add proper spacing, paragraphs)
4. Preserve the original meaning and intent
5. Ensure professional tone suitable for official documents

The text below appears to be from a National Accountability Bureau (NAB) application. 
Please refine it while maintaining all critical information and document structure.

Return ONLY the refined text, no explanations or commentary.

Original OCR Text:
---
{ocr_text}
---

Refined Text:
"""
        
        logger.info("Calling Gemini 2.5-flash API...")
        response = model.generate_content(refinement_prompt)
        refined_text = response.text.strip()
        
        logger.info("✅ Gemini refinement successful")
        return True, refined_text
        
    except ImportError:
        # Fallback to HTTP API if google-generativeai not installed
        logger.warning("google-generativeai not installed, using HTTP API...")
        
        try:
            import requests
            
            url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"
            headers = {"Content-Type": "application/json"}
            
            refinement_prompt = f"""You are an expert text refinement specialist. Your task is to:

1. Correct all grammatical mistakes
2. Fix OCR errors (misrecognized characters, broken words, etc.)
3. Improve formatting and readability (add proper spacing, paragraphs)
4. Preserve the original meaning and intent
5. Ensure professional tone suitable for official documents

The text below appears to be from a National Accountability Bureau (NAB) application.
Please refine it while maintaining all critical information and document structure.

Return ONLY the refined text, no explanations or commentary.

Original OCR Text:
---
{ocr_text}
---

Refined Text:
"""
            
            payload = {
                "contents": [
                    {
                        "parts": [{"text": refinement_prompt}]
                    }
                ]
            }
            
            response = requests.post(
                f"{url}?key={api_key}",
                json=payload,
                headers=headers,
                timeout=60
            )
            
            if response.status_code == 200:
                result = response.json()
                if "candidates" in result and len(result["candidates"]) > 0:
                    refined_text = result["candidates"][0]["content"]["parts"][0]["text"]
                    logger.info("✅ Gemini refinement successful (HTTP)")
                    return True, refined_text
                else:
                    return False, "❌ No response from Gemini"
            elif response.status_code == 400 and "API_KEY_INVALID" in response.text:
                return False, "❌ Invalid GEMINI_API_KEY. Get a valid one: https://aistudio.google.com/app/apikeys"
            else:
                error_detail = response.text[:200]
                return False, f"❌ Gemini API Error {response.status_code}: {error_detail}"
        
        except Exception as e:
            logger.error(f"HTTP API error: {str(e)}")
            return False, f"❌ Gemini API Error: {str(e)}"
    
    except Exception as e:
        logger.error(f"Gemini error: {str(e)}")
        return False, f"❌ Gemini Error: {str(e)}"


def main():
    st.set_page_config(page_title="EasyOCR + Gemini Refinement", layout="wide")
    st.title("🔍 EasyOCR + ✨ Gemini Text Refinement")
    st.markdown("Extract text with OCR, refine with Gemini 2.5-flash")

    with st.sidebar:
        st.header("⚙️ Settings")
        langs = st.multiselect(
            "Languages (EasyOCR)",
            options=["en", "ur", "fr", "es", "de", "zh", "ja"],
            default=["en"],
        )
        use_gpu = st.checkbox("Use GPU (requires CUDA)", value=False)
        use_gemini = st.checkbox("✨ Refine with Gemini 2.5-flash", value=True)
        
        st.markdown("---")
        st.subheader("🎯 Confidence Threshold")
        confidence_threshold = st.slider(
            "Filter detections by confidence",
            min_value=0.0,
            max_value=1.0,
            value=0.5,
            step=0.05,
            help="Only extract text with confidence >= this threshold. Lower = more text (including errors), Higher = only high-confidence text"
        )
        st.caption(f"Threshold: {confidence_threshold:.2f} (0%={confidence_threshold*100:.0f}%)")
        
        if use_gemini:
            st.markdown("---")
            # st.info("Gemini will refine OCR text for:\n- Grammar correction\n- OCR error fixing\n- Format improvement\n- NAB application content")
        
        st.markdown("---")
        uploaded_file = st.file_uploader("Upload image", type=["jpg", "jpeg", "png", "webp"])
        st.markdown("---")
        # st.markdown(
        #     "**Notes:**\n- OCR runs only when you click the button\n- GPU must be configured for EasyOCR to use it\n- Gemini API key from `GEMINI_API_KEY` environment variable"
        # )

    if uploaded_file is None:
        st.info("📤 Please upload an image to begin.")
        return

    # Save uploaded file to a temp path for easyocr
    img = Image.open(uploaded_file).convert("RGB")
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)

    tmp_path = "/tmp/easyocr_streamlit_upload.png"
    with open(tmp_path, "wb") as f:
        f.write(buf.read())

    st.image(img, caption="Uploaded image", use_column_width=True)

    if st.button("🚀 Run OCR" + (" + Gemini" if use_gemini else "")):
        with st.spinner("🔍 Running EasyOCR..."):
            results = run_easyocr_on_image(tmp_path, langs, use_gpu)

        if not results:
            st.warning("⚠️ No detections returned.")
            return

        # Filter by confidence threshold
        filtered_results = filter_results_by_confidence(results, confidence_threshold)
        
        # Display statistics
        st.markdown("---")
        col_stats1, col_stats2, col_stats3 = st.columns(3)
        with col_stats1:
            st.metric("Total Detections", len(results))
        with col_stats2:
            st.metric("After Filtering", len(filtered_results))
        with col_stats3:
            pct_kept = (len(filtered_results) / len(results) * 100) if results else 0
            st.metric("Data Kept", f"{pct_kept:.1f}%")

        # Draw annotations (using filtered results)
        annotated = draw_annotations_pil(img, filtered_results)
        
        # Get raw OCR text (using filtered results)
        ocr_text = results_to_text(filtered_results)
        ocr_text_clean = "\n".join([text for bbox, text, conf in filtered_results])

        # Gemini refinement
        refined_text = None
        if use_gemini:
            with st.spinner("✨ Refining text with Gemini 2.5-flash..."):
                success, refined_text = call_gemini_for_refinement(ocr_text_clean)
                if success:
                    st.success("✅ Gemini refinement complete!")
                else:
                    st.error(refined_text)
                    refined_text = None

        # Display results
        st.markdown("---")
        st.subheader("📊 Results")

        col_img, col_text = st.columns([1, 1.2])
        
        with col_img:
            st.subheader("📸 Annotated Image")
            st.image(annotated)
            # Download annotated image
            out_buf = io.BytesIO()
            annotated.save(out_buf, format="PNG")
            out_buf.seek(0)
            st.download_button(
                "📥 Download Annotated Image",
                data=out_buf,
                file_name="annotated.png",
                mime="image/png"
            )

        with col_text:
            if refined_text and use_gemini:
                # Show tabs for original vs refined
                tab1, tab2 = st.tabs(["📝 Original OCR", "✨ Refined Text"])
                
                with tab1:
                    st.text_area(
                        "Original OCR Text",
                        value=ocr_text_clean,
                        height=400,
                        disabled=True
                    )
                    st.download_button(
                        "📥 Download Original Text",
                        data=ocr_text_clean,
                        file_name="ocr_original.txt",
                        mime="text/plain"
                    )
                
                with tab2:
                    st.text_area(
                        "Refined Text (Gemini 2.5-flash)",
                        value=refined_text,
                        height=400,
                        disabled=True
                    )
                    st.download_button(
                        "📥 Download Refined Text",
                        data=refined_text,
                        file_name="ocr_refined.txt",
                        mime="text/plain"
                    )
                
                # Save both to file option
                st.markdown("**💾 Save Both Texts:**")
                combined_output = f"""
ORIGINAL OCR TEXT
{'='*60}
{ocr_text_clean}

{'='*60}
REFINED TEXT (Gemini 2.5-flash)
{'='*60}
{refined_text}
"""
                st.download_button(
                    "📥 Download Combined (Original + Refined)",
                    data=combined_output,
                    file_name="ocr_combined.txt",
                    mime="text/plain"
                )
            else:
                # Only show OCR results (no Gemini)
                st.subheader("📝 OCR Detections")
                st.text_area(
                    "Confidence \t Text",
                    value=ocr_text,
                    height=400,
                    disabled=True
                )
                st.download_button(
                    "📥 Download OCR Text",
                    data=ocr_text_clean,
                    file_name="ocr_results.txt",
                    mime="text/plain"
                )


if __name__ == "__main__":
    main()
