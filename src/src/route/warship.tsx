/** @jsx h */
import { h } from "preact";
import {
  Bordered,
  CircleAngle,
  CircleBar,
  Compass,
  Piece,
} from "../elements/mod.ts";
import {
  Dispatch,
  StateUpdater,
  useEffect,
  useRef,
  useState,
} from "preact/hooks";
import { usePos } from "../storage.ts";
import { gamePad } from "../pad.ts";

export function WarShip(props: { path: string }) {
  return (
    <div>
      <Launch />
      <Outputs />
    </div>
  );
}

function Launch() {
  const [pos, setPos] = usePos("take_off");
  const [effect, setEffect] = useState(true);
  return (
    <Piece {...pos} onClick={() => startFlash(setEffect)}>
      <Bordered striped="1">
        <div className="text -characters" style={{ fontSize: "80px" }}>
          発射
        </div>
        <div className="text" style={{ fontSize: "40px" }}>LAUNCH</div>
        <div className={`decal -blink ${effect ? "-striped" : ""}`}></div>
      </Bordered>
    </Piece>
  );
}

function Outputs() {
  const [count, setCount] = useState(0);
  const [pos, setPos] = usePos("output1");
  return (
    <Piece {...pos}>
      <div className="row">
        <div>
          <div className="row">
            <CircleBar value={count} />
            <CircleAngle value={90} />
            <CircleBar value={count} />
          </div>
          <div className="text" style={{ color: "#fa0" }}>
            MOTOR OUTPUT
          </div>
        </div>
        <div>
          <div className="row">
            <Compass value={0.25} />
          </div>
          <div className="text" style={{ color: "#fa0" }}>
            DIRECTION
          </div>
        </div>
      </div>
    </Piece>
  );
}

function startFlash(setter: Dispatch<StateUpdater<boolean>>) {
  let i = 0;
  const id = setInterval(() => {
    i += 1;
    if (i == 31) {
      clearInterval(id);
    }
    setter(Boolean(i % 2));
  }, 100);
}
