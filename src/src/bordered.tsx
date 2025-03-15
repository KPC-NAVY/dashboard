/** @jsx h */
import { h } from "preact";

export function Bordered(params: { children?: any; danger?: string }) {
  return (
    <div
      className={`label -bordered ${
        params.danger === "1" ? " --danger -blink" : ""
      }`}
    >
      {params.children}
    </div>
  );
}
