from pydantic import BaseModel


class ImageDetectionResponse(BaseModel):
    label: str
    confidence: float
    probabilities: dict[str, float]