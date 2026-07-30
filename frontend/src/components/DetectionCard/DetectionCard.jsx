import { useNavigate } from "react-router-dom";
import "./DetectionCard.css";

function DetectionCard({ title, description, path }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <button
      type="button"
      className="detection-card"
      onClick={handleClick}
    >
      <h2 className="detection-card-title">{title}</h2>
      <p className="detection-card-description">{description}</p>
    </button>
  );
}

export default DetectionCard;