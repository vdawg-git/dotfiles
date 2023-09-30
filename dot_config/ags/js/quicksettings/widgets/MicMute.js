import icons from "../../icons.js"
import { SimpleToggleButton } from "../ToggleButton.js"
const { Audio, Hyprland } = ags.Service
const { Icon, Label } = ags.Widget

export default () =>
  SimpleToggleButton({
    icon: Icon({
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
    label: Label({
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
