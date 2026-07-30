import api from "./api";

export async function analyzeImage(imageFile) {
  const formData = new FormData();

  // Must match the backend parameter:
  // detect_image(file: UploadFile = File(...))
  formData.append("file", imageFile);

  const response = await api.post("/detect/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}