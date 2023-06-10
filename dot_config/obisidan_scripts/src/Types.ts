import * as obsidian from "obsidian"

export type QuickAddArgument = {
	/** Will be passed to each macro, thus can be used to pass data from script to script and can be read out in a template too. */
	variables: Record<string, unknown>

	readonly obsidian: typeof obsidian
	readonly app: Record<string, any>
	readonly quickAddApi: {
		inputPrompt(
			header: string,
			placeholder?: string,
			value?: string
		): Promise<string>
		wideInputPrompt(
			header: string,
			placeholder?: string,
			value?: string | number
		): Promise<string>
		yesNoPrompt(header: string, text?: string): Promise<boolean>
		infoDialog(header: string, text: readonly string[] | string): Promise<void>
		suggester<T>(
			displayItems:
				| string[]
				| ((value: T, index?: number, arr?: T[]) => string),
			actualItems: T[]
		): Promise<T>
		checkboxPrompt(
			items: readonly string[],
			selectedItems: readonly string[]
		): Promise<string[]>
		executeChoice(
			choiceName: string,
			variables?: { [key: string]: any }
		): Promise<void>

		utility: {
			getClipboard(): Promise<string>
			setClipboard(text: string): Promise<void>
		}

		date: {
			now(format?: string, offset?: number): string
			tomorrow(format?: string): string
			yesterday(format?: string): string
		}
	}
}
