import icons from "../../icons.js"
import { Widget } from "../../imports.js"
import PanelButton from "../PanelButton.js"

export default () =>
  PanelButton({
    className: "powermenu",
    content: Widget.Icon(icons.powermenu.shutdown),
    onClicked: () => App.openWindow("powermenu"),
  })
