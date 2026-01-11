import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Return mock components data for now
    const components = {
      components: [
        {
          id: "button",
          title: "Button",
          description: "Clickable button component",
          category: "input",
          filePath: "/components/ui/button.tsx"
        }
      ]
    }
    return Response.json(components)
  } catch (error) {
    console.error('Get components error:', error)
    return Response.json({ error: 'Failed to get components' }, { status: 500 })
  }
}
