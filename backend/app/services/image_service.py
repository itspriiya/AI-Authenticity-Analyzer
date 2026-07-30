import os

from app.models.image_detector import ImageDetector
from app.db.database import SessionLocal
from app.db.crud import create_detection


class ImageService:
    """
    Orchestrates image detection. Wraps ImageDetector and persists
    each result to the database — independent of FastAPI.
    """

    def __init__(self, detector: ImageDetector | None = None):
        self.detector = detector or ImageDetector()

    def analyze(self, image_path: str, original_filename: str | None = None) -> dict:
        result = self.detector.predict(image_path)

        input_preview = original_filename or os.path.basename(image_path)

        db = SessionLocal()
        try:
            create_detection(
                db=db,
                modality="image",
                input_preview=input_preview,
                label=result["label"],
                confidence=result["confidence"],
                sentence_scores=None,
            )
        finally:
            db.close()

        return result


if __name__ == "__main__":
    service = ImageService()
    image_path = input("Enter path to an image file: ").strip()
    result = service.analyze(image_path)
    print(result)