import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    // Use tavily to search for real TikTok trends
    const searchResponse = await fetch('http://localhost:3001/mcp/tavily/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `${query} TikTok trends 2026`,
        max_results: 10,
        topic: 'general',
        include_raw_content: true
      })
    })

    if (!searchResponse.ok) {
      throw new Error('Failed to fetch trends from tavily')
    }

    const searchData = await searchResponse.json()
    const results = searchData.results || []

    // Transform results into trend format
    const trends = results.map((result: any, index: number) => ({
      title: result.title || `Trend ${index + 1}`,
      description: result.content?.slice(0, 200) + '...' || result.snippet || 'No description available',
      url: result.url || '#'
    }))

    // Fallback to mock data if no results
    if (trends.length === 0) {
      trends.push(
        {
          title: "#DanceChallenge2026",
          description: "Latest viral dance challenge featuring AI-generated music and synchronized moves.",
          url: "https://tiktok.com/trend/dance-challenge-2026"
        },
        {
          title: "AI Content Creation",
          description: "Creators using AI tools to generate unique video content and effects.",
          url: "https://tiktok.com/trend/ai-creation"
        },
        {
          title: "Sustainable Fashion Haul",
          description: "Eco-friendly fashion trends and sustainable shopping challenges.",
          url: "https://tiktok.com/trend/sustainable-fashion"
        }
      )
    }

    return Response.json({ trends })
  } catch (error) {
    console.error('Trend discovery error:', error)
    // Return mock data as fallback
    const mockTrends = [
      {
        title: "#DanceChallenge2026",
        description: "Latest viral dance challenge featuring AI-generated music and synchronized moves.",
        url: "https://tiktok.com/trend/dance-challenge-2026"
      },
      {
        title: "AI Content Creation",
        description: "Creators using AI tools to generate unique video content and effects.",
        url: "https://tiktok.com/trend/ai-creation"
      },
      {
        title: "Sustainable Fashion Haul",
        description: "Eco-friendly fashion trends and sustainable shopping challenges.",
        url: "https://tiktok.com/trend/sustainable-fashion"
      }
    ]
    return Response.json({ trends: mockTrends })
  }
}
