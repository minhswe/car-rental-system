import axios, { AxiosError, AxiosResponse } from "axios";
import { refreshToken } from "./auth.service";

interface ApiError {
  message: string;
  status?: number;
  data?: any;
}

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

const handleError = (error: unknown): ApiError => {
  if (error instanceof AxiosError) {
    const response = error.response;
    if (response) {
      return {
        message: response.data?.message || "An error occurred",
        status: response.status,
        data: response.data,
      };
    }
    // Network error or no response
    return {
      message: error.message || "Network error",
    };
  }
  return {
    message: "An unknown error occurred",
  };
};

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;
    //if 401 error and not refresh token
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refreshToken")
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const data = await refreshToken();
          localStorage.setItem("accessToken", data.accessToken);
          onRefreshed(data.accessToken);
          isRefreshing = false;
        } catch {
          isRefreshing = false;
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          window.location.href = "/auth/signin";
          return Promise.reject(error);
        }
      }
      return new Promise((resolve) => {
        subscribeTokenRefresh((token: string) => {
          originalRequest.headers["Authorization"] = `Bearer ${token}`;
          resolve(apiClient(originalRequest));
        });
      });
    }
    return Promise.reject(handleError(error));
  }
);

export default apiClient;
