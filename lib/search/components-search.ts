/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * ⚠️  CRITICAL: UPSTASH SEARCH API IMPLEMENTATION - DO NOT MODIFY  ⚠️
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * This file implements the Upstash Search SDK (@upstash/search v0.1.7+).
 * 
 * ⚠️ IMPORTANT DISTINCTIONS:
 * - This is @upstash/search (document/text search) NOT @upstash/vector (vector embeddings)
 * - These are TWO DIFFERENT packages with DIFFERENT APIs
 * 
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * CORRECT API FOR @upstash/search:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * ✅ CORRECT METHOD: index.search()
 *    Parameters: { query: string, limit: number, filter?, reranking?, semanticWeight? }
 * 
 * Available SearchIndex methods:
 * - search({ query, limit, ... })  ← PRIMARY SEARCH METHOD
 * - upsert(documents[])
 * - fetch({ ids })
 * - range({ cursor, limit })
 * - delete({ ids })
 * - reset()
 * - info()
 * 
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * ❌ INCORRECT (THIS IS FOR @upstash/vector - DIFFERENT PACKAGE):
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * ❌ index.query({ query, topK })  ← DOES NOT EXIST IN @upstash/search
 * ❌ Using topK parameter          ← ONLY EXISTS IN @upstash/vector
 * 
 * DO NOT confuse with Upstash Vector which uses:
 * - index.query({ vector, topK }) for vector similarity search
 * 
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * WHY LAZY INITIALIZATION?
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * Next.js attempts to statically analyze modules during build time.
 * If the Search client is instantiated at module load:
 * - Build fails when UPSTASH_SEARCH_REST_URL/TOKEN are not set
 * - Cannot build without production environment variables
 * 
 * Solution: Proxy pattern delays instantiation until first actual use.
 * 
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * REFERENCES:
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * Official Documentation:
 * - Search SDK: https://upstash.com/docs/search/sdks/ts/commands/search
 * - Getting Started: https://upstash.com/docs/search/sdks/ts/getting-started
 * - GitHub: https://github.com/upstash/search-js
 * 
 * Type Definitions Location:
 * - node_modules/@upstash/search/dist/search-Bb4VN1pK.d.ts
 * 
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { Search } from "@upstash/search";
import { UPSTASH_CONFIG } from "../upstash-config";

// Component content type
export type ComponentContent = {
  title: string;
  description: string;
  category: "input" | "display" | "layout" | "feedback" | "navigation" | "overlay";
  subcategory: string;
  tags: string[];
};

// Component metadata type
export type ComponentMetadata = {
  file: string;
  exports: string[];
  dependencies?: string[];
  difficulty: "easy" | "medium" | "hard";
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LAZY INITIALIZATION IMPLEMENTATION - DO NOT REMOVE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let client: Search | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let componentIndexInstance: any = null;

/**
 * ⚠️ DO NOT CALL AT MODULE LEVEL - Lazy initialization only
 * Creates Search client only when first accessed, not at module load time.
 * This prevents build failures when environment variables are unavailable.
 */
function getClient() {
  if (!client) {
    // Only initialize if environment variables are available
    if (!UPSTASH_CONFIG.url || !UPSTASH_CONFIG.token) {
      throw new Error("Upstash configuration is missing. Please set UPSTASH_SEARCH_REST_URL and UPSTASH_SEARCH_REST_TOKEN environment variables.");
    }
    client = new Search(UPSTASH_CONFIG);
  }
  return client;
}

/**
 * ⚠️ DO NOT CALL AT MODULE LEVEL - Lazy initialization only
 * Creates index instance only when first accessed via the Proxy.
 */
function getComponentIndex() {
  if (!componentIndexInstance) {
    componentIndexInstance = getClient().index<ComponentContent, ComponentMetadata>("components");
  }
  return componentIndexInstance;
}

/**
 * ⚠️ CRITICAL EXPORT - DO NOT MODIFY THE PROXY PATTERN
 * 
 * This Proxy ensures the Search client is only instantiated when methods are called,
 * not when this module is imported. This is REQUIRED for Next.js builds to succeed.
 * 
 * The proxy intercepts all property access and delegates to the actual index instance.
 * All methods (search, upsert, fetch, etc.) work transparently through the proxy.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const componentIndex = new Proxy({} as any, {
  get(target, prop) {
    const index = getComponentIndex();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (index as any)[prop];
    return typeof value === 'function' ? value.bind(index) : value;
  }
});

// Upsert components into the index
export async function upsertComponents(
  components: Array<{
    id: string;
    content: ComponentContent;
    metadata: ComponentMetadata;
  }>
) {
  try {
    await componentIndex.upsert(components);
    console.log(`Successfully upserted ${components.length} components`);
  } catch (error) {
    console.error("Error upserting components:", error);
    throw error;
  }
}

// Fetch components by IDs
export async function fetchComponentsByIds(ids: string[]) {
  try {
    const documents = await componentIndex.fetch({
      ids,
    });
    return documents;
  } catch (error) {
    console.error("Error fetching components by IDs:", error);
    throw error;
  }
}

/**
 * AI search components with reranking (best for relevance)
 * 
 * ⚠️ CORRECT API: Uses .search() with "limit" parameter
 * ❌ DO NOT CHANGE TO: .query() with "topK" parameter
 */
export async function searchComponentsWithReranking(query: string, limit: number = 10) {
  try {
    // ⚠️ CRITICAL: .search() with "limit" is the correct method for @upstash/search
    const results = await componentIndex.search({
      query,
      limit,
      reranking: true,
    });
    return results;
  } catch (error) {
    console.error("Error searching components with reranking:", error);
    throw error;
  }
}

/**
 * AI search with semantic only (meaning-based)
 * 
 * ⚠️ CORRECT API: Uses .search() with "limit" parameter
 * ❌ DO NOT CHANGE TO: .query() with "topK" parameter
 */
export async function searchComponentsSemantic(query: string, limit: number = 10) {
  try {
    const results = await componentIndex.search({
      query,
      limit,
      semanticWeight: 1,
    });
    return results;
  } catch (error) {
    console.error("Error searching components semantically:", error);
    throw error;
  }
}

// AI search with full-text only (keyword-based)
export async function searchComponentsFullText(query: string, limit: number = 10) {
  try {
    const results = await componentIndex.search({
      query,
      limit,
      semanticWeight: 0,
    });
    return results;
  } catch (error) {
    console.error("Error searching components full-text:", error);
    throw error;
  }
}

// AI search with balanced semantic + full-text
export async function searchComponentsBalanced(query: string, limit: number = 10) {
  try {
    const results = await componentIndex.search({
      query,
      limit,
      semanticWeight: 0.5,
    });
    return results;
  } catch (error) {
    console.error("Error searching components balanced:", error);
    throw error;
  }
}

// Search with category filter
export async function searchComponentsByCategory(
  query: string,
  category: ComponentContent["category"],
  limit: number = 10
) {
  try {
    const results = await componentIndex.search({
      query,
      limit,
      filter: `category = '${category}'`,
      reranking: true,
    });
    return results;
  } catch (error) {
    console.error("Error searching components by category:", error);
    throw error;
  }
}

// Search with difficulty filter
export async function searchComponentsByDifficulty(
  query: string,
  difficulty: ComponentMetadata["difficulty"],
  limit: number = 10
) {
  try {
    const results = await componentIndex.search({
      query,
      limit,
      filter: `difficulty = '${difficulty}'`,
      reranking: true,
    });
    return results;
  } catch (error) {
    console.error("Error searching components by difficulty:", error);
    throw error;
  }
}

// Delete a component by ID
export async function deleteComponent(id: string) {
  try {
    await componentIndex.delete({
      ids: [id],
    });
    console.log(`Deleted component: ${id}`);
  } catch (error) {
    console.error("Error deleting component:", error);
    throw error;
  }
}

// Delete multiple components
export async function deleteComponents(ids: string[]) {
  try {
    await componentIndex.delete({
      ids,
    });
    console.log(`Deleted ${ids.length} components`);
  } catch (error) {
    console.error("Error deleting components:", error);
    throw error;
  }
}

// Range search (pagination)
export async function rangeSearchComponents(cursor: string = "0", limit: number = 10) {
  try {
    const { nextCursor, documents } = await componentIndex.range({
      cursor,
      limit,
    });
    return { nextCursor, documents };
  } catch (error) {
    console.error("Error range searching components:", error);
    throw error;
  }
}

// Get index info and namespace statistics
export async function getComponentIndexInfo() {
  try {
    const info = await getClient().info();
    return info;
  } catch (error) {
    console.error("Error getting index info:", error);
    throw error;
  }
}

// Reset the index (delete all documents) - USE WITH CAUTION
export async function resetComponentIndex() {
  try {
    await componentIndex.reset();
    console.log("Component index reset successfully");
  } catch (error) {
    console.error("Error resetting component index:", error);
    throw error;
  }
}

export async function getAllComponents() {
  try {
    const results = await componentIndex.range({ cursor: "0", limit: 1000 });
    return results.documents;
  } catch (error) {
    console.error("Error getting all components:", error);
    return [];
  }
}
