import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// TypeScript does not resolve CSS side-effect imports without a stylesheet declaration.
// @ts-expect-error CSS is handled by the bundler.
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>
);