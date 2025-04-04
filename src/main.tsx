import { render } from "preact";
import "./index.css";
import App from "./app.tsx";

const root = document.getElementById("root");

if (root) {
  render(<App />, root);
}
