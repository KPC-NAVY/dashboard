/** @jsx h */
import { h } from "preact";
import { omit } from "../tools.ts";

export function Bordered(
  params: h.JSX.HTMLAttributes<HTMLDivElement> & { danger?: string, striped?: string },
) {
  return (
    <div
      {...omit(params, ["className","danger","striped"])}
      className={`label -bordered ${
        params.danger === "1" ? "--danger -blink" : ""
      } ${
        params.striped === "1" ? "-striped-base" : ""
      }`}
    >
    </div>
  );
}
