#!/usr/bin/env python3
"""
Standalone OCR + Gemini Pipeline Script
Demonstrates GPU-accelerated text extraction and API integration
Can be used without Streamlit for batch processing
"""

import os
import sys
import json
import time
import argparse
from pathlib import Path
from typing import Dict, List, Tuple

# Check imports
try:
    import torch
    from PIL import Image, ImageDraw, ImageEnhance, ImageFilter
    import requests
except ImportError as e:
    print(f"❌ Missing dependency: {e}")
    print("Install with: pip install -r requirements.txt")
    sys.exit(1)

# ============================================================================
# CONFIGURATION
# ============================================================================

# GPU Detection
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
GPU_AVAILABLE = torch.cuda.is_available()
DEVICE_NAME = torch.cuda.get_device_name(0) if GPU_AVAILABLE else "CPU"

print(f"📊 Device: {DEVICE_NAME} ({'🎮 GPU' if GPU_AVAILABLE else '💻 CPU'})")

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================


def preprocess_image_for_ocr(image_pil: Image.Image) -> Image.Image:
    """Preprocess image to improve OCR results."""
    try:
        if image_pil.mode != "RGB":
            image_pil = image_pil.convert("RGB")

        # Enhance contrast, sharpness, brightness
        enhancer = ImageEnhance.Contrast(image_pil)
        image_pil = enhancer.enhance(1.5)

        enhancer = ImageEnhance.Sharpness(image_pil)
        image_pil = enhancer.enhance(2.0)

        enhancer = ImageEnhance.Brightness(image_pil)
        image_pil = enhancer.enhance(1.1)

        # Denoise
        image_pil = image_pil.filter(ImageFilter.MedianFilter(size=3))

        return image_pil
    except Exception as e:
        print(f"⚠️ Preprocessing failed: {str(e)}")
        return image_pil


def run_easyocr(image_pil: Image.Image, languages: List[str] = None) -> List[Dict]:
    """Extract text using EasyOCR with GPU acceleration."""
    if languages is None:
        languages = ["en"]

    try:
        import easyocr

        print(f"🔷 Running EasyOCR ({DEVICE_NAME})...")
        start_time = time.time()

        # Preprocess
        processed_image = preprocess_image_for_ocr(image_pil)

        # Save temporarily
        temp_path = "/tmp/ocr_temp.png"
        processed_image.save(temp_path)

        # Initialize reader
        reader = easyocr.Reader(
            languages, gpu=GPU_AVAILABLE, verbose=False
        )

        # Extract
        results = reader.readtext(temp_path, detail=1)

        # Normalize
        detections = []
        for bbox, text, confidence in results:
            detections.append(
                {
                    "text": text.strip(),
                    "confidence": float(confidence),
                    "bbox": bbox,
                }
            )

        elapsed = time.time() - start_time
        print(f"✅ EasyOCR: {len(detections)} detections in {elapsed:.2f}s")
        return detections

    except Exception as e:
        print(f"❌ EasyOCR Error: {str(e)}")
        return []


def run_deepseekocr2(image_pil: Image.Image) -> List[Dict]:
    """Extract text using DeepSeekOCR2 with GPU optimization."""
    try:
        from transformers import AutoTokenizer, AutoModel

        print(f"🔶 Running DeepSeekOCR2 ({DEVICE_NAME})...")
        start_time = time.time()

        # Preprocess
        processed_image = preprocess_image_for_ocr(image_pil)

        # Save temporarily
        temp_path = "/tmp/ocr_temp_deepseek.png"
        processed_image.save(temp_path)

        # Load model
        model_name = "deepseek-ai/DeepSeek-OCR-2"
        tokenizer = AutoTokenizer.from_pretrained(
            model_name, trust_remote_code=True
        )

        model = AutoModel.from_pretrained(
            model_name,
            trust_remote_code=True,
            use_safetensors=True,
            _attn_implementation="eager",
            torch_dtype=torch.float32,
        )

        # Move to device with proper dtype
        if GPU_AVAILABLE:
            dtype = torch.float16
            model = model.to(device=DEVICE, dtype=dtype)
        else:
            dtype = torch.float32
            model = model.to(device=DEVICE, dtype=dtype)

        model = model.eval()

        # Run inference
        prompt = "<image>\n<|grounding|>Extract all text from the document."
        output_path = "/tmp/deepseek_ocr2_out"

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
        if isinstance(res, dict) and ("bboxes" in res or "texts" in res):
            for text in res.get("texts", []):
                detections.append(
                    {
                        "text": str(text).strip(),
                        "confidence": 0.95,
                        "bbox": [[0, 0], [100, 0], [100, 100], [0, 100]],
                    }
                )

        if not detections and res:
            detections.append(
                {
                    "text": str(res).strip(),
                    "confidence": 0.90,
                    "bbox": [[0, 0], [image_pil.width, 0], [image_pil.width, image_pil.height], [0, image_pil.height]],
                }
            )

        elapsed = time.time() - start_time
        print(f"✅ DeepSeekOCR2: {len(detections)} detections in {elapsed:.2f}s")
        return detections

    except ImportError:
        print("⚠️ DeepSeekOCR2 not installed. Skipping.")
        return []
    except Exception as e:
        print(f"❌ DeepSeekOCR2 Error: {str(e)}")
        return []


def filter_detections(
    detections: List[Dict],
    threshold: float = 0.5,
    min_len: int = 1,
    max_len: int = 200,
) -> List[Dict]:
    """Filter detections by confidence and text length."""
    filtered = []
    for det in detections:
        if det["confidence"] >= threshold:
            text_len = len(det["text"].strip())
            if min_len <= text_len <= max_len:
                filtered.append(det)
    return filtered


def call_gemini_with_retry(
    text: str, max_retries: int = 3
) -> Tuple[bool, str]:
    """Send text to Gemini API with retry logic."""
    api_key = os.environ.get("GEMINI_API_KEY")

    if not api_key:
        return False, "❌ GEMINI_API_KEY not set. Run: export GEMINI_API_KEY='your-key'"

    if len(api_key) < 20:
        return False, "❌ Invalid API key format"

    for attempt in range(max_retries):
        try:
            # Try SDK first
            try:
                import google.generativeai as genai

                genai.configure(api_key=api_key)
                model = genai.GenerativeModel("gemini-1.5-flash")

                print(f"📤 Sending to Gemini (attempt {attempt + 1}/{max_retries})...")
                response = model.generate_content(
                    f'Convert the following OCR text into structured JSON. Return ONLY valid JSON.\n\n{text}'
                )

                return True, response.text.strip()

            except ImportError:
                # HTTP fallback
                url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"
                headers = {"Content-Type": "application/json"}
                payload = {
                    "contents": [
                        {
                            "parts": [
                                {
                                    "text": f'Convert the following OCR text into structured JSON. Return ONLY valid JSON.\n\n{text}'
                                }
                            ]
                        }
                    ]
                }

                response = requests.post(
                    f"{url}?key={api_key}",
                    json=payload,
                    headers=headers,
                    timeout=30,
                )

                if response.status_code == 200:
                    result = response.json()
                    if "candidates" in result and len(result["candidates"]) > 0:
                        content = result["candidates"][0]["content"]["parts"][0][
                            "text"
                        ]
                        return True, content.strip()
                elif response.status_code == 400 and "API_KEY_INVALID" in response.text:
                    return False, "❌ Invalid API key. Get one: https://aistudio.google.com/app/apikeys"
                elif response.status_code == 429:
                    if attempt < max_retries - 1:
                        time.sleep(2)
                        continue
                    return False, "❌ Rate limited"
                else:
                    return False, f"❌ API Error {response.status_code}"

        except Exception as e:
            if attempt < max_retries - 1:
                time.sleep(2)
                continue
            return False, f"❌ Error: {str(e)}"

    return False, "❌ Max retries exceeded"


def dump_boxes_to_image(
    image_pil: Image.Image, detections: List[Dict], color: str = "red"
) -> str:
    """Draw bboxes on image and save."""
    img = image_pil.copy()
    draw = ImageDraw.Draw(img)

    for det in detections:
        bbox = det["bbox"]
        if len(bbox) == 4 and isinstance(bbox[0], (list, tuple)):
            points = [(pt[0], pt[1]) for pt in bbox]
            draw.polygon(points, outline=color, width=2)

    output_path = "/tmp/ocr_output.png"
    img.save(output_path)
    return output_path


# ============================================================================
# MAIN PIPELINE
# ============================================================================


def process_document(
    image_path: str,
    output_dir: str = "./ocr_output",
    confidence_threshold: float = 0.5,
    min_text_len: int = 1,
    max_text_len: int = 200,
    use_gemini: bool = True,
) -> Dict:
    """Process a single document with full pipeline."""

    print(f"\n{'=' * 60}")
    print(f"📄 Processing: {image_path}")
    print(f"{'=' * 60}\n")

    # Create output dir
    Path(output_dir).mkdir(exist_ok=True)

    # Load image
    image = Image.open(image_path)
    print(f"📸 Image size: {image.size}")

    # Run OCR models
    print("\n🔍 Extracting text...")
    easyocr_dets = run_easyocr(image)
    deepseekocr2_dets = run_deepseekocr2(image)

    # Filter
    print("\n🔽 Filtering detections...")
    easy_filtered = filter_detections(
        easyocr_dets, confidence_threshold, min_text_len, max_text_len
    )
    deep_filtered = filter_detections(
        deepseekocr2_dets, confidence_threshold, min_text_len, max_text_len
    )

    # Extract text
    easy_text = "\n".join([d["text"] for d in easy_filtered])
    deep_text = "\n".join([d["text"] for d in deep_filtered])

    print(f"   EasyOCR: {len(easy_filtered)}/{len(easyocr_dets)} kept")
    print(f"   DeepSeekOCR2: {len(deep_filtered)}/{len(deepseekocr2_dets)} kept")

    # Draw boxes
    print("\n🖼️ Generating visualizations...")
    easy_viz = dump_boxes_to_image(image, easy_filtered, color="red")
    deep_viz = dump_boxes_to_image(image, deep_filtered, color="blue")

    # Gemini processing
    gemini_result = None
    if use_gemini:
        print("\n🤖 Sending to Gemini...")
        combined_text = f"=== EasyOCR ===\n{easy_text}\n\n=== DeepSeekOCR2 ===\n{deep_text}"
        success, response = call_gemini_with_retry(combined_text)

        if success:
            print("✅ Gemini response received")
            try:
                gemini_result = json.loads(response)
            except json.JSONDecodeError:
                gemini_result = {"raw_response": response}
        else:
            print(f"❌ {response}")

    # Save results
    print("\n💾 Saving results...")

    results = {
        "image_path": image_path,
        "device": DEVICE_NAME,
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "easyocr": {
            "raw_count": len(easyocr_dets),
            "filtered_count": len(easy_filtered),
            "text": easy_text,
            "visualization": easy_viz,
        },
        "deepseekocr2": {
            "raw_count": len(deepseekocr2_dets),
            "filtered_count": len(deep_filtered),
            "text": deep_text,
            "visualization": deep_viz,
        },
        "gemini": gemini_result,
    }

    # Save JSON
    output_json = Path(output_dir) / f"results.json"
    with open(output_json, "w") as f:
        json.dump(results, f, indent=2)
    print(f"   ✅ {output_json}")

    # Save text
    output_text = Path(output_dir) / "extracted_text.txt"
    with open(output_text, "w") as f:
        f.write(f"=== EasyOCR ===\n{easy_text}\n\n")
        f.write(f"=== DeepSeekOCR2 ===\n{deep_text}\n")
    print(f"   ✅ {output_text}")

    print(f"\n{'=' * 60}")
    print("✅ Processing complete!")
    print(f"{'=' * 60}\n")

    return results


# ============================================================================
# CLI
# ============================================================================


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="OCR + Gemini API Pipeline",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python ocr_pipeline.py image.jpg
  python ocr_pipeline.py image.jpg --confidence 0.6 --no-gemini
  python ocr_pipeline.py document/ --output results/
        """,
    )

    parser.add_argument("image", help="Image file or directory of images")
    parser.add_argument(
        "-o", "--output", default="./ocr_output", help="Output directory"
    )
    parser.add_argument(
        "-c",
        "--confidence",
        type=float,
        default=0.5,
        help="Confidence threshold (0.0-1.0)",
    )
    parser.add_argument(
        "--min-len", type=int, default=1, help="Minimum text length"
    )
    parser.add_argument(
        "--max-len", type=int, default=200, help="Maximum text length"
    )
    parser.add_argument(
        "--no-gemini",
        action="store_true",
        help="Skip Gemini API processing",
    )

    args = parser.parse_args()

    # Process image(s)
    image_path = Path(args.image)

    if image_path.is_file():
        # Single image
        process_document(
            str(image_path),
            args.output,
            args.confidence,
            args.min_len,
            args.max_len,
            not args.no_gemini,
        )
    elif image_path.is_dir():
        # Directory of images
        for img_file in image_path.glob("*.{jpg,png,jpeg,webp}"):
            process_document(
                str(img_file),
                args.output,
                args.confidence,
                args.min_len,
                args.max_len,
                not args.no_gemini,
            )
    else:
        print(f"❌ File not found: {image_path}")
        sys.exit(1)
