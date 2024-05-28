#!/usr/bin/env zx

import "zx/globals"

import { dirname } from "path"
import { fileURLToPath } from "url"
import { replaceInFile } from "./script-helpers/helper.mjs"

process.env.FORCE_COLOR = "1"

const __dirname = dirname(fileURLToPath(import.meta.url))
const gtkThemeFolder = path.join(__dirname, "gtk-theme/")
const gtkIconsFolder = path.join(__dirname, "gtk-icons/")
const assetsFolder = path.join(__dirname, "assets/")

await $`pnpm dlx degit Visual-Dawg/Colloid-gtk-theme ${gtkThemeFolder} --force  --verbose`
await $`pnpm dlx degit Visual-Dawg/Colloid-gtk-theme ${gtkIconsFolder} --force  --verbose`

const colorsFilePath = path.join(gtkThemeFolder, "src", "sass", "_colors.scss")

/* replaceInFile(colorsFilePath, [

 ,
])

[
    `@function background($type) {
  @if ($type == 'a') { @return $white; }
  @if ($type == 'b') { @return $grey-050; }
  @if ($type == 'c') { @return $grey-100; }
  @if ($type == 'd') { @return $grey-250; }

  @if ($blackness == 'true') {
    @if ($type == 'e') { @return $black; }
    @if ($type == 'f') { @return $grey-950; }
    @if ($type == 'g') { @return $grey-900; }
    @if ($type == 'h') { @return $grey-850; }
  } @else {
    @if ($type == 'e') { @return $grey-800; }
    @if ($type == 'f') { @return $grey-750; }
    @if ($type == 'g') { @return $grey-700; }
    @if ($type == 'h') { @return $grey-650; }
  }
}
`,
    `@function background($type) {
  @if ($type == 'a') { @return transparentize( $white, 1 ); }
  @if ($type == 'b') { @return transparentize($grey-050, 0.9); }
  @if ($type == 'c') { @return transparentize($grey-100, 0.9); }
  @if ($type == 'd') { @return transparentize($grey-250, 0.9); }

  @if ($blackness == 'true') {
    @if ($type == 'e') { @return transparentize( $black, 1 ); }
    @if ($type == 'f') { @return transparentize($grey-950, 0.9); }
    @if ($type == 'g') { @return transparentize($grey-900, 0.9); }
    @if ($type == 'h') { @return transparentize($grey-850, 0.9); }
  } @else {
    @if ($type == 'e') { @return transparentize($grey-800, 1.0); }
    @if ($type == 'f') { @return transparentize($grey-750, 0.9); }
    @if ($type == 'g') { @return transparentize($grey-700, 0.9); }
    @if ($type == 'h') { @return transparentize($grey-650, 0.9); }
  }
}
`,
  ] */

// const transparentize = {
//   0.0: ["window_bg_color", "headerbar_bg_color", "headerbar_backdrop_color"],
//   0.4: ["view_bg_color"],
//   0.6: ["card_bg_color"],
//   // 0.5: ["popover_bg_color"],
// }

await $`cd ${gtkThemeFolder} && ./install.sh --theme orange --libadwaita --tweaks gruvbox black rimless float --color dark`
await $`cd ${gtkIconsFolder} && ./install.sh --theme orange`

await $`tar --exclude-vcs-ignores --exclude-vcs -czf  ${path.join(
  assetsFolder,
  "gtk-theme.tar.gz"
)} ${gtkThemeFolder}`
await $`tar --exclude-vcs-ignores --exclude-vcs -czf  ${path.join(
  assetsFolder,
  "gtk-icons.tar.gz"
)} ${gtkIconsFolder}`
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
