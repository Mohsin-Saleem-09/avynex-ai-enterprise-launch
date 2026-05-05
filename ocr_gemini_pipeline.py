#!/usr/bin/env python3
"""
Standalone OCR + Gemini Refinement Pipeline
Batch process images: extract text with EasyOCR, refine with Gemini 2.5-flash

Usage:
  python ocr_gemini_pipeline.py image.jpg
  python ocr_gemini_pipeline.py ./documents/ --output ./results
  python ocr_gemini_pipeline.py image.jpg --langs en ur --no-gpu --output ./out

Requires:
  easyocr, pillow, opencv-python, numpy, google-generativeai, requests
"""

import os
import sys
import json
import time
import argparse
import logging
from pathlib import Path
from typing import List, Tuple, Optional

import numpy as np
from PIL import Image

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger(__name__)


def run_easyocr_on_image(image_path: str, langs: List[str], use_gpu: bool) -> List[Tuple]:
    """Run EasyOCR on image. Returns list of (bbox, text, confidence)."""
    try:
        import easyocr
    except ImportError:
        logger.error("easyocr not installed. Install: pip install easyocr")
        return []
    
    try:
        logger.info(f"Loading EasyOCR for languages: {langs}")
        reader = easyocr.Reader(langs, gpu=use_gpu, verbose=False)
        logger.info(f"Running EasyOCR on {image_path}...")
        results = reader.readtext(image_path)
        logger.info(f"✅ Found {len(results)} detections")
        return results
    except Exception as e:
        logger.error(f"❌ EasyOCR error: {str(e)}")
        return []


def call_gemini_for_refinement(ocr_text: str, api_key: str) -> Tuple[bool, str]:
    """Send OCR text to Gemini 2.5-flash for refinement."""
    
    if not api_key:
        error_msg = (
            "❌ GEMINI_API_KEY not found!\n"
            "Set: export GEMINI_API_KEY='your-key-here'\n"
            "Get key: https://aistudio.google.com/app/apikeys"
        )
        logger.error(error_msg)
        return False, error_msg
    
    if len(api_key) < 20:
        return False, "❌ Invalid GEMINI_API_KEY format"
    
    try:
        import google.generativeai as genai
        
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-2.5-flash")
        
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
        
        logger.info("Calling Gemini 2.5-flash...")
        response = model.generate_content(refinement_prompt)
        refined_text = response.text.strip()
        
        logger.info("✅ Gemini refinement complete")
        return True, refined_text
        
    except ImportError:
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
                    logger.info("✅ Gemini refinement complete (HTTP)")
                    return True, refined_text
                else:
                    return False, "❌ No response from Gemini"
            elif response.status_code == 400 and "API_KEY_INVALID" in response.text:
                return False, "❌ Invalid GEMINI_API_KEY"
            else:
                error_detail = response.text[:200]
                return False, f"❌ Gemini API Error {response.status_code}: {error_detail}"
        
        except Exception as e:
            logger.error(f"HTTP API error: {str(e)}")
            return False, f"❌ Error: {str(e)}"
    
    except Exception as e:
        logger.error(f"Gemini error: {str(e)}")
        return False, f"❌ Error: {str(e)}"


def process_image(
    image_path: str,
    output_dir: str,
    langs: List[str],
    use_gpu: bool,
    use_gemini: bool,
    api_key: str
) -> dict:
    """Process single image: OCR + optional Gemini refinement."""
    
    logger.info(f"\n{'='*70}")
    logger.info(f"Processing: {image_path}")
    logger.info(f"{'='*70}")
    
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Load image
    try:
        img = Image.open(image_path).convert("RGB")
        logger.info(f"Image size: {img.size}")
    except Exception as e:
        logger.error(f"❌ Failed to load image: {str(e)}")
        return {"success": False, "error": str(e)}
    
    # Run EasyOCR
    results = run_easyocr_on_image(image_path, langs, use_gpu)
    
    if not results:
        logger.warning("⚠️ No detections found")
        return {"success": False, "error": "No OCR detections"}
    
    # Extract raw text
    ocr_text_raw = "\n".join([text for bbox, text, conf in results])
    
    # Gemini refinement
    refined_text = None
    if use_gemini:
        success, refined_text = call_gemini_for_refinement(ocr_text_raw, api_key)
        if not success:
            logger.error(f"❌ Gemini refinement failed: {refined_text}")
            refined_text = None
    
    # Save results
    image_name = Path(image_path).stem
    
    # Save original OCR
    ocr_file = output_dir / f"{image_name}_ocr_original.txt"
    ocr_file.write_text(ocr_text_raw, encoding="utf-8")
    logger.info(f"💾 Saved original OCR: {ocr_file}")
    
    # Save refined text
    if refined_text:
        refined_file = output_dir / f"{image_name}_ocr_refined.txt"
        refined_file.write_text(refined_text, encoding="utf-8")
        logger.info(f"💾 Saved refined text: {refined_file}")
    
    # Save combined
    combined_output = f"""
ORIGINAL OCR TEXT
{'='*70}
{ocr_text_raw}

{'='*70}
REFINED TEXT (Gemini 2.5-flash)
{'='*70}
{refined_text if refined_text else 'N/A (Gemini not used)'}
"""
    combined_file = output_dir / f"{image_name}_ocr_combined.txt"
    combined_file.write_text(combined_output, encoding="utf-8")
    logger.info(f"💾 Saved combined output: {combined_file}")
    
    # Save JSON metadata
    metadata = {
        "image": image_path,
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "languages": langs,
        "gpu_used": use_gpu,
        "gemini_used": use_gemini,
        "ocr_detections": len(results),
        "original_text_length": len(ocr_text_raw),
        "refined_text_length": len(refined_text) if refined_text else 0,
        "files": {
            "original": str(ocr_file),
            "refined": str(refined_file) if refined_text else None,
            "combined": str(combined_file)
        }
    }
    metadata_file = output_dir / f"{image_name}_metadata.json"
    metadata_file.write_text(json.dumps(metadata, indent=2), encoding="utf-8")
    logger.info(f"💾 Saved metadata: {metadata_file}")
    
    logger.info(f"✅ Processing complete for {image_name}")
    
    return {
        "success": True,
        "image": image_path,
        "files": metadata["files"],
        "ocr_detections": len(results),
        "gemini_used": use_gemini
    }


def main():
    parser = argparse.ArgumentParser(
        description="OCR + Gemini 2.5-flash Text Refinement Pipeline",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python ocr_gemini_pipeline.py image.jpg
  python ocr_gemini_pipeline.py ./documents/ --output ./results
  python ocr_gemini_pipeline.py image.jpg --langs en ur --no-gpu
  python ocr_gemini_pipeline.py doc.jpg --no-gemini  # OCR only
        """
    )
    
    parser.add_argument("input", help="Image file or directory of images")
    parser.add_argument("-o", "--output", default="./ocr_output", help="Output directory")
    parser.add_argument(
        "--langs",
        nargs="+",
        default=["en"],
        help="Languages for EasyOCR (en, ur, fr, es, de, zh, ja)"
    )
    parser.add_argument("--no-gpu", action="store_true", help="Disable GPU for EasyOCR")
    parser.add_argument("--no-gemini", action="store_true", help="Skip Gemini refinement")
    
    args = parser.parse_args()
    
    # Check API key
    api_key = os.environ.get("GEMINI_API_KEY")
    if not args.no_gemini and not api_key:
        logger.error("❌ GEMINI_API_KEY not set")
        logger.error("Set: export GEMINI_API_KEY='your-key-here'")
        logger.error("Get: https://aistudio.google.com/app/apikeys")
        sys.exit(1)
    
    input_path = Path(args.input)
    
    if input_path.is_file():
        # Single image
        result = process_image(
            str(input_path),
            args.output,
            args.langs,
            not args.no_gpu,
            not args.no_gemini,
            api_key
        )
        if result["success"]:
            logger.info(f"\n✅ Success: {result['image']}")
        else:
            logger.error(f"\n❌ Failed: {result['error']}")
            sys.exit(1)
    
    elif input_path.is_dir():
        # Directory of images
        image_files = list(input_path.glob("*.jpg")) + list(input_path.glob("*.png")) + \
                      list(input_path.glob("*.jpeg")) + list(input_path.glob("*.webp"))
        
        if not image_files:
            logger.error(f"❌ No image files found in {input_path}")
            sys.exit(1)
        
        logger.info(f"Found {len(image_files)} images")
        
        results = []
        for img_file in image_files:
            result = process_image(
                str(img_file),
                args.output,
                args.langs,
                not args.no_gpu,
                not args.no_gemini,
                api_key
            )
            results.append(result)
        
        # Summary
        logger.info(f"\n{'='*70}")
        logger.info("📊 BATCH PROCESSING SUMMARY")
        logger.info(f"{'='*70}")
        logger.info(f"Total images: {len(image_files)}")
        logger.info(f"Successful: {sum(1 for r in results if r['success'])}")
        logger.info(f"Failed: {sum(1 for r in results if not r['success'])}")
        logger.info(f"Output directory: {args.output}")
    
    else:
        logger.error(f"❌ File not found: {input_path}")
        sys.exit(1)


if __name__ == "__main__":
    main()
