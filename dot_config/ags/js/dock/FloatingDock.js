import { Widget, Utils } from "../imports.js"
import Dock from "./Dock.js"
const { timeout } = Utils

export default (monitor) =>
  Widget.Window({
    monitor,
    name: `ags-dock${monitor}`,
    className: "floating-dock",
    anchor: ["bottom"],
    child: Widget.EventBox({
      valign: "start",
      onHover: (box) => {
        timeout(300, () => (box._revealed = true))
        box.child.children[0].revealChild = true
      },
      onHoverLost: (box) => {
        if (!box._revealed) return

        timeout(300, () => (box._revealed = false))
        box.child.children[0].revealChild = false
      },
      child: Widget.Box({
        vertical: true,
        style: "padding: 1px;",
        children: [
          Widget.Revealer({
            transition: "slide_up",
            child: Dock(),
          }),
          Widget.Box({
            className: "padding",
            style: "padding: 2px;",
          }),
        ],
      }),
    }),
  })
