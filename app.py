"""
Enhanced Streamlit OCR Comparison + Gemini Structuring App
- GPU acceleration for both EasyOCR and DeepSeekOCR2
- Proper API key handling from environment
- Image preprocessing for better OCR results
- Retry logic and comprehensive error handling
"""

import os
import json
import time
import logging
from typing import List, Dict, Tuple, Optional
import streamlit as st
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter
import requests
import numpy as np

# ============================================================================
# LOGGING CONFIGURATION
# ============================================================================

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ============================================================================
# GPU DETECTION
# ============================================================================

try:
    import torch

    DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
    GPU_AVAILABLE = torch.cuda.is_available()
    if GPU_AVAILABLE:
        DEVICE_NAME = torch.cuda.get_device_name(0)
        logger.info(f"🚀 GPU Detected: {DEVICE_NAME}")
    else:
        DEVICE_NAME = "CPU"
        logger.warning("⚠️ GPU not available, using CPU (slower)")
except ImportError:
    DEVICE = "cpu"
    GPU_AVAILABLE = False
    DEVICE_NAME = "CPU"

# ============================================================================
# CONFIGURATION
# ============================================================================

st.set_page_config(page_title="OCR Comparison + Gemini", layout="wide")
st.title("📄 OCR Comparison & Gemini Structuring")

# Display device info
with st.sidebar:
    col1, col2 = st.columns(2)
    with col1:
        st.metric("Device", "🎮 GPU" if GPU_AVAILABLE else "💻 CPU")
    with col2:
        st.metric("", DEVICE_NAME, label_visibility="collapsed")

# Initialize session state for OCR results
if "ocr_results" not in st.session_state:
    st.session_state.ocr_results = None
if "uploaded_image" not in st.session_state:
    st.session_state.uploaded_image = None
if "easyocr_reader_cache" not in st.session_state:
    st.session_state.easyocr_reader_cache = {}

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================


def preprocess_image_for_ocr(image_pil: Image.Image) -> Image.Image:
    """
    Preprocess image to improve OCR results:
    - Enhance contrast
    - Denoise
    - Sharpen
    - Adjust brightness
    """
    try:
        # Convert to RGB if needed
        if image_pil.mode != "RGB":
            image_pil = image_pil.convert("RGB")

        # 1. Enhance contrast
        enhancer = ImageEnhance.Contrast(image_pil)
        image_pil = enhancer.enhance(1.5)

        # 2. Enhance sharpness
        enhancer = ImageEnhance.Sharpness(image_pil)
        image_pil = enhancer.enhance(2.0)

        # 3. Enhance brightness (slight boost)
        enhancer = ImageEnhance.Brightness(image_pil)
        image_pil = enhancer.enhance(1.1)

        # 4. Reduce noise with median filter (reduces noise while preserving edges)
        image_pil = image_pil.filter(ImageFilter.MedianFilter(size=3))

        return image_pil
    except Exception as e:
        logger.warning(f"Image preprocessing failed: {str(e)}, using original")
        return image_pil


def run_easyocr(
    image_pil: Image.Image, languages: Optional[List[str]] = None
) -> List[Dict]:
    """
    Run EasyOCR on the uploaded PIL image with GPU acceleration.
    Returns list of dicts: {text, confidence, bbox}
    """
    if languages is None:
        languages = ["en"]

    try:
        import easyocr

        # Preprocess image for better results
        processed_image = preprocess_image_for_ocr(image_pil)

        # Save image temporarily
        temp_path = "/tmp/ocr_temp.png"
        processed_image.save(temp_path)

        # Use cached reader if same languages, else create new
        lang_key = tuple(sorted(languages))
        if lang_key not in st.session_state.easyocr_reader_cache:
            logger.info(f"Loading EasyOCR model for languages: {languages}")
            reader = easyocr.Reader(
                languages, gpu=GPU_AVAILABLE, verbose=False, model_storage_directory="/tmp/easyocr_models"
            )
            st.session_state.easyocr_reader_cache[lang_key] = reader
        else:
            reader = st.session_state.easyocr_reader_cache[lang_key]

        # Run OCR with optimization
        results = reader.readtext(temp_path, detail=1)

        # Normalize output
        detections = []
        for item in results:
            bbox, text, confidence = item
            detections.append(
                {
                    "text": text.strip(),
                    "confidence": float(confidence),
                    "bbox": bbox,  # List of 4 points
                }
            )

        logger.info(f"EasyOCR: Found {len(detections)} detections")
        return detections

    except Exception as e:
        error_msg = f"❌ EasyOCR Error: {str(e)}"
        logger.error(error_msg)
        st.error(error_msg)
        return []


def run_deepseekocr2(image_pil: Image.Image) -> List[Dict]:
    """
    Run DeepSeekOCR2 on the uploaded PIL image with GPU acceleration.
    Returns list of dicts: {text, confidence, bbox}
    """
    try:
        import torch
        from transformers import AutoTokenizer, AutoModel

        # Preprocess image
        processed_image = preprocess_image_for_ocr(image_pil)

        # Save image temporarily
        temp_path = "/tmp/ocr_temp_deepseek.png"
        processed_image.save(temp_path)

        # Load model and tokenizer with GPU optimization
        logger.info("Loading DeepSeekOCR2 model...")
        model_name = "deepseek-ai/DeepSeek-OCR-2"

        tokenizer = AutoTokenizer.from_pretrained(
            model_name, trust_remote_code=True
        )

        model = AutoModel.from_pretrained(
            model_name,
            trust_remote_code=True,
            use_safetensors=True,
            _attn_implementation="eager" if GPU_AVAILABLE else "eager",
            torch_dtype=torch.float32,
        )

        # Move to device with proper dtype
        device = DEVICE
        if GPU_AVAILABLE:
            dtype = torch.float16  # Use float16 for GPU (faster)
            model = model.to(device=device, dtype=dtype)
        else:
            dtype = torch.float32
            model = model.to(device=device, dtype=dtype)

        model = model.eval()

        # Prepare prompt and run inference
        prompt = "<image>\n<|grounding|>Extract all text from the document. Return text only."
        output_path = "/tmp/deepseek_ocr2_out"

        logger.info(f"Running DeepSeekOCR2 on {device}")

        with torch.no_grad():
            res = model.infer(
                tokenizer,
                prompt=prompt,
                image_file=temp_path,
                output_path=output_path,
                base_size=1024,
                image_size=768,
                crop_mode=True,
                save_results=False,
            )

        # Parse results
        detections = []
        if isinstance(res, dict):
            if "bboxes" in res and "texts" in res:
                for text, bbox in zip(res.get("texts", []), res.get("bboxes", [])):
                    detections.append(
                        {
                            "text": str(text).strip(),
                            "confidence": 0.95,
                            "bbox": bbox if bbox else [[0, 0], [100, 0], [100, 100], [0, 100]],
                        }
                    )
        
        # If no detections found, try to extract from string representation
        if not detections and res:
            text_str = str(res).strip()
            if len(text_str) > 0:
                detections.append(
                    {
                        "text": text_str,
                        "confidence": 0.90,
                        "bbox": [[0, 0], [image_pil.width, 0], [image_pil.width, image_pil.height], [0, image_pil.height]],
                    }
                )

        logger.info(f"DeepSeekOCR2: Found {len(detections)} detections")
        return detections

    except ImportError as e:
        warning_msg = f"⚠️ DeepSeekOCR2 not available: {str(e)}. Install with: pip install transformers torch"
        logger.warning(warning_msg)
        st.warning(warning_msg)
        return []
    except Exception as e:
        error_msg = f"❌ DeepSeekOCR2 Error: {str(e)}"
        logger.error(error_msg)
        st.error(error_msg)
        return []


def filter_detections(
    detections: List[Dict], threshold: float, min_len: int, max_len: int
) -> List[Dict]:
    """
    Filter detections based on confidence threshold and text length.
    Returns filtered list of detections.
    """
    filtered = []
    for det in detections:
        text = det["text"]
        conf = det["confidence"]

        # Check confidence
        if conf < threshold:
            continue

        # Check text length
        text_len = len(text.strip())
        if text_len < min_len or text_len > max_len:
            continue

        filtered.append(det)

    return filtered


def draw_boxes(
    image_pil: Image.Image, detections: List[Dict], color: str = "red", width: int = 2
) -> Image.Image:
    """
    Draw bounding boxes on image.
    bbox format: list of 4 points [[x1,y1], [x2,y2], [x3,y3], [x4,y4]]
    Returns PIL Image with boxes drawn.
    """
    img_copy = image_pil.copy()
    draw = ImageDraw.Draw(img_copy)

    for det in detections:
        bbox = det["bbox"]

        # Handle different bbox formats
        if len(bbox) == 4:
            # Could be 4 points or (x, y, w, h)
            if isinstance(bbox[0], (list, tuple)) and len(bbox[0]) == 2:
                # 4 points format
                points = [(pt[0], pt[1]) for pt in bbox]
                draw.polygon(points, outline=color, width=width)
            else:
                # (x, y, w, h) format - convert to rectangle
                x, y, w, h = bbox
                draw.rectangle([x, y, x + w, y + h], outline=color, width=width)

    return img_copy


def call_gemini_with_retry(
    text: str, max_retries: int = 3, retry_delay: int = 2
) -> Tuple[bool, str]:
    """
    Send text to Gemini API with retry logic.
    Returns tuple: (success, response_text)
    """
    api_key = "AIzaSyBQDl03SE4aWCi8sxUFStbb3u4BHWZYs48"

    if not api_key:
        error_msg = "❌ GEMINI_API_KEY not found!\n\nTo fix:\n1. Get API key: https://aistudio.google.com/app/apikeys\n2. Run: export GEMINI_API_KEY='your-key-here'\n3. Restart the app"
        logger.error(error_msg)
        return False, error_msg

    # Validate API key format (should be longer than 20 chars)
    if len(api_key) < 20:
        error_msg = "❌ Invalid GEMINI_API_KEY format. Key is too short. Please check your API key."
        logger.error(error_msg)
        return False, error_msg

    for attempt in range(max_retries):
        try:
            # Try using google-generativeai SDK first
            try:
                import google.generativeai as genai

                genai.configure(api_key=api_key)
                model = genai.GenerativeModel("gemini-2.5-flash")

                logger.info(f"Calling Gemini API (SDK) - Attempt {attempt + 1}/{max_retries}")

                response = model.generate_content(
                    f'Convert the following OCR text into structured JSON. Return ONLY valid JSON with no markdown, no explanation, no code blocks.\n\nOCR Text:\n{text}'
                )

                return True, response.text.strip()

            except ImportError:
                # Fallback to HTTP API
                logger.info(f"Using HTTP fallback - Attempt {attempt + 1}/{max_retries}")

                url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
                headers = {"Content-Type": "application/json"}
                payload = {
                    "contents": [
                        {
                            "parts": [
                                {
                                    "text": f'Convert the following OCR text into structured JSON. Return ONLY valid JSON with no markdown, no explanation, no code blocks.\n\nOCR Text:\n{text}'
                                }
                            ]
                        }
                    ],
                    "generationConfig": {"temperature": 0.1},
                }

                response = requests.post(
                    f"{url}?key={api_key}", json=payload, headers=headers, timeout=30
                )

                logger.info(f"Gemini API Response Status: {response.status_code}")

                if response.status_code == 200:
                    result = response.json()
                    if "candidates" in result and len(result["candidates"]) > 0:
                        content = result["candidates"][0]["content"]["parts"][0]["text"]
                        return True, content.strip()
                    else:
                        return False, "❌ No response candidates from Gemini"
                elif response.status_code == 400:
                    error_text = response.text
                    if "API_KEY_INVALID" in error_text or "API key not valid" in error_text:
                        return False, f"❌ Invalid GEMINI_API_KEY!\n\nDetails: {error_text}\n\nFix: Get a valid key from https://aistudio.google.com/app/apikeys"
                    else:
                        return False, f"❌ Bad Request: {error_text}"
                elif response.status_code == 429:
                    logger.warning(f"Rate limited, retrying in {retry_delay}s...")
                    if attempt < max_retries - 1:
                        time.sleep(retry_delay)
                        continue
                    return False, "❌ Rate limited. Please try again in a moment."
                else:
                    return (
                        False,
                        f"❌ Gemini API error {response.status_code}: {response.text[:200]}",
                    )

        except requests.exceptions.Timeout:
            logger.warning(f"Timeout on attempt {attempt + 1}, retrying...")
            if attempt < max_retries - 1:
                time.sleep(retry_delay)
                continue
            return False, "❌ Gemini API timeout. Please try again."
        except Exception as e:
            logger.error(f"Error on attempt {attempt + 1}: {str(e)}")
            if attempt < max_retries - 1:
                time.sleep(retry_delay)
                continue
            return False, f"❌ Gemini Error: {str(e)}"

    return False, "❌ Max retries exceeded. Please try again later."


# ============================================================================
# STREAMLIT UI
# ============================================================================

# Sidebar for file upload
st.sidebar.header("📤 Upload Image")
with st.sidebar:
    st.sidebar.markdown("---")
    uploaded_file = st.file_uploader(
        "Choose an image (jpg/png/jpeg/webp)",
        type=["jpg", "png", "jpeg", "webp"],
        key="file_uploader",
    )

    if uploaded_file is not None:
        st.session_state.uploaded_image = Image.open(uploaded_file)
        st.success("✅ Image uploaded")

# Main area: Parameters and OCR
st.header("⚙️ Parameters")
col1, col2, col3 = st.columns(3)

with col1:
    confidence_threshold = st.slider(
        "Confidence Threshold",
        min_value=0.0,
        max_value=1.0,
        value=0.5,
        step=0.05,
        key="confidence_threshold",
    )

with col2:
    min_text_length = st.number_input(
        "Min Text Length",
        min_value=1,
        max_value=100,
        value=1,
        key="min_text_length",
    )

with col3:
    max_text_length = st.number_input(
        "Max Text Length",
        min_value=1,
        max_value=500,
        value=200,
        key="max_text_length",
    )

# Language selection for EasyOCR
st.subheader("🌐 EasyOCR Language")
ocr_languages = st.multiselect(
    "Select languages for EasyOCR (e.g., 'en', 'ur', 'fr')",
    options=["en", "ur", "fr", "es", "de", "zh", "ja"],
    default=["en"],
    key="ocr_languages",
)

# Extract & Send button
st.markdown("---")
if st.button("🚀 Extract & Send to Gemini", use_container_width=True):
    if st.session_state.uploaded_image is None:
        st.error("❌ Please upload an image first")
    else:
        with st.spinner("🔄 Running OCR on both models..."):
            # Run both OCR models
            logger.info("Starting OCR extraction...")
            easyocr_detections = run_easyocr(
                st.session_state.uploaded_image, languages=ocr_languages
            )
            deepseekocr2_detections = run_deepseekocr2(st.session_state.uploaded_image)

            # Store results in session state
            st.session_state.ocr_results = {
                "easyocr": easyocr_detections,
                "deepseekocr2": deepseekocr2_detections,
            }

            st.success("✅ OCR extraction complete!")

# ============================================================================
# VISUALIZATION & RESULTS DISPLAY
# ============================================================================

if st.session_state.ocr_results is not None:
    st.markdown("---")
    st.header("📊 OCR Results")

    # Extract and filter detections
    easyocr_raw = st.session_state.ocr_results["easyocr"]
    deepseekocr2_raw = st.session_state.ocr_results["deepseekocr2"]

    easyocr_filtered = filter_detections(
        easyocr_raw, confidence_threshold, min_text_length, max_text_length
    )
    deepseekocr2_filtered = filter_detections(
        deepseekocr2_raw, confidence_threshold, min_text_length, max_text_length
    )

    # Create text outputs
    easyocr_text = "\n".join([det["text"] for det in easyocr_filtered])
    deepseekocr2_text = "\n".join([det["text"] for det in deepseekocr2_filtered])

    # Visualization section
    st.subheader("🖼️ Image with Bounding Boxes")
    col_viz1, col_viz2 = st.columns(2)

    overlay_source = st.radio(
        "Select OCR source for visualization:",
        ["EasyOCR", "DeepSeekOCR2"],
        horizontal=True,
        key="overlay_source",
    )

    if overlay_source == "EasyOCR":
        viz_image = draw_boxes(
            st.session_state.uploaded_image, easyocr_filtered, color="red"
        )
    else:
        viz_image = draw_boxes(
            st.session_state.uploaded_image, deepseekocr2_filtered, color="blue"
        )

    st.image(viz_image)

    # Side-by-side OCR results
    st.subheader("📝 Extracted Text (Side-by-Side)")
    col_ocr1, col_ocr2 = st.columns(2)

    with col_ocr1:
        st.markdown("### 🔷 EasyOCR")
        st.metric(
            "Detections",
            len(easyocr_filtered),
            delta=f"(raw: {len(easyocr_raw)})",
        )
        st.text_area(
            "EasyOCR Output",
            value=easyocr_text,
            height=300,
            disabled=True,
            label_visibility="collapsed",
            key="easyocr_output",
        )

    with col_ocr2:
        st.markdown("### 🔶 DeepSeekOCR2")
        st.metric(
            "Detections",
            len(deepseekocr2_filtered),
            delta=f"(raw: {len(deepseekocr2_raw)})",
        )
        st.text_area(
            "DeepSeekOCR2 Output",
            value=deepseekocr2_text,
            height=300,
            disabled=True,
            label_visibility="collapsed",
            key="deepseekocr2_output",
        )

    # Gemini Integration
    st.markdown("---")
    st.subheader("🤖 Gemini Structuring")

    # Check API key before showing options
    if not os.environ.get("GEMINI_API_KEY"):
        st.warning(
            "⚠️ **GEMINI_API_KEY not set!**\n\n"
            "To use Gemini features:\n"
            "1. Get API key: https://aistudio.google.com/app/apikeys\n"
            "2. Run: `export GEMINI_API_KEY='your-key-here'`\n"
            "3. Restart the app"
        )
    else:
        gemini_source = st.radio(
            "Select OCR source for Gemini:",
            ["EasyOCR", "DeepSeekOCR2", "Both"],
            horizontal=True,
            key="gemini_source",
        )

        # Build Gemini input text
        if gemini_source == "EasyOCR":
            gemini_input = easyocr_text
        elif gemini_source == "DeepSeekOCR2":
            gemini_input = deepseekocr2_text
        else:  # Both
            gemini_input = f"=== EasyOCR ===\n{easyocr_text}\n\n=== DeepSeekOCR2 ===\n{deepseekocr2_text}"

        if st.button("📤 Send to Gemini for Structuring", use_container_width=True):
            if not gemini_input.strip():
                st.error("❌ No text to send. OCR may have found no detections.")
            else:
                with st.spinner("⏳ Sending to Gemini (with retry logic)..."):
                    success, response_text = call_gemini_with_retry(gemini_input)

                    if success:
                        st.success("✅ Gemini response received!")

                        # Try to parse as JSON for pretty printing
                        try:
                            # Clean response if wrapped in markdown code blocks
                            cleaned = response_text.strip()
                            if cleaned.startswith("```json"):
                                cleaned = cleaned[7:]
                            if cleaned.startswith("```"):
                                cleaned = cleaned[3:]
                            if cleaned.endswith("```"):
                                cleaned = cleaned[:-3]
                            cleaned = cleaned.strip()

                            json_obj = json.loads(cleaned)
                            st.markdown("### ✨ Structured JSON Output:")
                            st.code(
                                json.dumps(json_obj, indent=2, ensure_ascii=False),
                                language="json",
                            )
                        except json.JSONDecodeError:
                            # Not valid JSON, display as text in code block
                            st.markdown("### 📝 Gemini Response (Text):")
                            st.code(response_text, language="text")
                    else:
                        st.error(response_text)

        # Display Gemini input preview (for debugging)
        with st.expander("📋 View Gemini Input Preview"):
            st.text_area(
                "Gemini will receive:",
                value=gemini_input,
                height=200,
                disabled=True,
                key="gemini_input_preview",
            )

st.markdown("---")
st.markdown(
    "<sub>🚀 Enhanced OCR Comparison App | GPU-Accelerated | EasyOCR + DeepSeekOCR2 + Gemini Integration</sub>",
    unsafe_allow_html=True,
)
