import api from "./api";

export async function analyzeText(text) {
  const response = await api.post("/detect/text", {
    text,
  });

  return response.data;
}