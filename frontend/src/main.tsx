import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ConfigProvider } from "antd";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Inter, sans-serif", // ✅ override AntD token
          colorPrimary: "#593cfb",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
);
