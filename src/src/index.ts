/// <reference lib="dom"/>

// @ts-types="./tauri.d.ts"
import { invoke } from "./tauri.js";

const circle_getXY = (r = 25, angle: number) => [28 + r * Math.cos(2 * Math.PI * angle), 28 + r * Math.sin(2 * Math.PI * angle)];
function circle_bar(val = 0.5, svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")) {
    const rval = val * 0.8333333333333334
    const path_val = svg.getElementsByClassName("circle-val")[0]
    const text = svg.getElementsByClassName("circle-val-txt")[0]
    if (val >= 1) {
        svg.classList.add("max");
        path_val.setAttribute("fill", "#0fc");
        path_val.setAttribute("d", `M ${circle_getXY(25, 1 / 3).join(" ")} A 25 25 0 ${rval > 0.5 ? 1 : 0} 1 ${circle_getXY(25, 1 / 3 + rval).join(" ")} L ${circle_getXY(27, 1 / 3 + rval).join(" ")} A 27 27 0 ${rval > 0.5 ? 1 : 0} 0 ${circle_getXY(27, 1 / 3).join(" ")} Z`);
        text.setAttribute("x", "43");
        text.setAttribute("y", "37");
        text.setAttribute("fill", "#0fc");
        text.innerHTML = "100"
    } else {
        svg.classList.remove("max");
        path_val.setAttribute("fill", "#fa0");
        path_val.setAttribute("d", `M ${circle_getXY(25, 1 / 3).join(" ")} A 25 25 0 ${rval > 0.5 ? 1 : 0} 1 ${circle_getXY(25, 1 / 3 + rval).join(" ")} L ${circle_getXY(27, 1 / 3 + rval).join(" ")} A 27 27 0 ${rval > 0.5 ? 1 : 0} 0 ${circle_getXY(27, 1 / 3).join(" ")} Z`);
        text.setAttribute("x", "40");
        text.setAttribute("y", "37");
        text.setAttribute("fill", "#fa0");
        text.innerHTML = Math.floor(val * 100) + ""
    }
}

function circle_rudder(val = 0, svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")) {
    const rval = val * 0.00462962962962963
    const path_val = svg.getElementsByClassName("circle-val")[0]
    const text = svg.getElementsByClassName("circle-val-txt")[0]
    svg.classList.remove("max");
    path_val.setAttribute("fill", "#fa0");
    path_val.setAttribute("d", `M ${circle_getXY(27, 1 / 3 + rval).join(" ")} L ${circle_getXY(22, 1 / 3 + rval + 0.01).join(" ")} L ${circle_getXY(22, 1 / 3 + rval - 0.01).join(" ")} Z`);
    text.setAttribute("x", "40");
    text.setAttribute("y", "37");
    text.setAttribute("fill", "#fa0");
    text.innerHTML = Math.abs(Math.floor(val - 90)) + ""
}


let i = 0;
const x = setInterval(() => {
    if (i > 1) {
    } else {
        i += 0.01;
    }
    circle_bar(i, document.getElementById("tmp") as any)
}, 50)
document.getElementById("tmp")!.addEventListener("click", () => {
    i = 0
})

let r = 0;
const xx = setInterval(() => {
    if (r > 180) {
    } else {
        r += 0.5;
    }
    circle_rudder(r, document.getElementById("tmp2") as any)
}, 20)
document.getElementById("tmp2")!.addEventListener("click", () => {
    r = 0
})