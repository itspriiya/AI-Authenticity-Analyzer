from sqlalchemy.orm import Session

from app.db.models import Detection


def create_detection(
    db: Session,
    modality: str,
    input_preview: str,
    label: str,
    confidence: float,
    sentence_scores: dict | list | None = None,
) -> Detection:
    db_detection = Detection(
        modality=modality,
        input_preview=input_preview,
        label=label,
        confidence=confidence,
        sentence_scores=sentence_scores,
    )
    db.add(db_detection)
    db.commit()
    db.refresh(db_detection)
    return db_detection


def get_detection(db: Session, detection_id: int) -> Detection | None:
    return db.query(Detection).filter(Detection.id == detection_id).first()


def get_all_detections(db: Session, modality: str | None = None) -> list[Detection]:
    query = db.query(Detection)
    if modality is not None:
        query = query.filter(Detection.modality == modality)
    return query.order_by(Detection.created_at.desc()).all()


def delete_detection(db: Session, detection_id: int) -> bool:
    db_detection = get_detection(db, detection_id)
    if db_detection is None:
        return False
    db.delete(db_detection)
    db.commit()
    return True