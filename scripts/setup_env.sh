#!/bin/bash
# DocMind environment setup script for developers

echo "Setting up DocMind-RAG environment..."

# Check python installation
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is required but not installed."
    exit 1
fi

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
if [ -f "requirements.txt" ]; then
    echo "Installing Python dependencies..."
    pip install -r requirements.txt
else
    echo "Warning: requirements.txt not found. Installing default packages..."
    pip install langchain chromadb openai pydantic
fi

echo "Environment setup complete! Run 'source venv/bin/activate' to begin."
