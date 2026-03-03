export interface FetchResult {
  markdown: string
  title: string
  url: string
}

export async function fetchPage(url: string): Promise<FetchResult> {
  // TODO: fetch URL, parse HTML with cheerio, convert to markdown with turndown
  throw new Error('Not implemented')
}

export async function fetchApiType(_typeName: string): Promise<FetchResult> {
  // TODO: fetch type documentation from sbox.game/api or parse from source XML docs
  throw new Error('Not implemented')
}
