# AI Content Authenticity Analyzer

An AI-powered web application that analyzes text and images to estimate whether they are AI-generated or human-created.

**Live Demo:** https://ai-authenticity-analyzer-1.onrender.com

## Features

- AI text detection using a fine-tuned BERT model
- AI image detection using an SDXL detection model
- Detection history with filtering (All, Text, Image)
- Confidence score visualization

## Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- FastAPI
- SQLite
- SQLAlchemy

### AI Models
- Text: `gouwsxander/slop-detector-bert`
- Image: `Organika/sdxl-detector`

## Installation

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Limitations

- The text detection model performs best on clearly AI-generated content and may be less reliable for heavily edited or mixed human-AI text.
- The image detection model may not accurately identify highly realistic AI-generated images.
- Detection results are estimates and should not be considered definitive proof of authorship.

## Future Improvements

- Improve text detection accuracy using more robust or fine-tuned models.
- Upgrade the image detection model to support newer and more photorealistic AI-generated images.
- Add batch analysis for multiple files.
- Provide detailed explanations for predictions.

## Acknowledgements

This project uses the following open-source models:

- **gouwsxander/slop-detector-bert** for AI text detection.
- **Organika/sdxl-detector** for AI image detection.

Please refer to the respective Hugging Face model pages for licensing and citation information.

## License

This project is licensed under the MIT License.