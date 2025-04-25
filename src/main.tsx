import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./variables.css";
import "./reset.css";
import "./global.css";
import "./assets/css/nav-bar.css";
import "./assets/css/main.css";
import "./assets/css/header.css";
import "./assets/css/form.css";
import "./assets/css/recommended.css";
import "./assets/css/movie-section.css";
import "./assets/css/footer.css";
import "./assets/css/movie-card.css";
import "./assets/css/rating-badge.css";
import "./assets/css/skeleton.css";

createRoot(document.getElementById("root")!).render(<App />);
