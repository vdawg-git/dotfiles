import icons from "../../icons.js"
import { Widget, Battery } from "../../imports.js"
import PowerMenu from "../../services/powermenu.js"
import { uptime } from "../../variables.js"

const Avatar = () =>
  Widget.Box({
    className: "avatar",
    halign: "start",
    hexpand: false,
    children: [
      Widget.Box({
        className: "shader",
        vexpand: true,
        hexpand: true,
      }),
    ],
  })

export const BatteryProgress = () =>
  Widget.Box({
    className: "battery-progress",
    vexpand: true,
    connections: [
      [
        Battery,
        (w) => {
          w.toggleClassName("half", Battery.percent < 46)
          w.toggleClassName("low", Battery.percent < 30)
        },
      ],
    ],
    children: [
      Widget.Overlay({
        vexpand: true,
        child: Widget.ProgressBar({
          hexpand: true,
          vexpand: true,
          connections: [
            [
              Battery,
              (progress) => {
                progress.fraction = Battery.percent / 100
              },
            ],
          ],
        }),
        overlays: [
          Widget.Label({
            connections: [
              [
                Battery,
                (l) => {
                  l.label =
                    Battery.charging || Battery.charged
                      ? icons.battery.charging
                      : `${Battery.percent}%`
                },
              ],
            ],
          }),
        ],
      }),
    ],
  })

export default () =>
  Widget.Box({
    className: "header",
    children: [
      Avatar(),
      Widget.Box({
        className: "system-box",
        vertical: true,
        hexpand: true,
        children: [
          Widget.Box({
            children: [
              Widget.Label({
                className: "uptime",
                hexpand: true,
                valign: "center",
                connections: [
                  [
                    uptime,
                    (label) => {
                      label.label = `uptime: ${uptime.value}`
                    },
                  ],
                ],
              }),
              Widget.Button({
                valign: "center",
                onClicked: () => PowerMenu.action("logout"),
                child: Widget.Icon(icons.powermenu.logout),
              }),
              Widget.Button({
                valign: "center",
                onClicked: () => PowerMenu.action("shutdown"),
                child: Widget.Icon(icons.powermenu.shutdown),
              }),
            ],
          }),
          BatteryProgress(),
        ],
      }),
    ],
  })
