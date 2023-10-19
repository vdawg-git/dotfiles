import { Widget, Utils } from "../../imports.js"
import Notifications from "../../services/notifications.js"

export default () =>
  Widget.Button({
    onClicked: "swaync-client -t",
    child: Widget.Icon({
      icon: "notifications-disabled-symbolic",
      className: "notifications panel-button",
      // eventboxConnections: [
      //   [
      //     Notifications,
      //     (box) => {
      //       box.visible = Notifications.notifications > 0 || Notifications.dnd
      //     },
      //   ],
      //   ["button-press-event"],
      // ],
      connections: [
        [
          Notifications,
          (icon) => {
            icon.icon = Notifications.dnd
              ? "notifications-disabled-symbolic"
              : "preferences-system-notifications-symbolic"
          },
        ],
      ],
    }),
  })
