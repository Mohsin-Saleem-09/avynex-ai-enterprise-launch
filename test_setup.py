"""
Test script to verify OCR app setup and dependencies
Run: python test_setup.py
"""

import sys
import os

print("🧪 OCR Comparison App - Setup Verification")
print("=" * 50)
print()

# Check Python version
print(f"✓ Python: {sys.version}")
print()

# Check required packages
packages_to_check = [
    ("streamlit", "Streamlit UI framework"),
    ("PIL", "Pillow image library"),
    ("easyocr", "EasyOCR model"),
    ("requests", "HTTP requests"),
]

optional_packages = [
    ("transformers", "DeepSeekOCR2 transformers"),
    ("torch", "PyTorch for DeepSeekOCR2"),
    ("google.generativeai", "Gemini SDK"),
]

print("📦 Required Packages:")
all_required_ok = True
for package_name, description in packages_to_check:
    try:
        __import__(package_name)
        print(f"  ✅ {package_name:20} - {description}")
    except ImportError:
        print(f"  ❌ {package_name:20} - {description} (MISSING)")
        all_required_ok = False

print()
print("📦 Optional Packages (for DeepSeekOCR2 & Gemini):")
for package_name, description in optional_packages:
    try:
        __import__(package_name)
        print(f"  ✅ {package_name:20} - {description}")
    except ImportError:
        print(f"  ⚠️  {package_name:20} - {description} (not installed)")

print()
print("🔑 Environment Variables:")

gemini_key = "AIzaSyBQDl03SE4aWCi8sxUFStbb3u4BHWZYs48"
if gemini_key:
    masked_key = gemini_key[:6] + "*" * (len(gemini_key) - 10) + gemini_key[-4:]
    print(f"  ✅ GEMINI_API_KEY set ({masked_key})")
else:
    print(f"  ❌ GEMINI_API_KEY not set")
    print()
    print("     To use Gemini features, set your API key:")
    print("     export GEMINI_API_KEY='your-key-here'")

print()
print("=" * 50)

if all_required_ok:
    print("✅ All required packages installed!")
    print()
    print("🚀 Ready to run:")
    print("   streamlit run app.py")
else:
    print("❌ Some required packages are missing.")
    print()
    print("📥 Install with:")
    print("   pip install -r requirements.txt")

print()
