import TopBar from "./js/bar/TopBar.js"
import ScreenCorners from "./js/screencorner/ScreenCorners.js"
import Overview from "./js/overview/Overview.js"
import QuickSettings from "./js/quicksettings/QuickSettings.js"
import Dashboard from "./js/dashboard/Dashboard.js"
import OSD from "./js/osd/OSD.js"
import FloatingDock from "./js/dock/FloatingDock.js"
import PowerMenu from "./js/powermenu/PowerMenu.js"
import Verification from "./js/powermenu/Verification.js"
import Desktop from "./js/desktop/Desktop.js"
import Notifications from "./js/notifications/Notifications.js"
import { setupCss, warnOnLowBattery } from "./js/utils.js"
import options from "./js/options.js"
const ws = ags.Service.Hyprland.HyprctlGet("monitors")
const forMonitors = (widget) => ws.map((mon) => widget(mon.id))

warnOnLowBattery()
await setupCss()

export default {
	maxStreamVolume: 1.05,
	cacheNotificationActions: true,
	closeWindowDelay: {
		dashboard: options.windowAnimationDuration,
	},
	windows: [
		forMonitors(TopBar),
		forMonitors(ScreenCorners),
		forMonitors(OSD),
		forMonitors(FloatingDock),
		forMonitors(Desktop),
		forMonitors(Notifications),
		Overview(),
		Dashboard(),
		QuickSettings(),
		PowerMenu(),
		Verification(),
	].flat(2),
}
