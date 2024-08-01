import {
  replaceIllegalFileNameCharacters,
  saveImage,
  selectTags,
} from "../lib/helper.cjs"
import type { QuickAddArgument } from "../Types"

module.exports = getBookData

async function getBookData(quickAdd: QuickAddArgument) {
  console.log("Getting book data")

  const clipboard = await quickAdd.quickAddApi.utility.getClipboard()
  const inputTitle = await quickAdd.quickAddApi.inputPrompt(
    "Enter book name: ",
    clipboard,
    clipboard
  )
  const apiBaseUrl = "https://www.googleapis.com/books/v1/volumes?q="
  const requestParam = encodeURIComponent(`intitle:${inputTitle}`)
  const extraParams = "&maxResults=40&&printType=books" // Only show books, not magazines
  const urlQuery = apiBaseUrl + requestParam + extraParams

  const foundBooks = await quickAdd.obsidian
    .request(urlQuery)
    .then((json) => JSON.parse(json) as BooksRootObject)
    .then((books) =>
      books.items
        .map((book) => book.volumeInfo)
        .filter(
          (book) =>
            book.publisher &&
            book.imageLinks?.smallThumbnail &&
            book.subtitle &&
            book.categories
        )
    )

  console.log(foundBooks)

  const {
    title,
    authors,
    categories,
    subtitle,
    description,
    infoLink,
    industryIdentifiers,
    publisher,
    publishedDate,
    ...bookData
  } = await quickAdd.quickAddApi.suggester(
    (book) =>
      `${book.title} -- ${book.authors?.join(", ")} -- ${book.publisher}`,
    foundBooks
  )
  const cover = bookData.imageLinks?.smallThumbnail

  const imagePath =
    cover &&
    (await saveImage({
      folder: "Book Covers",
      url: cover,
      fileName: replaceIllegalFileNameCharacters(title),
      api: quickAdd.obsidian,
    }))

  const tags = await selectTags(quickAdd)

  quickAdd.variables = {
    ...quickAdd.variables,
    title,
    infoLink,
    publisher,
    description,
    authors,
    publishedDate,
    tags,
    subtitle,
    categories,
    cover: imagePath,
    fileName: replaceIllegalFileNameCharacters(inputTitle),
    id: industryIdentifiers
      .map((isbn) => `${isbn.type}: ${isbn.identifier}`)
      .join(","),
  }
}

// Auto generated with JSONtoTS VSCode extension
interface BooksRootObject {
  kind: string
  totalItems: number
  items: Item[]
}

interface VolumeInfo {
  title: string
  publishedDate: string
  industryIdentifiers: IndustryIdentifier[]
  readingModes: ReadingModes
  pageCount: number
  printType: string
  maturityRating: string
  allowAnonLogging: boolean
  contentVersion: string
  panelizationSummary: PanelizationSummary
  imageLinks?: ImageLinks
  language: string
  previewLink: string
  infoLink: string
  canonicalVolumeLink: string
  subtitle?: string
  authors?: string[]
  publisher?: string
  description?: string
  categories?: string[]
}

interface Item {
  kind: string
  id: string
  etag: string
  selfLink: string
  volumeInfo: VolumeInfo
  saleInfo: SaleInfo
  accessInfo: AccessInfo
  searchInfo?: SearchInfo
}

interface SearchInfo {
  textSnippet: string
}

interface AccessInfo {
  country: string
  viewability: string
  embeddable: boolean
  publicDomain: boolean
  textToSpeechPermission: string
  epub: Epub
  pdf: Pdf
  webReaderLink: string
  accessViewStatus: string
  quoteSharingAllowed: boolean
}

interface Pdf {
  isAvailable: boolean
  acsTokenLink?: string
}

interface Epub {
  isAvailable: boolean
  downloadLink?: string
  acsTokenLink?: string
}

interface SaleInfo {
  country: string
  saleability: string
  isEbook: boolean
  buyLink?: string
  listPrice?: ListPrice
  retailPrice?: ListPrice
  offers?: Offer[]
}

interface Offer {
  finskyOfferType: number
  listPrice: ListPrice2
  retailPrice: ListPrice2
  giftable: boolean
}

interface ListPrice2 {
  amountInMicros: number
  currencyCode: string
}

interface ListPrice {
  amount: number
  currencyCode: string
}

interface ImageLinks {
  smallThumbnail: string
  thumbnail: string
}

interface PanelizationSummary {
  containsEpubBubbles: boolean
  containsImageBubbles: boolean
}

interface ReadingModes {
  text: boolean
  image: boolean
}

interface IndustryIdentifier {
  type: string
  identifier: string
}
