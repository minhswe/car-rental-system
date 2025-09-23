import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/common/services/queryClient.ts";
import { Provider } from "react-redux";
import { store } from "@/common/stores/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "Inter, sans-serif", // ✅ override AntD token
            colorPrimary: "#593cfb",
          },
        }}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>
);
