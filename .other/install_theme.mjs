#!/usr/bin/env zx

import degit from "degit"
import "zx/globals"

import { dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const gtkThemeFolder = path.join(__dirname, "gtk-theme")

// Gruvbox Material Colors
// prettier-ignore
const colors = [
  "#fb4934", "#cc241d",
  "#d3869b", "#b16286",
  "#d386cd", "#ab62b1",
  "#83a598", "#458588",
  "#8ec07c", "#689d6a",
  "#b8bb26", "#98971a",
  "#fabd2f", "#d79921",
  "#fe8019", "#d65d0e",
  "#f9f5d7", "#fbf1c7", "#ebdbb2", "#d5c4a1", "#ccbeb8", "#bdae93", "#a89984", "#928374", "#868686", "#7c6f64", "#665c54", "#504945", "#3c3836", "#282524", "#242220", "#211f1e", "#121110", "#0f0e0e", "#0d0907",
  // White
  "#fbf1c7",
  // Black
  "#1d2021",
]

$`mkdir -p ${gtkThemeFolder}`

await degit("vinceliuice/Colloid-gtk-theme", {
  cache: true,
  force: true,
  verbose: true,
}).clone(gtkThemeFolder)

$`cd ${gtkThemeFolder} && ./install.sh --theme orange --libadwaita --tweaks gruvbox rimless float --name colloid`
