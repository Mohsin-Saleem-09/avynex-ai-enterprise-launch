#!/bin/bash
# Quick Start Script for OCR Comparison App
# Run this script to set up and launch the app

echo "🚀 OCR Comparison + Gemini App - Quick Start"
echo "=============================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 not found. Please install Python 3.8+"
    exit 1
fi

echo "✅ Python found: $(python3 --version)"
echo ""

# Check for API key
if [ -z "$GEMINI_API_KEY" ]; then
    echo "⚠️  GEMINI_API_KEY not set!"
    echo ""
    echo "1. Get your API key: https://aistudio.google.com/app/apikeys"
    echo "2. Export it:"
    echo ""
    echo "   export GEMINI_API_KEY=\"your-api-key-here\""
    echo ""
    echo "Then run this script again."
    echo ""
else
    echo "✅ GEMINI_API_KEY is set"
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
echo "(This may take a few minutes, especially torch/transformers)"
echo ""

pip install -r requirements.txt

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed!"
echo ""
echo "🎉 Launching Streamlit app..."
echo ""
echo "The app will open at: http://localhost:8501"
echo "Press Ctrl+C to stop the server"
echo ""

# Launch the app
streamlit run app.py
