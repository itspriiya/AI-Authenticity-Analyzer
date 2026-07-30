import { Icon } from "@iconify/react";
import "./HistoryCard.css";

function HistoryCard({ prediction, confidence, date, filename }) {
  const isHuman = prediction === "HUMAN";

  return (
    <div className="history-card">
      <div className="history-card-left">
        <div className="history-card-label-row">
          <Icon
            icon={isHuman ? "subway:tick" : "boxicons:robot"}
            className={isHuman ? "icon-human" : "icon-ai"}
          />

          <span
            className={
              isHuman
                ? "prediction-label prediction-label-human"
                : "prediction-label prediction-label-ai"
            }
          >
            {prediction}
          </span>
        </div>

        <span className="filename">
          {filename}
        </span>
      </div>

      <div className="history-card-center">
        <span className="confidence">
          {confidence}
        </span>
      </div>

      <div className="history-card-right">
        <span className="date">
          {date}
        </span>
      </div>
    </div>
  );
}

export default HistoryCard;