import { readFileSync, writeFileSync } from "fs"

const hexRegex = /#[\da-zA-Z]*(?=;)/
const rgbaRegex = /rgba\([\d,\.\ ]*\)*(?=;)/
const rgbRegex = /rgb\([\d,\ ]*\)*(?=;)/

/**
 * Match and replace contents of a file.
 *
 * @param {string} filePath Absolute path to the file
 * @param {readonly ( [string, string] | (file: string) => [ string, string ] )[]} replacements Multiple tuples of `toReplace` and `replacement`, or a function which gets the filecontent and returns [toReplace, replacement]
 */
export function replaceInFile(filePath, replacements) {
  const file = readFileSync(filePath, {
    encoding: "utf8",
  })

  const replaced = replacements.reduce(
    (text, replacer) =>
      Array.isArray(replacer)
        ? text.replace(replacer.at(0), replacer.at(1))
        : text.replace(replacer(text)),
    file
  )

  writeFileSync(filePath, replaced)
}

function changeCssColor() {}
function getCssColorDefinition() {}

const transparentize = [
  [0, ["window_bg_color", "headerbar_bg_color", "headerbar_backdrop_color"]],
  [0.4, ["view_bg_color"]],
  [0.6, ["card_bg_color"]],
  // 0.5: ["popover_bg_color"],
]

transparentize.map(([opacity, colorNames]) => {
  const color = pipe(colorNames, A.map(getCssColorDefinition))
}) //?

file
