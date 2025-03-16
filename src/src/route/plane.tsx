/** @jsx h */
import { h } from "preact";
import { Bordered, CircleAngle,CircleAngle2, CircleBar, Piece } from "../elements/mod.ts";
import {
  Dispatch,
  StateUpdater,
  useEffect,
  useRef,
  useState,
} from "preact/hooks";
import { usePos } from "../storage.ts";

export function Plane(props: { path: string }) {
  return (
    <div>
      <Outputs />
    </div>
  );
}

function Outputs() {
  const [count, setCount] = useState(0);
  const [pos, setPos] = usePos("output1");
  return (
    <Piece {...pos}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <CircleBar value={count} />
        <CircleAngle value={90} />
        <CircleAngle2 value={90} />
      </div>
      <div className="text" style={{ color: "#fa0" }}>
        MOTOR OUTPUT
      </div>
    </Piece>
  );
}
