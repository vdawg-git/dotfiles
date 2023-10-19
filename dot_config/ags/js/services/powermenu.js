import { App, Service } from "../imports.js"

export default class PowerMenu extends Service {
  static {
    Service.PowerMenu = this
    Service.register(this)
  }

  static instance = new PowerMenu()

  static action(action) {
    const [cmd, title] = {
      sleep: ["systemctl suspend", "Sleep"],
      reboot: ["systemctl reboot", "Reboot"],
      logout: ["pkill Hyprland", "Log Out"],
      shutdown: ["shutdown now", "Shutdown"],
    }[action]

    PowerMenu.cmd = cmd
    PowerMenu.title = title
    PowerMenu.emit("changed")
    App.closeWindow("powermenu")
    App.openWindow("verifgsication")
  }
}
