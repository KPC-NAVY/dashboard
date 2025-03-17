import { EventEmitter } from "npm:events";

interface GemepadEvents {
    press: [Gamepad],
    axe: [Gamepad],
    changed: [Gamepad],
    a: [Gamepad],
    b: [Gamepad],
    x: [Gamepad],
    y: [Gamepad],
    up: [Gamepad],
    down: [Gamepad],
    right: [Gamepad],
    left: [Gamepad],
    rb: [Gamepad],
    rt: [Gamepad],
    lb: [Gamepad],
    lt: [Gamepad],
    r: [Gamepad, number, number],
    l: [Gamepad, number, number],
}

let stateHashpressed = 0;
let stateHashaxes = 0;

const keyMap = [
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
]

export const gamePad = new EventEmitter<GemepadEvents>();
function updateGamepad() {
    const gamepads = navigator.getGamepads();
    if (gamepads[0] && gamepads[0].connected) {
        const gp = gamepads[0];
        const [pressed, axes] = getStateHash(gp);
        if (stateHashpressed !== pressed) {
            stateHashpressed = pressed
            console.log("pressed", gp.buttons.map((e) => e.pressed));
            gamePad.emit("press", gp);
            gamePad.emit("changed", gp);
        }
        if (stateHashaxes !== axes) {
            stateHashaxes = axes
            console.log("axe", gp.axes);
            gamePad.emit("axe", gp);
            gamePad.emit("changed", gp);
        }
        requestAnimationFrame(updateGamepad);
    }
}

gamePad.on("press", (gp) => {
    gp.buttons.forEach((e, i) => {
        if (e.pressed) {
            gamePad.emit(keyMap[i] as any, gp as any)
        }
    })
})

gamePad.on("axe", (gp) => {
    const [l, r] = getRad(gp)
    if (l !== null) {
        gamePad.emit("l", gp, l, Math.sqrt(gp.axes[1] ** 2 + gp.axes[0] ** 2))
    }
    if (r !== null) {
        gamePad.emit("r", gp, r, Math.sqrt(gp.axes[2] ** 2 + gp.axes[3] ** 2))
    }
})

function getRad(gp: Gamepad) {
    return [((gp.axes[1] || gp.axes[0]) ? true : null) && Math.atan2(gp.axes[1], gp.axes[0]), ((gp.axes[3] || gp.axes[2]) ? true : null) && Math.atan2(gp.axes[3], gp.axes[2])]
}
function getStateHash(gp: Gamepad) {
    let x = 0;
    let y = 0;
    gp.buttons.forEach((e, i) => {
        if (e.pressed) {
            x |= 1 << i
        }
    })
    gp.axes.forEach((e, i) => {
        y += e * (1 << (20 + i))
    })
    return [x, y]
}

window.addEventListener("gamepadconnected", () => {
    requestAnimationFrame(updateGamepad);
});
