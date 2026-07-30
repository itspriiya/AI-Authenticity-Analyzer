from app.models.text_detector import TextDetector
from app.db.database import SessionLocal
from app.db.crud import create_detection


class TextService:
    """
    Orchestrates text detection.
    Wraps TextDetector and persists each result to the database,
    independent of FastAPI.
    """

    def __init__(self, detector: TextDetector | None = None):
        self.detector = detector or TextDetector()

    def analyze(self, text: str) -> dict:
        result = self.detector.predict(text)

        db = SessionLocal()
        try:
            create_detection(
                db=db,
                modality="text",
                input_preview="Pasted Text",
                label=result["label"],
                confidence=result["confidence"],
                sentence_scores=None,
            )
        finally:
            db.close()

        return result


if __name__ == "__main__":
    service = TextService()

    sample_text = (
        "The mitochondria is the powerhouse of the cell."
    )

    result = service.analyze(sample_text)
    print(result)