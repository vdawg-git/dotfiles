import { Widget, App } from "../imports.js"
import PopupWindow from "../misc/PopupWindow.js"
import PowerMenu from "../services/powermenu.js"

export default () =>
  PopupWindow({
    name: "verification",
    expand: true,
    content: Widget.Box({
      className: "verification",
      vertical: true,
      children: [
        Widget.Label({
          className: "title",
          connections: [
            [
              PowerMenu,
              (label) => {
                label.label = PowerMenu.title || ""
              },
            ],
          ],
        }),
        Widget.Label({
          className: "desc",
          label: "Are you sure?",
        }),
        Widget.Box({
          className: "buttons",
          vexpand: true,
          valign: "end",
          homogeneous: true,
          children: [
            Widget.Button({
              child: Widget.Label("No"),
              onClicked: () => App.toggleWindow("verification"),
            }),
            Widget.Button({
              child: Widget.Label("Yes"),
              onClicked: () => Utils.exec(PowerMenu.cmd),
            }),
          ],
        }),
      ],
    }),
  })
