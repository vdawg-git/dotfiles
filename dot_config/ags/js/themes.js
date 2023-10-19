import { Utils } from "./imports.js"

const WP = `/home/${Utils.USER}/Pictures/Wallpapers/`

const charm = {
  red: "#e67090",
  green: "#43c383",
  yellow: "#d8e77b",
  blue: "#51a4e7",
  magenta: "#9077e7",
  teal: "#51e6e6",
  orange: "#E79E64",
}

const dark = {
  color_scheme: "dark",
  bg_color: "#171717",
  fg_color: "#eee",
  hover_fg: "#f1f1f1",
  ...charm,
}

const misc = {
  wm_gaps: 22,
  radii: 9,
  spacing: 9,
  shadow: "rgba(0, 0, 0, .6)",
  drop_shadow: true,
  transition: 200,
  screen_corners: true,
  bar_style: "normal",
  layout: "topbar",
  desktop_clock: "center center",
}

const colors = {
  wallpaper_fg: "white",
  hypr_active_border: "rgba(3f3f3fFF)",
  hypr_inactive_border: "rgba(3f3f3fDD)",
  accent: "$blue",
  accent_fg: "#141414",
  widget_bg: "$fg_color",
  widget_opacity: 94,
  active_gradient: "to right, $accent, lighten($accent, 6%)",
  border_color: "$fg_color",
  border_opacity: 97,
  border_width: 1,
}

// theme
export default {
  wallpaper: WP + "kitty.jpeg",
  name: "kitty_dark",
  icon: "󰄛",
  ...dark,
  ...misc,
  ...colors,
}
