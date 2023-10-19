import { Service, Utils } from "../imports.js"

const { exec, execAsync } = Utils

// Change this to whatever keyboard you have
// you can check with brightnessctl --list
const KBD = "phy0-led"

class BrightnessService extends Service {
  static {
    Service.register(this)
  }

  _kbd = 0
  _screen = 0

  get kbd() {
    return this._kbd
  }
  get screen() {
    return this._screen
  }

  set kbd(value) {
    if (value < 0 || value > this._kbdMax) return

    execAsync(`brightnessctl -d ${KBD} s ${value} -q`)
      .then(() => {
        this._kbd = value
        this.emit("changed")
      })
      .catch(print)
  }

  set screen(percent) {
    if (percent < 0) percent = 0

    if (percent > 1) percent = 1

    execAsync(`brightnessctl s ${percent * 100}% -q`)
      .then(() => {
        this._screen = percent
        this.emit("changed")
      })
      .catch(print)
  }

  constructor() {
    super()
    this._kbd = Number(exec(`brightnessctl -d ${KBD} g`))
    this._kbdMax = Number(exec(`brightnessctl -d ${KBD} m`))
    this._screen =
      Number(exec("brightnessctl g")) / Number(exec("brightnessctl m"))
  }
}

export default class Brightness {
  static {
    Service.Brightness = this
  }
  static instance = new BrightnessService()

  static get kbd() {
    return Brightness.kbd
  }
  static get screen() {
    return Brightness.screen
  }
  static set kbd(value) {
    Brightness.kbd = value
  }
  static set screen(value) {
    Brightness.screen = value
  }
}
