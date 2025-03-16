/** @jsx h */
import { h } from "preact";
import {
  Dispatch,
  StateUpdater,
  useEffect,
  useRef,
  useState,
} from "preact/hooks";

import { Bordered, CircleBar, CircleAngle, Piece } from "./elements/mod.ts";
import { usePos } from "./storage.ts";

export function Danger() {
  const [pos, setPos] = usePos("head");
  return (
    <Piece {...pos}>
      <Bordered danger="1">DANGER</Bordered>
    </Piece>
  );
}

export function Internal() {
  const [pos, setPos] = usePos("internal");
  const [effect, setEffect] = useState(true);
  return (
    <Piece {...pos} onClick={() => startFlash(setEffect)}>
      <Bordered striped="1">
        <div className="text -characters" style={{ fontSize: "80px" }}>
          内部
        </div>
        <div className="text">INTERNAL</div>
        <div className={`decal -blink ${effect ? "-striped" : ""}`}></div>
      </Bordered>
    </Piece>
  );
}

export function Takeoff() {
  const [pos, setPos] = usePos("take_off");
  const [effect, setEffect] = useState(true);
  return (
    <Piece {...pos} onClick={() => startFlash(setEffect)}>
      <Bordered striped="1">
        <div className="text -characters" style={{ fontSize: "80px" }}>
          発進
        </div>
        <div className="text" style={{ fontSize: "40px" }}>TAKEOFF</div>
        <div className={`decal -blink ${effect ? "-striped" : ""}`}></div>
      </Bordered>
    </Piece>
  );
}

export function Output1() {
  const [count, setCount] = useState(0);
  const [pos, setPos] = usePos("output1");
  return (
    <Piece {...pos} onClick={() => startCharge(setCount)}>
      <Bordered>OUTPUT</Bordered>
      <CircleBar value={count} />
    </Piece>
  );
}

export function Angle1() {
  const [count, setCount] = useState(0);
  const [pos, setPos] = usePos("angle1");
  return (
    <Piece {...pos} onClick={() => startRad(setCount)}>
      <Bordered>ANGLE</Bordered>
      <CircleAngle value={count} />
    </Piece>
  );
}

export function Seg7() {
  const [pos, setPos] = usePos("seg7");
  return (
    <Piece {...pos}>
      <div
        className="seg7 label"
        style={{ width: "100px", fontSize: "90px", color: "#fa0" }}
      >
        123
      </div>
    </Piece>
  );
}

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
    i += 0.2;
    if (i >= 180) {
      clearInterval(id);
    }
    setter(i);
  }, 10);
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
