#!/usr/bin/env zx

import "zx/globals"

import { dirname } from "path"
import { fileURLToPath } from "url"
import { replaceInFile } from "./script-helpers/helper.mjs"

process.env.FORCE_COLOR = "1"

const __dirname = dirname(fileURLToPath(import.meta.url))
// const gtkThemeFolder = path.join(__dirname, "gtk-theme/")
// const gtkIconsFolder = path.join(__dirname, "gtk-icons/")
const gtkThemeFolder = "/tmp/__gtk-theme/"
const gtkIconsFolder = "/tmp/__gtk-icons/"

await $`pnpm dlx degit Visual-Dawg/Colloid-gtk-theme ${gtkThemeFolder} --force  --verbose`
await $`pnpm dlx degit Visual-Dawg/Colloid-gtk-theme ${gtkIconsFolder} --force  --verbose`

await $`cd ${gtkThemeFolder} && ./install.sh --theme orange --libadwaita -l --tweaks gruvbox black rimless float --color dark`
await $`cd ${gtkIconsFolder} && ./install.sh --theme orange`

await $`rm -r ${gtkIconsFolder} ${gtkThemeFolder}`

await $`stylepak install-system`
await $`stylepak install-user`

// Gruvbox Material Colors
// prettier-ignore
// const colors = [
//   "#fb4934", "#cc241d",
//   "#d3869b", "#b16286",
//   "#d386cd", "#ab62b1",
//   "#83a598", "#458588",
//   "#8ec07c", "#689d6a",
//   "#b8bb26", "#98971a",
//   "#fabd2f", "#d79921",
//   "#fe8019", "#d65d0e",
//   "#f9f5d7", "#fbf1c7", "#ebdbb2", "#d5c4a1", "#ccbeb8", "#bdae93", "#a89984", "#928374", "#868686", "#7c6f64", "#665c54", "#504945", "#3c3836", "#282524", "#242220", "#211f1e", "#121110", "#0f0e0e", "#0d0907",
//   // White
//   "#fbf1c7",
//   // Black
//   "#1d2021",
// ]
