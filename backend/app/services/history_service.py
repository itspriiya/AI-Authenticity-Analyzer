from app.db.database import SessionLocal
from app.db.crud import get_all_detections
from app.schemas.history_schema import HistoryResponse


class HistoryService:
    """
    Retrieves saved detection history from the database.
    Independent of FastAPI — manages its own session per call.
    """

    def get_history(self, modality: str | None = None) -> HistoryResponse:
        db = SessionLocal()
        try:
            detections = get_all_detections(db, modality=modality)
            return HistoryResponse(items=detections)
        finally:
            db.close()


if __name__ == "__main__":
    service = HistoryService()
    result = service.get_history()
    print(result)