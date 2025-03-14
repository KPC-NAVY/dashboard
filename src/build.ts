import { bundle } from "https://deno.land/x/emit/mod.ts";
import { fileURLToPath } from "node:url"
Deno.writeTextFileSync(fileURLToPath(import.meta.resolve("./page/dist/index.js")), (await bundle(import.meta.resolve("./src/index.ts"))).code, { create: true })