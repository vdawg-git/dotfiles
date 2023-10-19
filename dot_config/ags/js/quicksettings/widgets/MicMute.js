import icons from "../../icons.js"
import { Widget, Audio, Hyprland } from "../../imports.js"
import { SimpleToggleButton } from "../ToggleButton.js"

export default () =>
  SimpleToggleButton({
    icon: Widget.Icon({
      connections: [
        [
          Audio,
          (icon) => {
            icon.icon = Audio.microphone?.isMuted
              ? icons.audio.mic.muted
              : icons.audio.mic.unmuted
          },
          "microphone-changed",
        ],
      ],
    }),
    label: Widget.Label({
      className: "simple-toggle-button_label",
      label: "test",
      connections: [
        [
          Audio,
          (label) => {
            label.label = Audio.microphone?.isMuted ? "Unmute" : "Mute"
          },
          "microphone-changed",
        ],
      ],
    }),
    toggle: "pactl set-source-mute @DEFAULT_SOURCE@ toggle",
    connection: [Audio, () => Audio.microphone?.isMuted],
  })
