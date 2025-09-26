import apiClient from "./apiClient";

interface UploadResponse {
  url: string;
}

interface ServerResponse {
  message: string;
  data: {
    urls: string[];
  };
}

export const uploadFilesVehicle = async (
  files: File[]
): Promise<UploadResponse[]> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const response = await apiClient.post<ServerResponse>(
    "/upload/vehicle",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  console.log(
    "Upload response:",
    response.data.data.urls.map((url) => ({
      url,
    }))
  );
  return response.data.data.urls.map((url) => ({
    url,
  }));
};
