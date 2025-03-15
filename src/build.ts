import * as esbuild from "npm:esbuild";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader";
import { fileURLToPath } from "node:url"

try {
  Deno.mkdirSync(fileURLToPath(import.meta.resolve("./page/dist/")))
} catch (_) {
}


Deno.writeTextFileSync("./src/tauri/tauri.js", Deno.args[0] === "norust" ? "export const invoke = ()=>{}" : "export const invoke = window.__TAURI__.core.invoke;")


const _TEMP_MAP_NAME = "./temp_map.json"

await Deno.readTextFile("./deno.json")
  .then(tx => JSON.parse(tx) as Record<string, Record<string, string>>).then(jdata => jdata.imports)
  .then(imports => {
    Deno.writeTextFile(_TEMP_MAP_NAME, JSON.stringify({ imports }))
  })

const importMapURL = import.meta.resolve(_TEMP_MAP_NAME)

const result = await esbuild.build({
  plugins: [...denoPlugins()],
  entryPoints: [import.meta.resolve("./src/index.tsx")],
  outfile: "./src/page/dist/index.js",
  bundle: true,
  format: "iife",
});

esbuild.stop();