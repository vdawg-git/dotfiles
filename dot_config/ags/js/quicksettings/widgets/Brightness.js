import icons from "../../icons.js"
import { Widget } from "../../imports.js"
import Brightness from "../../services/brightness.js"

const BrightnessSlider = () =>
  Widget.Slider({
    drawValue: false,
    hexpand: true,
    connections: [
      [
        Brightness,
        (slider) => {
          slider.value = Brightness.screen
        },
      ],
    ],
    onChange: ({ value }) => (Brightness.screen = value),
  })

export default () =>
  Widget.Box({
    className: "slider",
    children: [
      Widget.Icon({
        icon: icons.brightness.indicator,
        className: "icon",
        connections: [
          [
            Brightness,
            (icon) => {
              icon.tooltipText = `Screen Brightness ${Math.floor(
                Brightness.screen * 100
              )}%`
            },
          ],
        ],
      }),
      BrightnessSlider(),
    ],
  })
