import Cairo from "cairo"
import options from "./options.js"
import icons from "./icons.js"
import { Utils, App, Battery } from "./imports.js"

export function forMonitors(widget) {
  const monitors = JSON.parse(Utils.exec("hyprctl -j monitors"))
  return monitors.map((monitor) => widget(monitor.id))
}

export function createSurfaceFromWidget(widget) {
  const alloc = widget.get_allocation()
  const surface = new Cairo.ImageSurface(
    Cairo.Format.ARGB32,
    alloc.width,
    alloc.height
  )
  const cr = new Cairo.Context(surface)
  cr.setSourceRGBA(255, 255, 255, 0)
  cr.rectangle(0, 0, alloc.width, alloc.height)
  cr.fill()
  widget.draw(cr)

  return surface
}

export function warnOnLowBattery() {
  Battery.connect("changed", () => {
    const { low } = options.battaryBar
    if (Battery.percentage < low || Battery.percentage < low / 2) {
      Utils.execAsync([
        "notify-send",
        `${Battery.percentage}% Battery Percentage`,
        "-i",
        icons.battery.warning,
        "-u",
        "critical",
      ])
    }
  })
}

export function getAudioTypeIcon(icon) {
  const substitues = [
    ["audio-headset-bluetooth", icons.audio.type.headset],
    ["audio-card-analog-usb", icons.audio.type.speaker],
    ["audio-card-analog-pci", icons.audio.type.card],
  ]

  for (const [from, to] of substitues) {
    if (from === icon) return to
  }

  return icon
}

const scss = App.configDir + "/scss/main.scss"
const css = App.configDir + "/scss/style.css"

export async function setupCss() {
  await getGtkCssVariables().then(writeScss("gtk"))

  applyCss()

  scssWatcher()
}

function applyCss() {
  Utils.exec(`npx sass ${scss}  ${css} --no-source-map --no-charset`)

  App.resetCss()
  App.applyCss(css)
}

function scssWatcher() {
  Utils.subprocess(
    [
      "inotifywait",
      "--recursive",
      "--event",
      "create,modify",
      "-m",
      App.configDir + "/scss",
    ],
    applyCss
  )
}

/**
 * @param {string} name
 * @returns { (css: string) => void }
 */
function writeScss(name) {
  const directory = `/tmp/ags/scss/`
  const filename = `${name}.scss`
  Utils.ensureDirectory(directory)
  return (css) => Utils.writeFile(css, directory + filename)
}

async function getGtkCssVariables() {
  const configFolder = Utils.exec(`bash -c "echo $HOME/.config/gtk-4.0/"`)
  const configs = [`${configFolder}/colors.css`, `${configFolder}/gtk-dark.css`]

  const variableAtSignRegex = /(@)(?=\w*;$)/

  return Promise.all(configs.map(Utils.readFileAsync)).then((contents) =>
    contents
      .join("\n") // Join the array into a single string
      .split("\n") // And split the string into lines
      .map((line) => line.trim())
      .filter((line) => line.match(/^\@define-color /))
      .map((line) =>
        line
          .replace("@define-color ", "$")
          .replace(" ", ": ")
          .replace(variableAtSignRegex, "$")
          .replace("_breeze", "")
      )
      .join("\n")
  )
}
