import DistroIconPanelButton from "./buttons/DistroIconPanelButton.js"
import Workspaces from "./buttons/Workspaces.js"
import FocusedClient from "./buttons/FocusedClient.js"
import MediaIndicator from "./buttons/MediaIndicator.js"
import DateButton from "./buttons/DateButton.js"
import NotificationIndicator from "./buttons/NotificationIndicator.js"
import SysTray from "./buttons/SysTray.js"
import SystemIndicators from "./buttons/SystemIndicators.js"
import PowerMenu from "./buttons/PowerMenu.js"
import BatteryBar from "./buttons/BatteryBar.js"
import SubMenu from "./buttons/SubMenu.js"
import {
  SystemTray,
  Widget,
  Variable,
  Mpris,
  Battery,
  Notifications,
} from "../imports.js"
import Separator from "../misc/Separator.js"

const submenuItems = Variable(1)
SystemTray.connect("changed", () => {
  submenuItems.setValue(SystemTray.items.length + 1)
})

const SeparatorDot = (service, condition) =>
  Separator({
    orientation: "vertical",
    valign: "center",
    connections: service && [
      [
        service,
        (dot) => {
          dot.visible = condition(service)
        },
      ],
    ],
  })

const Start = () =>
  Widget.Widget.Box({
    className: "start",
    children: [
      DistroIconPanelButton(),
      SeparatorDot(),
      Workspaces(),
      SeparatorDot(),
      FocusedClient(),
      Widget.Widget.Box({ hexpand: true }),
      NotificationIndicator(),
      SeparatorDot(
        Notifications,
        (service) => service.notifications.length > 0 || service.dnd
      ),
    ],
  })

const Center = () =>
  Widget.Widget.Box({
    className: "center",
    children: [DateButton()],
  })

const End = () =>
  Widget.Widget.Box({
    className: "end",
    children: [
      SeparatorDot(Mpris, (m) => m.players.length > 0),
      MediaIndicator(),
      Widget.Box({ hexpand: true }),

      SubMenu({
        items: submenuItems,
        children: [SysTray()],
      }),
      SeparatorDot(),
      SystemIndicators(),
      SeparatorDot(Battery, (b) => b.available),
      BatteryBar(),
      SeparatorDot(),
      PowerMenu(),
    ],
  })

export default (monitor) =>
  Widget.Window({
    name: `ags-bar${monitor}`,
    exclusive: true,
    monitor,
    anchor: ["top", "left", "right"],
    child: Widget.CenterBox({
      className: "panel",
      startWidget: Start(),
      centerWidget: Center(),
      endWidget: End(),
    }),
  })
