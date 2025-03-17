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

export function Main(props: { path: string }) {
  return (
    <div>
      <Outputs />
      <Status />
    </div>
  );
}

function Status() {
  const [pos, setPos] = usePos("take_off");

  return (
    <Piece {...pos}>
      <div style={{ display: "flex", flexDirection: "column-reverse" }}>
        <Takeoff />
        <Underway />
      </div>
    </Piece>
  );
}

function Underway() {
  return (
    <Bordered
      style={{ marginTop: "10px" }}
    >
      <div className="text -characters" style={{ fontSize: "70px" }}>
        航行中
      </div>
      <div className="text" style={{ fontSize: "40px" }}>UNDERWAY</div>
    </Bordered>
  );
}

function Takeoff() {
  const [effect, setEffect] = useState(true);
  useEffect(() => {
    const f = (g: Gamepad) => setEffect(g.buttons[0].pressed);
    gamePad.on("press", f);
    return () => gamePad.off("press", f);
  }, []);
  return (
    <Bordered
      striped="1"
      onClick={() => startFlash(setEffect)}
      style={{ marginTop: "10px" }}
    >
      <div className="text -characters" style={{ fontSize: "80px" }}>
        発進
      </div>
      <div className="text" style={{ fontSize: "40px" }}>TAKEOFF</div>
      <div className={`decal -blink ${effect ? "-striped" : ""}`}></div>
    </Bordered>
  );
}

function Outputs() {
  const [count, setCount] = useState(0);
  const [compass, setCompass] = useState(0);

  useEffect(() => {
    const f = (gp: Gamepad, rad: number, len: number) => {
      setCompass(rad / Math.PI / 2 + 0.25);
    };
    gamePad.on("l", f);
    return () => gamePad.off("l", f);
  }, []);

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
            <Compass value={compass} />
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
