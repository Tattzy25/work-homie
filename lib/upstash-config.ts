export const UPSTASH_CONFIG = {
  url: process.env.UPSTASH_SEARCH_REST_URL?.replace(/^"|"$/g, ''),
  token: process.env.UPSTASH_SEARCH_REST_TOKEN?.replace(/^"|"$/g, ''),
}