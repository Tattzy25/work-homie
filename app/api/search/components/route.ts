import { NextRequest, NextResponse } from "next/server";
import {
  searchComponentsWithReranking,
  searchComponentsSemantic,
  searchComponentsFullText,
  searchComponentsBalanced,
  searchComponentsByCategory,
  searchComponentsByDifficulty,
  fetchComponentsByIds,
} from "@/lib/search/components-search";

async function executeSearchWithRetry(
  fn: () => Promise<any>,
  maxRetries: number = 5
): Promise<any> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries) {
        return null;
      }
    }
  }
  return null;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const type = searchParams.get("type") || "reranking";
  const category = searchParams.get("category");
  const difficulty = searchParams.get("difficulty");
  const ids = searchParams.get("ids");
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  // If fetching by IDs
  if (ids) {
    const idArray = ids.split(",").map((id) => id.trim());
    const results = await executeSearchWithRetry(() =>
      fetchComponentsByIds(idArray)
    );
    if (results) return NextResponse.json(results);
    return NextResponse.json(null);
  }

  // If no query, just return null
  if (!query) {
    return NextResponse.json(null);
  }

  let results;

  // Route to appropriate search type with retry logic
  if (category) {
    results = await executeSearchWithRetry(() =>
      searchComponentsByCategory(query, category as any, limit)
    );
  } else if (difficulty) {
    results = await executeSearchWithRetry(() =>
      searchComponentsByDifficulty(query, difficulty as any, limit)
    );
  } else if (type === "semantic") {
    results = await executeSearchWithRetry(() =>
      searchComponentsSemantic(query, limit)
    );
  } else if (type === "fulltext") {
    results = await executeSearchWithRetry(() =>
      searchComponentsFullText(query, limit)
    );
  } else if (type === "balanced") {
    results = await executeSearchWithRetry(() =>
      searchComponentsBalanced(query, limit)
    );
  } else {
    results = await executeSearchWithRetry(() =>
      searchComponentsWithReranking(query, limit)
    );
  }

  return NextResponse.json(results);
}
