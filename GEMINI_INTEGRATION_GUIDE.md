# 🌟 OCR + Gemini 2.5-flash Integration Guide

## Overview

This guide explains how to use the enhanced OCR + Gemini text refinement pipeline for processing NAB (National Accountability Bureau) applications and other documents.

### What It Does

1. **Extract text** from images using EasyOCR
2. **Refine text** with Gemini 2.5-flash LLM for:
   - Grammar correction
   - OCR error fixing
   - Formatting improvement
   - Professional document structure
   - Preserve original meaning

3. **Save results**:
   - Original OCR text
   - Refined text
   - Combined comparison
   - JSON metadata

---

## Quick Start (3 Steps)

### Step 1: Set Gemini API Key

```bash
# Get key: https://aistudio.google.com/app/apikeys
export GEMINI_API_KEY="your-api-key-here"
```

### Step 2: Install Dependencies

```bash
pip install streamlit easyocr pillow opencv-python google-generativeai -q
```

### Step 3: Run Streamlit App

```bash
streamlit run easyocr_streamlit.py
```

**Or use CLI for batch processing:**

```bash
python ocr_gemini_pipeline.py image.jpg --output ./results
```

---

## 🖥️ Option 1: Streamlit Web Interface (easyocr_streamlit.py)

### Features

✅ Upload images with drag-and-drop  
✅ Select OCR languages  
✅ Toggle GPU acceleration  
✅ Toggle Gemini refinement (on/off)  
✅ View annotated image with bounding boxes  
✅ Compare original vs. refined text side-by-side  
✅ Download original, refined, and annotated outputs  

### Usage

```bash
streamlit run easyocr_streamlit.py
```

Opens at `http://localhost:8501`

### Workflow

1. Upload image (JPG, PNG, JPEG, WEBP)
2. Select languages (default: English)
3. Toggle GPU if available
4. Enable ✨ "Refine with Gemini 2.5-flash" (default: ON)
5. Click **🚀 Run OCR + Gemini**
6. View results in tabs:
   - 📸 Annotated image with bounding boxes
   - 📝 Original OCR text
   - ✨ Refined text (by Gemini)
7. Download individual outputs or combined file

### Interface Overview

```
Sidebar:
├── Languages multiselect
├── GPU toggle
├── ✨ Gemini toggle
└── File upload

Main:
├── Uploaded image preview
├── Run button
└── Results (tabs):
    ├── Annotated image
    ├── Original OCR text (download)
    ├── Refined text (download)
    └── Combined output (download)
```

---

## 🐍 Option 2: CLI Batch Processing (ocr_gemini_pipeline.py)

### Features

✅ Batch process multiple images  
✅ GPU acceleration  
✅ Multi-language support  
✅ Optional Gemini refinement  
✅ JSON metadata output  
✅ Detailed logging  

### Usage

**Single image:**
```bash
python ocr_gemini_pipeline.py image.jpg
```

**Batch processing (directory):**
```bash
python ocr_gemini_pipeline.py ./documents/ --output ./results
```

**With custom languages:**
```bash
python ocr_gemini_pipeline.py image.jpg --langs en ur fr --output ./out
```

**CPU-only (no GPU):**
```bash
python ocr_gemini_pipeline.py image.jpg --no-gpu
```

**OCR only (skip Gemini):**
```bash
python ocr_gemini_pipeline.py image.jpg --no-gemini
```

### Output Files

For each image `document.jpg`, generates:

```
📁 output_dir/
├── document_ocr_original.txt      # Raw OCR text
├── document_ocr_refined.txt       # Gemini-refined text
├── document_ocr_combined.txt      # Original + Refined (comparison)
└── document_metadata.json         # Processing metadata
```

### Example: Batch NAB Applications

```bash
# Process all NAB forms
python ocr_gemini_pipeline.py ./nab_forms/ \
  --langs en ur \
  --output ./nab_results \
  [--no-gpu]  # Optional: if no GPU
```

---

## 🔧 Gemini Refinement Prompt

The app uses a specialized prompt for NAB documents:

```
You are an expert text refinement specialist. Your task is to:

1. Correct all grammatical mistakes
2. Fix OCR errors (misrecognized characters, broken words, etc.)
3. Improve formatting and readability (add proper spacing, paragraphs)
4. Preserve the original meaning and intent
5. Ensure professional tone suitable for official documents

[Original OCR text provided here]

Return ONLY the refined text, no explanations or commentary.
```

### Customization

Edit the prompt in:
- **Streamlit**: `call_gemini_for_refinement()` function (line ~130)
- **CLI**: `call_gemini_for_refinement()` function (line ~90)

---

## 🔐 API Key Configuration

### Get Your API Key

1. Go to: https://aistudio.google.com/app/apikeys
2. Click **"Create API Key"**
3. Copy the key (starts with `AIza...`)

### Set Environment Variable

**Linux/Mac:**
```bash
export GEMINI_API_KEY="your-key-here"

# Persist (add to ~/.bashrc or ~/.zshrc):
echo 'export GEMINI_API_KEY="your-key"' >> ~/.bashrc
source ~/.bashrc
```

**Windows (CMD):**
```cmd
set GEMINI_API_KEY=your-key-here
```

**Windows (PowerShell):**
```powershell
$env:GEMINI_API_KEY="your-key-here"
```

### Verify Setup

```bash
# Check if key is set
echo $GEMINI_API_KEY

# Should show your API key (not empty)
```

---

## ⚙️ Configuration Options

### EasyOCR Languages

Supported: `en`, `ur`, `fr`, `es`, `de`, `zh`, `ja`, `ar`, `ru`, `ko`

Default: `en` (English)

For NAB documents in Pakistan: Use `en ur` (English + Urdu)

### GPU Acceleration

Requires NVIDIA GPU + CUDA

Check availability:
```bash
python -c "import torch; print(torch.cuda.is_available())"
```

**Performance (estimate):**
- GPU: 0.3s per image (EasyOCR) + 2-3s (Gemini API)
- CPU: 1-2s per image + 2-3s (Gemini API)

### Model: Gemini 2.5-flash

- Fast and efficient
- Good for document refinement
- Cost-effective (~$0.0001 per 1K tokens)
- Free tier: ~15 requests/minute

---

## 📊 Output Examples

### Original OCR Text (Raw)

```
NAT1ONAL ACCOUNTABIL1TY BUREAU APPLIC4TION FORM
lmportant Instructions:
- Fl1 all f1elds with bl4ck ink

[Distorted, contains OCR errors]
```

### Refined Text (Gemini Output)

```
NATIONAL ACCOUNTABILITY BUREAU
APPLICATION FORM

Important Instructions:
- Fill all fields with black ink
- Provide complete and accurate information
- Attach necessary supporting documents

[Clean, grammatically correct, professionally formatted]
```

---

## 🐛 Troubleshooting

### "GEMINI_API_KEY not set"

**Fix:**
```bash
export GEMINI_API_KEY="your-key-here"
streamlit run easyocr_streamlit.py
```

### "Invalid GEMINI_API_KEY"

**Cause:** Wrong/expired key

**Fix:**
1. Get new key: https://aistudio.google.com/app/apikeys
2. Delete old key (⚠️ icon)
3. Set new key: `export GEMINI_API_KEY="new-key"`

### "GPU not available"

**Cause:** CUDA not installed or EasyOCR not using GPU

**Fix:**
```bash
# Reinstall PyTorch with CUDA
pip uninstall torch -y
pip install torch --index-url https://download.pytorch.org/whl/cu121

# Or use CPU (slower):
# uncheck GPU in Streamlit or use --no-gpu flag
```

### "No detections found"

**Possible causes:**
- Image too small/low quality
- Wrong language selected
- Image is not text document

**Fix:**
- Use higher quality image
- Try multi-language: `--langs en ur`
- Verify image contains readable text

### "Gemini API timeout"

**Cause:** Network issue or API overload

**Fix:** Streamlit app automatically retries (built-in)

CLI: Run again manually

### "Memory error" (DeepSeekOCR2 if used)

**Cause:** GPU/CPU memory insufficient

**Fix:**
```bash
# Use CPU with reduced image size
python ocr_gemini_pipeline.py image.jpg --no-gpu
```

---

## 🚀 Advanced Usage

### Batch Processing with Logging

```bash
# Save logs to file
python ocr_gemini_pipeline.py ./docs/ --output ./results 2>&1 | tee processing.log
```

### Process Multiple Directories

```bash
# Loop through multiple folders
for dir in nab_2023 nab_2024 nab_2025; do
  python ocr_gemini_pipeline.py ./$dir --output ./results_$dir
done
```

### Custom Gemini Prompt

Edit `call_gemini_for_refinement()` in either file:

```python
refinement_prompt = f"""Your custom prompt here...
Original text: {ocr_text}"""
```

### Integrate into Your Code

```python
from ocr_gemini_pipeline import run_easyocr_on_image, call_gemini_for_refinement

# OCR
results = run_easyocr_on_image("document.jpg", ["en", "ur"], use_gpu=True)
ocr_text = "\n".join([text for bbox, text, conf in results])

# Refine
success, refined = call_gemini_for_refinement(ocr_text, api_key)
```

---

## 📈 Performance Metrics

### Processing Time

```
Image Size    EasyOCR    Gemini API    Total
800x600       0.3s       2.5s          ~2.8s   (GPU)
1200x900      0.5s       2.5s          ~3.0s   (GPU)
1920x1440     1.0s       2.5s          ~3.5s   (GPU)

CPU (2.5x slower for EasyOCR)
```

### Cost (Gemini 2.5-flash)

- Input: ~$0.075 per 1M tokens
- Output: ~$0.3 per 1M tokens
- Typical document: ~1000 tokens
- Cost per document: ~$0.0001-0.0003

---

## 📝 Example Workflow

### NAB Application Processing

```bash
# 1. Set API key
export GEMINI_API_KEY="your-key"

# 2. Process all forms
python ocr_gemini_pipeline.py ./nab_forms/ \
  --langs en ur \
  --output ./nab_refined

# 3. Results in ./nab_refined/:
#    - form_001_ocr_original.txt
#    - form_001_ocr_refined.txt
#    - form_001_metadata.json
#    ... (repeat for each form)

# 4. Review refined text (manually or programmatically)
# 5. Import to database or document system
```

---

## 🔗 Links & Resources

- **Gemini API Docs**: https://ai.google.dev/
- **Get API Key**: https://aistudio.google.com/app/apikeys
- **EasyOCR**: https://github.com/JaidedAI/EasyOCR
- **Streamlit**: https://streamlit.io/

---

## ✅ Checklist Before Running

- [ ] GEMINI_API_KEY environment variable set
- [ ] Dependencies installed: `pip install streamlit easyocr pillow opencv-python google-generativeai`
- [ ] Test image available
- [ ] Output directory writable
- [ ] GPU available (optional, app works on CPU)

---

## 📄 License

MIT - Free to use and modify

---

**Last Updated:** March 2026  
**Version:** 2.0 (with Gemini 2.5-flash)
