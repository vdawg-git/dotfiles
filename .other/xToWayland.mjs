#!/usr/bin/env zx

import "zx/globals"

import { replaceInFile } from "./script-helpers/helper.mjs"

const desktopFiles = [
  "/opt/discord/discord.desktop",
  "/usr/share/applications/tutanota-desktop.desktop",
  "/usr/share/applications/morgen.desktop",
  "/usr/share/applications/Mailspring.desktop",
  "/usr/share/applications/GitKraken.desktop",
]
const flag = "--ozone-platform=wayland"

const execRegex = /^Exec=.*/m

for (const desktopFile of desktopFiles) {
  replaceInFile(desktopFile, [
    [execRegex, (match) => (match.endsWith(flag) ? match : match + " " + flag)],
  ])

  console.log(`Changed ${desktopFile}..`)
}
