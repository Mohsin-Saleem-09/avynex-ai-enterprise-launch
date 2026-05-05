#!/bin/bash
# SETUP AND USAGE GUIDE FOR OCR + GEMINI APP WITH GPU
# This script helps set up the environment with GPU support

echo "========================================="
echo "🚀 OCR + Gemini App Setup with GPU Support"
echo "========================================="
echo ""

# Step 1: Check for NVIDIA GPU
echo "📊 Checking for GPU..."
if command -v nvidia-smi &> /dev/null; then
    echo "✅ NVIDIA GPU detected!"
    nvidia-smi --query-gpu=name,driver_version,memory.total --format=csv,noheader
    echo ""
else
    echo "⚠️  No NVIDIA GPU detected. App will run on CPU (slower)."
    echo ""
fi

# Step 2: Get Gemini API Key
echo "🔑 GEMINI API Key Setup"
echo "========================"
echo "1. Go to: https://aistudio.google.com/app/apikeys"
echo "2. Click 'Create API Key'"
echo "3. Copy the generated key"
echo ""
read -p "Do you have your GEMINI_API_KEY ready? (y/n) " -n 1 -r
echo
if ! [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "⏭️  Skipping API key setup for now"
else
    read -sp "Enter your GEMINI_API_KEY: " api_key
    echo ""
    export GEMINI_API_KEY="$api_key"
    echo "✅ API key exported to environment"
fi

# Step 3: Python version check
echo ""
echo "🐍 Python Version"
echo "=================="
python3 --version

# Step 4: Create virtual environment (optional)
read -p "Create a new virtual environment? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    python3 -m venv venv
    source venv/bin/activate
    echo "✅ Virtual environment created and activated"
fi

# Step 5: Install dependencies with GPU support
echo ""
echo "📦 Installing Dependencies"
echo "=========================="
echo "Installing PyTorch with CUDA 12.1 (GPU optimized)..."
pip install --upgrade pip

# Install PyTorch with CUDA support
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# Install other dependencies
pip install -r requirements.txt

echo "✅ Dependencies installed!"

# Step 6: Verify installation
echo ""
echo "✔️ Verification"
echo "==============="
python3 -c "import torch; print(f'PyTorch: {torch.__version__}'); print(f'CUDA available: {torch.cuda.is_available()}'); print(f'GPU: {torch.cuda.get_device_name(0) if torch.cuda.is_available() else \"N/A\"}')"
python3 -c "import streamlit; print(f'Streamlit: {streamlit.__version__}')"
python3 -c "import easyocr; print(f'EasyOCR: installed')"

echo ""
echo "========================================="
echo "🎉 Setup Complete!"
echo "========================================="
echo ""
echo "To run the app:"
echo "  export GEMINI_API_KEY='your-key-here'  # If not already set"
echo "  streamlit run app.py"
echo ""
echo "The app will automatically detect and use your GPU!"
echo ""
