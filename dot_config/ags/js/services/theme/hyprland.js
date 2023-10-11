const { App } = ags
const { Hyprland } = ags.Service
const { execAsync } = ags.Utils

export default function ({ wm_gaps }) {
  try {
    App.instance.connect("config-parsed", () => {
      const windows = [...App.windows, "quicksettings", "dashboard"].filter(
        (name) =>
          !name.includes("desktop") &&
          !name.includes("corner") &&
          !name.includes("dock")
      )
      for (const name of windows) {
        execAsync(["hyprctl", "keyword", "layerrule", `unset, ${name}`]).then(
          () => {
            execAsync(["hyprctl", "keyword", "layerrule", `blur, ${name}`])
            execAsync([
              "hyprctl",
              "keyword",
              "layerrule",
              `ignorealpha 0.5, ${name}`,
            ])
          }
        )
      }
    })

    // Add room for the bar to each monitor
    Hyprland.HyprctlGet("monitors").forEach(({ name }) => {
      execAsync(`hyprctl keyword monitor ${name},addreserved,-${wm_gaps},0,0,0`)
    })
  } catch (error) {
    logError(error)
  }
}
