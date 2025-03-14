import * as esbuild from "npm:esbuild@0.23.0";
import { denoPlugins } from "jsr:@duesabati/esbuild-deno-plugin@^0.0.1";
import { fileURLToPath } from "node:url"

try {
    Deno.mkdirSync(fileURLToPath(import.meta.resolve("./page/dist/")))
} catch (_) {
}

await esbuild.build({
    plugins: [...denoPlugins()],
    entryPoints: [import.meta.resolve("./src/index.ts")],
    outfile: fileURLToPath(import.meta.resolve("./page/dist/index.js")),
    bundle: true,
    format: "esm",
});
esbuild.stop();