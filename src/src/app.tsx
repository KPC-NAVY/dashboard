/** @jsx h */
import { h } from "preact";
import { Dispatch, StateUpdater, useEffect, useState } from "preact/hooks";
import { Bordered } from "./bordered.tsx";
import { CircleBar, CircleRudder } from "./circle.tsx";

// @ts-types="../tauri/tauri.d.ts"
import { invoke } from "../tauri/tauri.js";

export function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <div>
      <div className="board -clearfix">
        <div className="piece" onClick={() => invoke("greet", { name: "bob" })}>
          <Bordered>DISPLAY</Bordered>
        </div>

        <div className="piece">
          <Bordered danger="1">DANGER</Bordered>
        </div>

        <div className="piece">
          <Bordered>
            <div className="text -characters" style={{ fontSize: "80px" }}>
              内部
            </div>
            <div className="text">INTERNAL</div>
            <div className="decal -blink -striped"></div>
          </Bordered>
        </div>

        <div className="piece" onClick={() => startCharge(setCount)}>
          <Bordered>OUTPUT</Bordered>
          <CircleBar value={count} />
        </div>

        <div className="piece" onClick={() => startRad(setCount2)}>
          <Bordered>ANGLE</Bordered>
          <CircleRudder value={count2} />
        </div>

        <div className="piece">
          <div
            className="seg7 label"
            style={{ width: "100px", fontSize: "90px", color: "#fa0" }}
          >
            123
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;

function startCharge(setter: Dispatch<StateUpdater<number>>) {
  let i = 0;
  const id = setInterval(() => {
    i += 0.002;
    if (i >= 1) {
      clearInterval(id);
    }
    setter(i);
  }, 10);
}

function startRad(setter: Dispatch<StateUpdater<number>>) {
  let i = 0;
  const id = setInterval(() => {
    i += 0.1;
    if (i >= 180) {
      clearInterval(id);
    }
    setter(i);
  }, 10);
}
