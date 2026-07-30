import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import Navbar from "../components/Navbar/Navbar";
import ImageResult from "../components/ImageResult/ImageResult";
import { analyzeImage } from "../api/imageApi";
import "./ImageDetectionPage.css";

function ImageDetectionPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Analyzing");
  const [result, setResult] = useState(null);
  const [resultKey, setResultKey] = useState(0);
  const [showError, setShowError] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

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

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      const objectUrl = URL.createObjectURL(file);

      setSelectedImage(file);
      setPreviewUrl(objectUrl);
      setShowError(false);
    }
  };

  const handleChooseImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    handleFile(event.target.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleFile(event.dataTransfer.files[0]);
  };

  const handleAnalyzeClick = async () => {
    if (!selectedImage) {
      setShowError(true);
      return;
    }

    try {
      setIsLoading(true);

      const data = await analyzeImage(selectedImage);

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
    <div className="image-detection-page">
      <Navbar title="IMAGE DETECTION" />

      <main className="image-detection-main">
        <p className="disclaimer">
          AI detection is not 100% accurate. Results should be used as an
          estimate, not definitive proof.
          <br />
          Model: Organika/sdxl-detector
        </p>

        <div
          className="upload-area"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <span className="upload-text">Drag Image here</span>

          <span className="upload-text">OR</span>

          <button
            type="button"
            className="choose-image-button"
            onClick={handleChooseImageClick}
          >
            Choose image
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            style={{ display: "none" }}
          />
        </div>

        {previewUrl && (
          <div className="preview-container">
            <span className="preview-label">Image preview</span>

            <img
              className="preview-image"
              src={previewUrl}
              alt="Selected preview"
            />
          </div>
        )}

        <button
          type="button"
          className="analyze-button"
          onClick={handleAnalyzeClick}
          disabled={isLoading}
        >
          {isLoading ? loadingText : "ANALYZE IMAGE"}
        </button>

        {showError && (
          <div className="image-error">
            <Icon icon="pixel:face-sad-solid" width="30" height="30" />
            <span>Please upload an image</span>
          </div>
        )}

        {result && <ImageResult key={resultKey} result={result} />}
      </main>
    </div>
  );
}

export default ImageDetectionPage;