import { App, Utils } from "../../imports.js"

const { execAsync } = Utils

export default function ({ wm_gaps }) {
  try {
    App.connect("config-parsed", () => {
      const windows = [...App.windows].filter((name) => name.includes("ags-"))
      for (const [name, _] of windows) {
        print(JSON.stringify({ name }))
        execAsync(["hyprctl", "keyword", "layerrule", `unset, ${name}`]).then(
          () => {
            execAsync(["hyprctl", "keyword", "layerrule", `"blur, ${name}"`])
            execAsync([
              "hyprctl",
              "keyword",
              "layerrule",
              `"ignorealpha 0.5, ${name}"`,
            ])
          }
        )
      }
    })

    // Add room for the bar to each monitor
    // Hyprland.HyprctlGet("monitors").forEach(({ name }) => {
    //   execAsync(`hyprctl keyword monitor ${name},addreserved,-${wm_gaps},0,0,0`)
    // })
  } catch (error) {
    logError(error)
  }
}
