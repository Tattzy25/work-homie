import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { title, description, trend, scheduledDate } = await request.json()

    // Mock planning - in production, use AI to generate personalized plans
    const mockPlan = {
      title: title || "Untitled Video",
      description: description || "No description provided",
      trend,
      scheduledDate: scheduledDate || new Date().toISOString(),
      hashtags: [
        "#TikTok",
        "#Viral",
        "#Trending",
        trend.replace(/\s+/g, '').replace('#', '#'),
        "#ContentCreator",
        "#VideoContent"
      ],
      tips: [
        "Hook viewers in the first 3 seconds with something engaging",
        "Use trending audio to increase discoverability",
        "Add text overlays to convey your message quickly",
        "Engage with similar content in the comments",
        "Post consistently to build algorithm favor",
        "Collaborate with creators in your niche",
        "Use high-quality lighting and clear audio",
        "End with a strong call-to-action"
      ]
    }

    return Response.json({ plan: mockPlan })
  } catch (error) {
    console.error('Video planning error:', error)
    return Response.json({ error: 'Failed to generate plan' }, { status: 500 })
  }
}
