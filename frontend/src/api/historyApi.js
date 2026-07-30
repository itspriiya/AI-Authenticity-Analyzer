import api from "./api";

export async function getHistory(modality) {
  const response = await api.get("/history", {
    params: modality ? { modality } : {},
  });

  return response.data;
}