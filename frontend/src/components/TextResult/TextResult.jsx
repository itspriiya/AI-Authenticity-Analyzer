import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import "./TextResult.css";

function TextResult({ result }) {
  const { label, confidence, probabilities } = result;
  const isHuman = label === "HUMAN";

  const confidencePercent = (confidence * 100).toFixed(1);
  const aiPercent = (probabilities.AI * 100).toFixed(1);
  const humanPercent = (probabilities.HUMAN * 100).toFixed(1);

  const [barWidth, setBarWidth] = useState(0);

  const resultRef = useRef(null);

  useEffect(() => {
    resultRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setBarWidth(Number(confidencePercent));
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [confidencePercent]);

  return (
    <div className="text-result" ref={resultRef}>
      <h2 className="text-result-title">TEXT DETECTION RESULT</h2>

      <div className="text-result-prediction">
        <Icon
          icon={isHuman ? "subway:tick" : "boxicons:robot"}
          className={isHuman ? "text-result-icon-human" : "text-result-icon-ai"}
        />

        <span
          className={
            isHuman
              ? "text-result-label text-result-label-human"
              : "text-result-label text-result-label-ai"
          }
        >
          {label}
        </span>
      </div>

      <p className="text-result-confidence">
        CONFIDENCE : {confidencePercent}%
      </p>

      <div className="text-result-bar-track">
        <div
          className={
            isHuman
              ? "text-result-bar-fill-human"
              : "text-result-bar-fill-ai"
          }
          style={{ width: `${barWidth}%` }}
        />
      </div>

      <div className="text-result-breakdown">
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

export default TextResult;