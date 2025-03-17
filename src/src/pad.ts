import { EventEmitter } from "npm:events";

export interface StickValue {
  rad: number;
  value: number;
}

interface GemepadEvents {
  buttondown: [Gamepad, Keys[]];
  buttonup: [Gamepad, Keys[]];
  lvar: [Gamepad, number];
  lstick: [Gamepad, StickValue];
  rvar: [Gamepad, number];
  rstick: [Gamepad, StickValue];
  changed: [Gamepad];
}

export type Keys =
  | "a"
  | "b"
  | "x"
  | "y"
  | "lb"
  | "rb"
  | "lt"
  | "rt"
  | "back"
  | "start"
  | "lp"
  | "rp"
  | "up"
  | "down"
  | "left"
  | "right";
const keyMap: Keys[] = [
  "a",
  "b",
  "x",
  "y",
  "lb",
  "rb",
  "lt",
  "rt",
  "back",
  "start",
  "lp",
  "rp",
  "up",
  "down",
  "left",
  "right",
];
let lastButtons: boolean[] = [];
let lastSticks: number[] = [];
const lastVar = { r: 0, l: 0 };
export const gamePad = new EventEmitter<GemepadEvents>();
function updateGamepad() {
  const gamepads = navigator.getGamepads();
  if (gamepads[0] && gamepads[0].connected) {
    let changed = false;
    const gp = gamepads[0];
    const diffButton = getDiffButtons(gp.buttons, lastButtons);
    if (diffButton.down.length || diffButton.up.length) {
      if (diffButton.down.length) {
        console.log("down", diffButton.down);
        gamePad.emit("buttondown", gp, diffButton.down);
      }
      if (diffButton.up.length) {
        gamePad.emit("buttonup", gp, diffButton.up);
      }
      changed = true;
      lastButtons = gp.buttons.map(e => e.pressed);
    }
    const diffStick = getDiffSticks(gp.axes, lastSticks);
    if (diffStick.l || diffStick.r) {
      if (diffStick.l) {
        console.log("lstick", diffStick.l);
        gamePad.emit("lstick", gp, diffStick.l);
      }
      if (diffStick.r) {
        console.log("rstick", diffStick.r);
        gamePad.emit("rstick", gp, diffStick.r);
      }
      lastSticks = [...gp.axes];
      changed = true;
    }
    if (lastVar.l !== gp.buttons[6].value) {
      lastVar.l = gp.buttons[6].value;
      console.log("lvar", lastVar.l);
      gamePad.emit("lvar", gp, gp.buttons[6].value);
    }
    if (lastVar.r !== gp.buttons[7].value) {
      lastVar.r = gp.buttons[7].value;
      console.log("rvar", lastVar.r);
      gamePad.emit("rvar", gp, gp.buttons[7].value);
    }
    if (changed) {
      gamePad.emit("changed", gp);
    }
    requestAnimationFrame(updateGamepad);
  }
}

function getDiffButtons(
  buttons: readonly GamepadButton[],
  old: boolean[],
): { down: Keys[]; up: Keys[] } {
  const down: Keys[] = [];
  const up: Keys[] = [];
  buttons.forEach((e, i) => {
    if (e.pressed !== (old[i] ?? false)) {
      if (e.pressed) {
        down.push(keyMap[i]);
      } else {
        up.push(keyMap[i]);
      }
    }
  });
  return { down, up };
}

function getDiffSticks(
  sticks: readonly number[],
  old: number[],
): { r?: StickValue; l?: StickValue } {
  const vals: { r?: StickValue; l?: StickValue } = {};
  const [l, r] = getRad(sticks);
  if (sticks[0] !== old[0] || sticks[1] !== old[1]) {
    vals.l = { value: Math.sqrt(sticks[0] ** 2 + sticks[1] ** 2), rad: l };
  }
  if (sticks[2] !== old[2] || sticks[3] !== old[3]) {
    vals.r = { value: Math.sqrt(sticks[2] ** 2 + sticks[3] ** 2), rad: r };
  }
  return vals;
}

function getRad(axes: readonly number[]) {
  return [
    ((axes[1] || axes[0]) ? true : 0) && Math.atan2(axes[1], axes[0]),
    ((axes[3] || axes[2]) ? true : 0) && Math.atan2(axes[3], axes[2]),
  ];
}

window.addEventListener("gamepadconnected", () => {
  requestAnimationFrame(updateGamepad);
});
