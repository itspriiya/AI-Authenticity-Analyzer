import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import Navbar from "../components/Navbar/Navbar";
import HistoryCard from "../components/HistoryCard/HistoryCard";
import { getHistory } from "../api/historyApi";
import { formatHistoryDate } from "../utils/formatDate";
import "./HistoryPage.css";

const FILTERS = [
  "ALL",
  "TEXT",
  "IMAGE",
];

function HistoryPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const modality =
      activeFilter === "ALL"
        ? undefined
        : activeFilter.toLowerCase();

    const fetchHistory = async () => {
      try {
        const data = await getHistory(modality);
        setHistory(data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHistory();
  }, [activeFilter]);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const truncateText = (text, maxLength = 35) => {
    if (!text) return "";

    if (text.length <= maxLength) {
      return text;
    }

    return `${text.slice(0, maxLength)}...`;
  };

  return (
    <div className="history-page">
      <Navbar title="DETECTION HISTORY" />

      <main className="history-main">
        <div className="filter-buttons">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              className="filter-button"
              onClick={() => handleFilterClick(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="history-list">
          {history.length === 0 ? (
            <div className="empty-history">
              <Icon
                icon="dinkie-icons:cat-face-small"
                className="empty-history-icon"
              />

              <span className="empty-history-text">
                Analyze some text or images to get started
              </span>
            </div>
          ) : (
            history.map((item) => (
              <HistoryCard
                key={item.id}
                prediction={item.label.toLowerCase() === "artificial"
                  ? "AI"
                  : "HUMAN"
                }
                confidence={`${(item.confidence * 100).toFixed(1)}%`}
                date={formatHistoryDate(item.created_at)}
                filename={truncateText(item.input_preview)}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default HistoryPage;