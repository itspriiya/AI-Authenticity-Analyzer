from pydantic import BaseModel


class TextDetectionRequest(BaseModel):
    text: str


class TextDetectionResponse(BaseModel):
    label: str
    confidence: float
    probabilities: dict[str, float]