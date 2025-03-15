/** @jsx h */
import { h } from "preact";
import { omit } from "../tools.ts";
import { Pos } from "../storage.ts";

export function Piece(
  params: h.JSX.HTMLAttributes<HTMLDivElement> & Pos,
) {
  return (
    <div
      {...omit(params, ["x", "y", "_x", "_y", "className"])}
      style={{
        left: params.x && params.x + "px",
        top: params.y && params.y + "px",
        right: params._x && params._x + "px",
        bottom: params._y && params._y + "px",
      }}
      className="piece"
    >
    </div>
  );
}
