import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Musarty - AI-Powered Content Creation Platform",
  description: "Professional TikTok creator tools for content discovery, analysis, and planning. Create viral content with AI-powered trend analysis and workflow automation.",
  keywords: ["content creation", "TikTok", "AI tools", "trend analysis", "viral content", "creator tools"],
  authors: [{ name: "Musarty Team" }],
  creator: "Musarty",
  publisher: "Musarty",
  metadataBase: new URL("https://musarty.com"),
  alternates: {
    canonical: "https://musarty.com",
  },
  openGraph: {
    title: "Musarty - AI-Powered Content Creation Platform",
    description: "Professional TikTok creator tools for content discovery, analysis, and planning.",
    url: "https://musarty.com",
    siteName: "Musarty",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Musarty - AI-Powered Content Creation Platform",
    description: "Professional TikTok creator tools for content discovery, analysis, and planning.",
    creator: "@musarty",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
