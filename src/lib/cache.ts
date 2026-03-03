interface CacheEntry<T> {
  value: T
  expiresAt: number
}

export class Cache<T> {
  private store = new Map<string, CacheEntry<T>>()
  private readonly ttlMs: number
  private readonly maxEntries: number

  constructor(ttlMs = 14400000, maxEntries = 500) {
    this.ttlMs = ttlMs
    this.maxEntries = maxEntries
  }

  get(key: string): T | undefined {
    // TODO: lookup + expiration check
    return undefined
  }

  set(key: string, value: T): void {
    // TODO: insert + LRU eviction
  }

  has(key: string): boolean {
    // TODO: check existence + expiration
    return false
  }

  clear(): void {
    this.store.clear()
  }

  get size(): number {
    return this.store.size
  }
}
