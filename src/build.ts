import * as esbuild from "npm:esbuild";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader";
import { fileURLToPath } from "node:url";

try {
  Deno.mkdirSync(fileURLToPath(import.meta.resolve("./page/dist/")));
} catch (_) {
}

Deno.writeTextFileSync(
  "./src/tauri/_tauri.js",
  Deno.args[0] === "norust"
    ? "export const invoke = (...args)=>{ console.log(args) }"
    : "export const invoke = window.__TAURI__.core.invoke;",
);

const result = await esbuild.build({
  plugins: [...denoPlugins()],
  entryPoints: [import.meta.resolve("./src/index.tsx")],
  outfile: "./src/page/dist/index.js",
  bundle: true,
  format: "iife",
});

esbuild.stop();
