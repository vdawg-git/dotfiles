import Clock from "../../misc/Clock.js"

export default ({ format = "%H:%M - %A %e." } = {}) =>
  Clock({
    format,
    className: "dashboard panel-button",
  })
