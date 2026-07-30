from fastapi import APIRouter, HTTPException, Query

from app.schemas.history_schema import HistoryResponse
from app.services.history_service import HistoryService

router = APIRouter()

history_service = HistoryService()

ALLOWED_MODALITIES = {"text", "image"}


@router.get("/history", response_model=HistoryResponse)
def get_history(modality: str | None = Query(default=None)):
    if modality is not None and modality not in ALLOWED_MODALITIES:
        raise HTTPException(
            status_code=400,
            detail="modality must be either 'text' or 'image'.",
        )

    return history_service.get_history(modality=modality)