import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Navbar from "../components/Navbar/Navbar";
import TextResult from "../components/TextResult/TextResult";
import { analyzeText } from "../api/textApi";
import "./TextDetectionPage.css";

function TextDetectionPage() {
  const MAX_CHARACTERS = 5000;

  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Analyzing");
  const [result, setResult] = useState(null);
  const [resultKey, setResultKey] = useState(0);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setLoadingText("Analyzing");
      return;
    }

    const states = [
      "Analyzing.",
      "Analyzing..",
      "Analyzing...",
    ];

    let index = 0;

    const interval = setInterval(() => {
      setLoadingText(states[index]);
      index = (index + 1) % states.length;
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  const handleTextChange = (event) => {
    setText(event.target.value);

    if (showError) {
      setShowError(false);
    }
  };

  const handleAnalyzeClick = async () => {
    if (text.trim() === "") {
      setShowError(true);
      return;
    }

    try {
      setIsLoading(true);

      const data = await analyzeText(text);

      setResult(data);
      setResultKey((previousKey) => previousKey + 1);
    } catch (error) {
      console.error(error);

      alert("Failed to connect to backend.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-page">
      <Navbar title="TEXT DETECTION" />

      <main className="text-page-content">
        <div className="text-disclaimer">
          <p>
            AI detection is not 100% accurate. Results should be used as an
            estimate, not definitive proof.
          </p>

          <p>Model: gouwsxander/slop-detector-bert</p>
        </div>

        <label className="text-label" htmlFor="text-input">
          Paste text below
        </label>

        <div className="textarea-container">
          <textarea
            id="text-input"
            className="text-input"
            value={text}
            onChange={handleTextChange}
            maxLength={MAX_CHARACTERS}
          />

          <div className="character-counter">
            {text.length}/{MAX_CHARACTERS}
          </div>
        </div>

        <button
          type="button"
          className="analyze-button"
          onClick={handleAnalyzeClick}
          disabled={isLoading}
        >
          {isLoading ? loadingText : "ANALYZE TEXT"}
        </button>

        {showError && (
          <div className="text-error">
            <Icon icon="pixel:face-sad-solid" width="30" height="30" />
            <span>Please paste text above</span>
          </div>
        )}

        {result && <TextResult key={resultKey} result={result} />}
      </main>
    </div>
  );
}

export default TextDetectionPage;