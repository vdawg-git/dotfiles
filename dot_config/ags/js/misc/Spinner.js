import Gtk from "gi://Gtk"

export default (props) =>
  Widget.Widget({
    ...props,
    type: Gtk.Spinner,
    active: true,
  })
