import os
import tempfile

from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.image_service import ImageService
from app.schemas.image_schema import ImageDetectionResponse

router = APIRouter()

image_service = ImageService()

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png"}


@router.post("/detect/image", response_model=ImageDetectionResponse)
async def detect_image(file: UploadFile = File(...)):
    filename = file.filename or ""
    suffix = os.path.splitext(filename)[1]

    if suffix.lower() not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, JPEG and PNG images are supported.",
        )

    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
        temp_path = temp_file.name
        contents = await file.read()
        temp_file.write(contents)

    try:
        result = image_service.analyze(temp_path, original_filename=filename)
    finally:
        os.remove(temp_path)

    return result