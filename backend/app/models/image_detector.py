from transformers import AutoImageProcessor, AutoModelForImageClassification
from PIL import Image
import torch


class ImageDetector:
    """
    Loads and runs Organika/sdxl-detector for AI-vs-human image
    classification. Standalone: no FastAPI, no DB, no service logic.
    """

    MODEL_NAME = "Organika/sdxl-detector"

    def __init__(self, device: str | None = None):
        self.device = device or ("cuda" if torch.cuda.is_available() else "cpu")
        self.processor = None
        self.model = None
        self._loaded = False

    def load(self) -> None:
        """Downloads/loads the image processor and classification model. Runs once."""
        if self._loaded:
            return

        self.processor = AutoImageProcessor.from_pretrained(self.MODEL_NAME)
        self.model = AutoModelForImageClassification.from_pretrained(self.MODEL_NAME)

        self.model.to(self.device)
        self.model.eval()

        self._loaded = True

    def predict(self, image_path: str) -> dict:
        """Returns label, confidence, and full probability breakdown for one image."""
        if not self._loaded:
            self.load()

        image = Image.open(image_path).convert("RGB")
        inputs = self.processor(images=image, return_tensors="pt")
        inputs = {key: value.to(self.device) for key, value in inputs.items()}

        with torch.no_grad():
            logits = self.model(**inputs).logits

        probabilities = torch.softmax(logits, dim=-1)[0]
        predicted_class_id = int(torch.argmax(probabilities).item())

        id2label = self.model.config.id2label

        return {
            "label": id2label[predicted_class_id],
            "confidence": float(probabilities[predicted_class_id]),
            "probabilities": {
                id2label[idx]: float(probabilities[idx])
                for idx in range(len(id2label))
            },
        }


if __name__ == "__main__":
    detector = ImageDetector()
    image_path = input("Enter path to an image file: ").strip()
    result = detector.predict(image_path)
    print(result)