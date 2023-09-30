import icons from "../../icons.js"
import { SimpleToggleButton } from "../ToggleButton.js"
const { Notifications } = ags.Service
const { Icon, Label } = ags.Widget

export default () =>
  SimpleToggleButton({
    icon: Icon({
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
    label: Label({
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
