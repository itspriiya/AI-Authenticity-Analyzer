from fastapi import APIRouter

from app.schemas.text_schema import TextDetectionRequest, TextDetectionResponse
from app.services.text_service import TextService

router = APIRouter()

text_service = TextService()


@router.post("/detect/text", response_model=TextDetectionResponse)
def detect_text(request: TextDetectionRequest):
    result = text_service.analyze(request.text)
    return result