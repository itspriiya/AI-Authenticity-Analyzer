from datetime import datetime

from pydantic import BaseModel, ConfigDict


class HistoryItem(BaseModel):
    id: int
    modality: str
    input_preview: str
    label: str
    confidence: float
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class HistoryResponse(BaseModel):
    items: list[HistoryItem]