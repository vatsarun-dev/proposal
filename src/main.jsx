import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./app/providers/AppProvider";
import { LenisProvider } from "./app/providers/LenisProvider";

createRoot(document.getElementById("root")).render(
  <AppProvider>
    <BrowserRouter>
      <LenisProvider>
        <App />
      </LenisProvider>
    </BrowserRouter>
  </AppProvider>
);
