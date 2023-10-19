import PanelButton from "../PanelButton.js"
import FontIcon from "../../misc/FontIcon.js"
import { distroIcon } from "../../variables.js"

export default () =>
  PanelButton({
    content: FontIcon(distroIcon),
  })
