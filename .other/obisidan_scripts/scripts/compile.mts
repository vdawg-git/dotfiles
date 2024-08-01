import { glob } from "glob"
import c from "ansi-colors"
import * as esbuild from "esbuild"
import * as dotenv from "dotenv"
dotenv.config()

const outDir = process.env.SCRIPTS_PATH

if (!outDir) {
  throw new Error("Please set the SCRIPTS_PATH environment variable")
}

const files = await glob("./src/main/*.cts", { ignore: "node_modules/**" })

const context = await esbuild.context({
  entryPoints: files,
  outdir: process.env.SCRIPTS_PATH,
  bundle: true,
  platform: "node",
  external: [
    "canvas",
    "./xhr-sync-worker.js",
    "obsidian",
    "electron",
    "@codemirror/autocomplete",
    "@codemirror/collab",
    "@codemirror/commands",
    "@codemirror/language",
    "@codemirror/lint",
    "@codemirror/search",
    "@codemirror/state",
    "@codemirror/view",
    "@lezer/common",
    "@lezer/highlight",
    "@lezer/lr",
  ],
  keepNames: true,
  legalComments: "none",
  treeShaking: true,
})

console.log(c.blueBright.bgBlack("\n Compiling. Watching.. \n"))
console.log(c.dim(outDir))
console.log("\n")

await context.watch(console.log)
