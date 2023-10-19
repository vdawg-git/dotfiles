print("Yoooo")

import TopBar from "./js/bar/TopBar.js"
import ScreenCorners from "./js/screencorner/ScreenCorners.js"
import QuickSettings from "./js/quicksettings/QuickSettings.js"
import OSD from "./js/osd/OSD.js"
import FloatingDock from "./js/dock/FloatingDock.js"
import PowerMenu from "./js/powermenu/PowerMenu.js"
import Verification from "./js/powermenu/Verification.js"
import Desktop from "./js/desktop/Desktop.js"
import { setupCss, warnOnLowBattery, forMonitors } from "./js/utils.js"
import theme from "./js/themes.js"
import options from "./js/options.js"
import setupLayerRules from "./js/services/theme/hyprland.js"

print("Hiiiiiii")

warnOnLowBattery()
await setupCss()
setupLayerRules(theme)

export default {
  maxStreamVolume: 1.05,
  closeWindowDelay: {},
  windows: [
    forMonitors(TopBar),
    forMonitors(ScreenCorners),
    forMonitors(OSD),
    forMonitors(FloatingDock),
    forMonitors(Desktop),
    QuickSettings(),
    PowerMenu(),
    Verification(),
  ].flat(2),
}
