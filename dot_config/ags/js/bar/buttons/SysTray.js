import { Widget, SystemTray } from "../../imports.js"
import PanelButton from "../PanelButton.js"

const { Gravity } = imports.gi.Gdk

const SysTrayItem = (item) =>
  PanelButton({
    content: Widget.Icon({ binds: [["icon", item, "icon"]] }),
    binds: [["tooltipMarkup", item, "tooltipMarkup"]],
    setup: (btn) => {
      const id = item.menu.connect("popped-up", (menu) => {
        btn.toggleClassName("active")
        menu.connect("notify::visible", (menu) => {
          btn.toggleClassName("active", menu.visible)
        })
        menu.disconnect(id)
      })
    },
    onPrimaryClick: (btn) =>
      item.menu.popup_at_widget(btn, Gravity.SOUTH, Gravity.NORTH, null),
    onSecondaryClick: (btn) =>
      item.menu.popup_at_widget(btn, Gravity.SOUTH, Gravity.NORTH, null),
  })

export default () =>
  Widget.Box({
    className: "systray",
    properties: [
      ["items", new Map()],
      [
        "onAdded",
        (box, id) => {
          const item = SystemTray.getItem(id)
          if (box._items.has(id) || !item) return

          const widget = SysTrayItem(item)
          box._items.set(id, widget)
          box.add(widget)
          box.show_all()
        },
      ],
      [
        "onRemoved",
        (box, id) => {
          if (!box._items.has(id)) return

          box._items.get(id).destroy()
          box._items.delete(id)
        },
      ],
    ],
    connections: [
      [SystemTray, (box, id) => box._onAdded(box, id), "added"],
      [SystemTray, (box, id) => box._onRemoved(box, id), "removed"],
    ],
  })
