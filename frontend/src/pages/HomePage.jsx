import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import DetectionCard from "../components/DetectionCard/DetectionCard";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  const handleHistoryClick = () => {
    navigate("/history");
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <Icon
          icon="mdi:robot-happy"
          className="home-robot-icon"
        />
      </header>

      <main className="home-main">
        <h1 className="home-title">
          AI CONTENT AUTHENTICITY ANALYZER
        </h1>

        <p className="home-subtitle">
          Human or AI? Let's find out
        </p>

        <div className="home-cards">
          <DetectionCard
            title="TEXT"
            description="Detect AI-generated text"
            path="/text"
          />

          <DetectionCard
            title="IMAGE"
            description="Detect AI-generated image"
            path="/image"
          />
        </div>

        <button
          type="button"
          className="home-history-button"
          onClick={handleHistoryClick}
        >
          VIEW HISTORY
        </button>
      </main>
    </div>
  );
}

export default HomePage;