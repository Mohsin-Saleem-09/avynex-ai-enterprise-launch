<<<<<<< HEAD
# Welcome to your Lovable project

TODO: Document your project here
=======
# OCR Comparison + Gemini Structuring App

A minimal Streamlit web app that compares OCR models (EasyOCR & DeepSeekOCR2) and uses Google's Gemini API to structure extracted text into JSON.

## Features

✅ **Dual OCR Models**
- EasyOCR with multi-language support
- DeepSeekOCR2 for advanced document understanding

✅ **Smart Filtering**
- Confidence threshold slider (0.0-1.0, default 0.5)
- Min/Max text length filtering
- Real-time detection counts

✅ **Visual Comparison**
- Draw bounding boxes on uploaded image
- Toggle between OCR model visualizations
- Side-by-side extracted text display

✅ **Gemini Integration**
- Send OCR results to Google Gemini API
- Choose source: EasyOCR, DeepSeekOCR2, or Both
- Automatic JSON parsing and pretty-printing
- Graceful error handling

✅ **Session State Management**
- OCR results persist across slider/parameter changes
- Re-run OCR only when user clicks button

## Installation

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

**Note:** 
- `torch` and `transformers` can be large (~2-3GB). For DeepSeekOCR2 support, ensure you have sufficient disk space and either CUDA (GPU) or CPU resources.
- For CPU-only setups, the app will work but will be slower.
- If you don't have CUDA, remove `gpu=True` from the `run_easyocr()` function.

### 2. Set Gemini API Key

Export your Google Gemini API key as an environment variable:

```bash
export GEMINI_API_KEY="your-api-key-here"
```

Get your API key at: https://aistudio.google.com/app/apikeys

On Windows:
```cmd
set GEMINI_API_KEY=your-api-key-here
```

## Usage

### Run the App

```bash
streamlit run app.py
```

The app will open in your browser at `http://localhost:8501`

### Workflow

1. **Upload an Image**
   - Click "Choose an image" in the sidebar
   - Supported formats: jpg, png, jpeg, webp

2. **Set Parameters** (before OCR)
   - **Confidence Threshold**: Minimum confidence score (0.0-1.0)
   - **Min Text Length**: Minimum characters to keep
   - **Max Text Length**: Maximum characters to keep
   - **EasyOCR Languages**: Select recognized languages (en, ur, fr, es, de, zh, ja)

3. **Extract & Send to Gemini**
   - Click the "Extract & Send to Gemini" button
   - App runs BOTH OCR models and filters results

4. **Review Results**
   - **Image with Boxes**: Toggle between EasyOCR and DeepSeekOCR2 visualizations
   - **Side-by-Side Text**: Compare filtered outputs from both models
   - **Detection Counts**: See how many detections each model found

5. **Structure with Gemini**
   - Select OCR source for Gemini (or use "Both" to combine)
   - Click "Send to Gemini for Structuring"
   - View pretty-printed JSON response

## File Structure

```
OCR-VS-Code/
├── app.py              # Main Streamlit app (all-in-one)
├── requirements.txt    # Python dependencies
└── README.md          # This file
```

## Key Functions

### `run_easyocr(image_pil, languages=None)`
Runs EasyOCR on the uploaded image. Returns normalized detections.

### `run_deepseekocr2(image_pil)`
Runs DeepSeekOCR2 via Hugging Face transformers. Returns normalized detections.

### `filter_detections(detections, threshold, min_len, max_len)`
Filters detections by confidence and text length.

### `draw_boxes(image_pil, detections, color="red", width=2)`
Draws bounding boxes on image using PIL ImageDraw.

### `call_gemini(text)`
Sends text to Gemini API (SDK or HTTP fallback). Returns structured response.

## Detection Format

All OCR models are normalized to:
```python
{
    "text": str,           # Extracted text (stripped)
    "confidence": float,   # Confidence score (0.0-1.0)
    "bbox": list           # [[x1,y1], [x2,y2], [x3,y3], [x4,y4]]
}
```

## Error Handling

✅ **No file uploaded** → Clear error message

✅ **API key missing** → Instructions to set `GEMINI_API_KEY`

✅ **OCR failure** → Error displayed, app continues

✅ **DeepSeekOCR2 not installed** → Warning shown, app continues with EasyOCR

✅ **Gemini API errors** → Detailed error messages

✅ **Invalid JSON from Gemini** → Display as text fallback

## Performance Tips

- **EasyOCR**: Lightweight, faster for standard documents. GPU support available.
- **DeepSeekOCR2**: More powerful but slower. Requires ~8GB VRAM on GPU or >30GB RAM on CPU.
- **Combine both**: Use "Both" mode to compare and cross-validate results.
- **Filter aggressively**: Use confidence threshold and text length to reduce noise.

## Troubleshooting

### `ModuleNotFoundError: No module named 'easyocr'`
```bash
pip install easyocr
```

### `GEMINI_API_KEY not set`
Make sure you've exported the environment variable:
```bash
echo $GEMINI_API_KEY
```

### DeepSeekOCR2 very slow
- Running on CPU? Switch to GPU or reduce `base_size` in the code.
- First run downloads the model (~5GB). Be patient.

### Bounding boxes not displaying correctly
- Ensure image is in supported format (jpg/png/jpeg/webp)
- Check OCR detection count > 0

## Configuration

Edit these values in `app.py` to customize:

- **Default confidence threshold**: Change `value=0.5` in slider
- **Default text lengths**: Change `value=1` and `value=200` in number inputs
- **EasyOCR languages**: Modify the multiselect options
- **GPU/CPU**: Set `gpu=False` (or `True` if CUDA available) in `run_easyocr()`

## License

MIT

## Support

For issues:
- Check environment variables: `echo $GEMINI_API_KEY`
- Verify pip packages: `pip list | grep -E "streamlit|easyocr|transformers"`
- Check Streamlit logs: `streamlit run app.py --logger.level=debug`
# OCR-repo
>>>>>>> 0a07d6b4cc070ad430066247e23d42f6e491f9aa
