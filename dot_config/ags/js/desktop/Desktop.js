import Separator from "../misc/Separator.js"
import Clock from "../misc/Clock.js"
import { Widget } from "../imports.js"

const Desktop = () =>
  Widget.EventBox({
    child: Widget.Box({
      vertical: true,
      vexpand: true,
      hexpand: true,
      halign: "CENTER",
      valign: "CENTER",
      style: `margin: 64px;`,
      children: [
        Widget.Box({
          className: "clock-box-shadow",
          children: [
            Widget.CenterBox({
              className: "clock-box",
              children: [
                Clock({
                  className: "clock",
                  halign: "center",
                  format: "%H",
                }),
                Widget.Box({
                  className: "separator-box",
                  vertical: true,
                  hexpand: true,
                  halign: "center",
                  children: [
                    Separator({ valign: "center", vexpand: true }),
                    Separator({ valign: "center", vexpand: true }),
                  ],
                }),
                Clock({
                  className: "clock",
                  halign: "center",
                  format: "%M",
                }),
              ],
            }),
          ],
        }),
        Clock({ format: "%B %e. %A", className: "date" }),
      ],
    }),
  })

export default (monitor) =>
  Widget.Window({
    monitor,
    name: `ags-desktop${monitor}`,
    layer: "background",
    className: "desktop",
    anchor: ["top", "bottom", "left", "right"],
    child: Desktop(),
  })
