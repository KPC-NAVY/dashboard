/** @jsx h */
import { h } from "preact";
import { Router } from "preact-router";
// @ts-types="../tauri/tauri.d.ts"
import { invoke } from "../tauri/_tauri.js";

import { getSettings } from "./storage.ts";
import { Header } from "./head.tsx";
import { Main, Plane, WarShip } from "./route/mod.ts";
/*
<button
  type="button"
  onClick={() =>
    invoke("greet", { name: prompt("name?") ?? "bob" }).then((r) => alert(r))}
>
  INVOKE
</button>;
*/
export function App() {
  return (
    <div className="board -clearfix">
      <Header />
      <Router>
        <Main path="/" />
        <WarShip path="/warship" />
        <Plane path="/plane" />
      </Router>
    </div>
  );
}
export default App;
