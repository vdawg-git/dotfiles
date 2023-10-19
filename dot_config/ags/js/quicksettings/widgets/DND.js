import icons from "../../icons.js"
import { Widget } from "../../imports.js"
import Notifications from "../../services/notifications.js"
import { SimpleToggleButton } from "../ToggleButton.js"

export default () =>
  SimpleToggleButton({
    icon: Widget.Icon({
      connections: [
        [
          Notifications,
          (icon) => {
            icon.icon = Notifications.dnd
              ? icons.notifications.silent
              : icons.notifications.noisy
          },
        ],
      ],
    }),
    label: Widget.Label({
      label: "",
      connections: [
        [
          Notifications,
          (label) => (label.label = Notifications.dnd ? "Silence" : "Noisy"),
        ],
      ],
    }),
    toggle: () => (Notifications.dnd = !Notifications.dnd),
    connection: [Notifications, () => Notifications.dnd],
  })
