from transformers import AutoModelForSequenceClassification, AutoTokenizer
from peft import PeftModel, PeftConfig
import torch


class TextDetector:
    """
    Loads and runs the configured AI-vs-human text classification model.

    Standalone:
    - No FastAPI
    - No database
    - No service logic
    """

    MODEL_REPO = "gouwsxander/slop-detector-bert"
    MAX_LENGTH = 512
    ID2LABEL = {0: "HUMAN", 1: "AI"}

    def __init__(self, device: str | None = None):
        self.device = device or ("cuda" if torch.cuda.is_available() else "cpu")
        self.tokenizer = None
        self.model = None
        self._loaded = False

    def load(self) -> None:
        """Downloads and loads the model once."""
        if self._loaded:
            return

        peft_config = PeftConfig.from_pretrained(self.MODEL_REPO)
        base_model_name = peft_config.base_model_name_or_path

        self.tokenizer = AutoTokenizer.from_pretrained(base_model_name)

        base_model = AutoModelForSequenceClassification.from_pretrained(
            base_model_name,
            num_labels=2,
            id2label=self.ID2LABEL,
            label2id={label: idx for idx, label in self.ID2LABEL.items()},
        )

        self.model = PeftModel.from_pretrained(base_model, self.MODEL_REPO)
        self.model.to(self.device)
        self.model.eval()

        self._loaded = True

    def predict(self, text: str) -> dict:
        """Predicts whether text is AI-generated or human-written."""
        if not self._loaded:
            self.load()

        inputs = self.tokenizer(
            text,
            return_tensors="pt",
            truncation=True,
            max_length=self.MAX_LENGTH,
        )

        inputs = {
            key: value.to(self.device)
            for key, value in inputs.items()
        }

        with torch.no_grad():
            logits = self.model(**inputs).logits

        probabilities = torch.softmax(logits, dim=-1)[0]
        predicted_class_id = int(torch.argmax(probabilities).item())

        return {
            "label": self.ID2LABEL[predicted_class_id],
            "confidence": float(probabilities[predicted_class_id]),
            "probabilities": {
                self.ID2LABEL[idx]: float(probabilities[idx])
                for idx in range(len(self.ID2LABEL))
            },
        }


if __name__ == "__main__":
    detector = TextDetector()

    sample_text = (
        "Artificial intelligence is transforming healthcare by improving "
        "diagnostics and automating routine tasks."
    )

    result = detector.predict(sample_text)

    print(result)