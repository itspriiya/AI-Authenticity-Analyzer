import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import TextDetectionPage from "../pages/TextDetectionPage";
import ImageDetectionPage from "../pages/ImageDetectionPage";
import HistoryPage from "../pages/HistoryPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/text" element={<TextDetectionPage />} />
      <Route path="/image" element={<ImageDetectionPage />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  );
}

export default AppRoutes;