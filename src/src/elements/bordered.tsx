/** @jsx h */
import { h } from "preact";
import { omit } from "../tools.ts";

export function Bordered(
  params: h.JSX.HTMLAttributes<HTMLDivElement> & {
    danger?: string;
    striped?: string;
    disable?: string;
  },
) {
  return (
    <div
      {...omit(params, ["className", "danger", "striped"])}
      className={`label -bordered ${
        params.danger === "1" ? "--danger -blink" : ""
      } ${params.striped === "1" ? "-striped-base" : ""} ${
        params.disable === "1" ? "--disable" : ""
      }`}
    >
    </div>
  );
}
