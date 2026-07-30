import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import "./ImageResult.css";

function ImageResult({ result }) {
  const { label, confidence, probabilities } = result;

  const isHuman = label.toLowerCase() === "human";

  const confidencePercent = (confidence * 100).toFixed(1);
  const aiPercent = (probabilities.artificial * 100).toFixed(1);
  const humanPercent = (probabilities.human * 100).toFixed(1);

  const [barWidth, setBarWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    const timeoutId = setTimeout(() => {
      setBarWidth(Number(confidencePercent));
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [confidencePercent]);

  return (
    <div className="image-result" ref={containerRef}>
      <h2 className="image-result-title">
        IMAGE DETECTION RESULT
      </h2>

      <div className="image-result-prediction">
        <Icon
          icon={isHuman ? "subway:tick" : "boxicons:robot"}
          className={
            isHuman
              ? "image-result-icon-human"
              : "image-result-icon-ai"
          }
        />

        <span
          className={
            isHuman
              ? "image-result-label image-result-label-human"
              : "image-result-label image-result-label-ai"
          }
        >
          {isHuman ? "HUMAN" : "AI"}
        </span>
      </div>

      <p className="image-result-confidence">
        CONFIDENCE : {confidencePercent}%
      </p>

      <div className="image-result-bar-track">
        <div
          className={
            isHuman
              ? "image-result-bar-fill-human"
              : "image-result-bar-fill-ai"
          }
          style={{ width: `${barWidth}%` }}
        />
      </div>

      <div className="image-result-breakdown">
        <p>
          AI : <span className="ai-score">{aiPercent}%</span>
        </p>

        <p>
          HUMAN : <span className="human-score">{humanPercent}%</span>
        </p>
      </div>
    </div>
  );
}

export default ImageResult;