import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { MessageProvider } from "./components/message/MessageManager";
import "./index.scss";

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <MessageProvider>
      <App />
    </MessageProvider>
  </StrictMode>,
);
