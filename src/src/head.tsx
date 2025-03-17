/** @jsx h */
import { h } from "preact";
import { Bordered, Piece } from "./elements/mod.ts";
import { usePos } from "./storage.ts";
import { useEffect, useRef, useState } from "preact/hooks";
import { route, Router } from "preact-router";
import { gamePad } from "./pad.ts";

const paths = ["/", "/plane", "/warship"];
export function Header() {
  const [pos, setPos] = usePos("head");
  const ref = useRef(0);
  const [currentUrl, setCurrentUrl] = useState(
    window.location.pathname,
  );
  useEffect(() => {
    gamePad.on("buttondown", (_, k) => {
      if (k.includes("lb")) {
        ref.current = (ref.current + (paths.length - 1)) % paths.length;
        route(paths[ref.current]);
      } else if (k.includes("rb")) {
        ref.current = (ref.current + 1) % paths.length;
        route(paths[ref.current]);
      }
    });
  }, []);
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
