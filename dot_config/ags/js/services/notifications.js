import { Service, Utils } from "../imports.js"

const { exec, execAsync } = Utils

class NotificationsService extends Service {
  static {
    Service.register(this, {
      notified: ["float"],
    })
  }

  _count = 0
  _dnd = false

  get notifications() {
    return this._count
  }

  get dnd() {
    return this._dnd
  }

  // set kbd(value) {
  //   if (value < 0 || value > this._kbdMax) return

  //   execAsync(`brightnessctl -d ${KBD} s ${value} -q`)
  //     .then(() => {
  //       this._kbd = value
  //       this.emit("changed")
  //     })
  //     .catch(print)
  // }

  // set screen(percent) {
  //   if (percent < 0) percent = 0

  //   if (percent > 1) percent = 1

  //   execAsync(`brightnessctl s ${percent * 100}% -q`)
  //     .then(() => {
  //       this._screen = percent
  //       this.emit("changed")
  //     })
  //     .catch(print)
  // }

  constructor() {
    super()
    this._count = Number(exec(`swaync-client -c`))
    this._dnd = Boolean(exec(`swaync-client -D`))
  }
}

export default class Notifications {
  static {
    Service.notifications = this
  }
  static instance = new NotificationsService()

  static get count() {
    return Notifications.count
  }

  static get dnd() {
    return Notifications.dnd
  }

  // static get screen() {
  //   return Notifications.screen
  // }
  // static set kbd(value) {
  //   Notifications.kbd = value
  // }
  // static set screen(value) {
  //   Notifications.screen = value
  // }
}
