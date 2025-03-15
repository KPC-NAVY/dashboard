/** @jsx h */
import { h, render } from "preact";
import App from "./app.tsx";
// @ts-types="../tauri/tauri.d.ts"
import { invoke } from "../tauri/tauri.js";

render(
  <App />,
  document.body,
);
