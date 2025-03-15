/** @jsx h */
import { h } from "preact";

// @ts-types="../tauri/tauri.d.ts"
import { invoke } from "../tauri/_tauri.js";
import {
  Angle1,
  Danger,
  Display,
  Internal,
  Output1,
  Seg7,
  Takeoff,
} from "./pieces.tsx";

import { getSettings } from "./storage.ts";
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
      <Display />
      <Danger />
      <Internal />
      <Takeoff />
      <Output1 />
      <Angle1 />
      <Seg7 />
    </div>
  );
}
export default App;
