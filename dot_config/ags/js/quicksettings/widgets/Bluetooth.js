import icons from "../../icons.js"
import { Widget, Bluetooth } from "../../imports.js"
import Spinner from "../../misc/Spinner.js"
import { Menu, ArrowToggleButton } from "../ToggleButton.js"

export const BluetoothToggle = () =>
  ArrowToggleButton({
    name: "ags-bluetooth",
    icon: Widget.Icon({
      connections: [
        [
          Bluetooth,
          (icon) => {
            icon.icon = Bluetooth.enabled
              ? icons.bluetooth.enabled
              : icons.bluetooth.disabled
          },
        ],
      ],
    }),
    label: Widget.Label({
      truncate: "end",
      connections: [
        [
          Bluetooth,
          (label) => {
            if (!Bluetooth.enabled) return (label.label = "Disabled")

            if (Bluetooth.connectedDevices.length === 0)
              return (label.label = "Not Connected")

            if (Bluetooth.connectedDevices.length === 1)
              return (label.label = Bluetooth.connectedDevices[0].alias)

            label.label = `${Bluetooth.connectedDevices.length} Connected`
          },
        ],
      ],
    }),
    connection: [Bluetooth, () => Bluetooth.enabled],
    deactivate: () => (Bluetooth.enabled = false),
    activate: () => (Bluetooth.enabled = true),
  })

export const BluetoothDevices = () =>
  Menu({
    name: "ags-bluetooth",
    icon: Widget.Icon(icons.bluetooth.disabled),
    title: Widget.Label("Bluetooth"),
    content: Widget.Box({
      hexpand: true,
      vertical: true,
      connections: [
        [
          Bluetooth,
          (box) => {
            box.children = Bluetooth.devices.map((device) =>
              Widget.Box({
                children: [
                  Widget.Icon(device.iconName + "-symbolic"),
                  Widget.Label(device.name),
                  device.batteryPercentage > 0 &&
                    Widget.Label(`${device.batteryPercentage}%`),
                  Widget.Box({ hexpand: true }),
                  device.connecting
                    ? Spinner()
                    : Widget.Widget({
                        type: imports.gi.Gtk.Switch,
                        active: device.connected,
                        connections: [
                          [
                            "notify::active",
                            ({ active }) => {
                              device.setConnection(active)
                            },
                          ],
                        ],
                      }),
                ],
              })
            )
          },
        ],
      ],
    }),
  })
