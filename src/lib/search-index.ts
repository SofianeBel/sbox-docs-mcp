export interface SearchResult {
  title: string
  url: string
  snippet: string
}

export class SearchIndex {
  // TODO: initialize minisearch instance with fields (title, content, url)

  async initialize(): Promise<void> {
    // TODO: build index from known documentation pages
  }

  search(_query: string, _limit = 10): SearchResult[] {
    // TODO: query minisearch and return ranked results
    return []
  }
}
