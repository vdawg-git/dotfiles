import type * as IObsidian from "obsidian"
import { P, match } from "ts-pattern"
import { QuickAddArgument } from "src/Types"

export function replaceIllegalFileNameCharacters(string: string) {
  return string.replace(/[\\,#%&\{\}\/*<>?$\'\":@]*/g, "")
}

/**
 * @param url Image URL
 * @param filename filename **without** extension
 * @returns Saved image file path
 */
export async function saveImage({
  url,
  fileName,
  api,
  folder,
}: {
  url: string
  fileName: string
  api: typeof IObsidian
  folder: string
}): Promise<string> {
  const base = "Meta/Attachments/"
  const basePath = api.normalizePath(base + folder + "/")

  const extension = getImageExtensionFromURL(url)

  console.log({ url, fileName, folder, extension })

  const path = api.normalizePath(
    base + folder + "/" + fileName + "." + extension
  )

  if (!(await app.vault.adapter.exists(basePath, false))) {
    await app.vault.adapter.mkdir(basePath)
  }

  if (await app.vault.adapter.exists(path, false)) {
    new Notification(`Image "${path}" does already exist. Ignoring it.`)
    return path
  }

  if (extension === "svg") {
    const data = await api.request(url).catch((error) => {
      console.error(error)
      throw new Error(`Failed at requesting svg favicon. URL: ${url}`)
    })
    await app.vault.create(path, data)
  } else {
    const data = await api
      .requestUrl(url)
      .then((data) => data.arrayBuffer)
      .catch((error) => {
        console.error(error)
        throw new Error(`Failed at requesting image favicon. URL: ${url}`)
      })

    await app.vault.createBinary(path, data)
  }

  return path
}

/**
 * @param url The URL to extract the file extension from
 * @returns The extension of the file, if no valid extension or "ico" is found returns "jpg".
 *
 * Note: `.ico` will not be displayed by Obsidian, but `jpg` works for this files.
 */
function getImageExtensionFromURL(url: string): string {
  const rawExtension = new URL(url).pathname.split(".").at(-1)

  return match(rawExtension?.toLocaleLowerCase())
    .with(P.union("jpg", "webp", "png", "svg"), (extension) => extension)
    .otherwise(() => "jpg")
}

export function selectTags(quickAdd: QuickAddArgument) {
  const currentTags = Object.entries(
    // @ts-expect-error
    app.metadataCache.getTags() as Record<string, number>
  )
    .sort((a, b) => b[1] - a[1])
    .map((tag) => tag[0].slice(1))

  return quickAdd.quickAddApi.checkboxPrompt(currentTags, [])
}
