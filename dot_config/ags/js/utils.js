import Cairo from "cairo"
import options from "./options.js"
import icons from "./icons.js"

export function createSurfaceFromWidget(widget) {
	const alloc = widget.get_allocation()
	const surface = new Cairo.ImageSurface(
		Cairo.Format.ARGB32,
		alloc.width,
		alloc.height
	)
	const cr = new Cairo.Context(surface)
	cr.setSourceRGBA(255, 255, 255, 0)
	cr.rectangle(0, 0, alloc.width, alloc.height)
	cr.fill()
	widget.draw(cr)

	return surface
}

export function warnOnLowBattery() {
	const { Battery } = ags.Service
	Battery.instance.connect("changed", () => {
		const { low } = options.battaryBar
		if (Battery.percentage < low || Battery.percentage < low / 2) {
			ags.Utils.execAsync([
				"notify-send",
				`${Battery.percentage}% Battery Percentage`,
				"-i",
				icons.battery.warning,
				"-u",
				"critical",
			])
		}
	})
}

export function getAudioTypeIcon(icon) {
	const substitues = [
		["audio-headset-bluetooth", icons.audio.type.headset],
		["audio-card-analog-usb", icons.audio.type.speaker],
		["audio-card-analog-pci", icons.audio.type.card],
	]

	for (const [from, to] of substitues) {
		if (from === icon) return to
	}

	return icon
}

const scss = ags.App.configDir + "/scss/main.scss"
const css = ags.App.configDir + "/scss/generated_style.css"

export async function setupCss() {
	await getGtkCssVariables().then(writeScss("gtk"))

	applyCss()

	scssWatcher()
}

function applyCss() {
	ags.Utils.exec(`npx sass ${scss}  ${css} --no-source-map --no-charset`)

	ags.App.resetCss()
	ags.App.applyCss(css)
}

function scssWatcher() {
	ags.Utils.subprocess(
		[
			"inotifywait",
			"--recursive",
			"--event",
			"create,modify",
			"-m",
			ags.App.configDir + "/scss",
		],
		applyCss
	)
}

/**
 * @param {string} name
 * @returns { (css: string) => void }
 */
function writeScss(name) {
	const directory = `/tmp/ags/scss/`
	const filename = `${name}.scss`
	ags.Utils.ensureDirectory(directory)
	return (css) => ags.Utils.writeFile(css, directory + filename)
}

async function getGtkCssVariables() {
	const configFolder = ags.Utils.exec(`bash -c "echo $HOME/.config/gtk-4.0/"`)
	const configs = [`${configFolder}/colors.css`, `${configFolder}/gtk-dark.css`]

	return Promise.all(configs.map(ags.Utils.readFileAsync)).then((contents) =>
		contents
			.join("\n") // Join the array into a single string
			.split("\n") // And split the string into lines
			.map((line) => line.trim())
			.filter((line) => line.match(/^\@define-color /))
			.map((line) => line.replace("@define-color ", "$").replace(/ /, ": "))
			.join("\n")
	)
}
