/** @jsx h */
import { h } from "preact";
import { Bordered, Piece } from "./elements/mod.ts";
import { usePos } from "./storage.ts";
import { useEffect, useState } from "preact/hooks";
import { route, Router } from "preact-router";

export function Header() {
  const [pos, setPos] = usePos("head");
  const [currentUrl, setCurrentUrl] = useState(
    window.location.pathname,
  );

  return (
    <Piece {...pos}>
      <Router
        onChange={(e) => {
          setCurrentUrl(e.url);
        }}
      >
      </Router>
      <div className="row">
        <Bordered
          disable={currentUrl === "/" || currentUrl === "/#" ? "0" : "1"}
          style={{ marginRight: "10px" }}
          onClick={() => route("/", false)}
        >
          MAIN
        </Bordered>
        <Bordered
          disable={currentUrl === "/plane" ? "0" : "1"}
          style={{ marginRight: "10px" }}
          onClick={() => route("/plane", false)}
        >
          PLANE
        </Bordered>
        <Bordered
          disable={currentUrl === "/warship" ? "0" : "1"}
          style={{ marginRight: "10px" }}
          onClick={() => route("/warship", false)}
        >
          WARSHIP
        </Bordered>
      </div>
    </Piece>
  );
}
