"use client"

import { DataTable } from "@/components/data-table"
import { useMemo } from "react"
import { format } from "date-fns"

interface TikTokVideo {
  id: string
  title: string
  description: string
  videoFile?: File
  videoUrl?: string
  thumbnailUrl?: string
  duration: number
  trend: string
  hashtags: string[]
  optimalTime: string
  scheduledDate: Date
  expectedEngagement: number
  status: 'draft' | 'scheduled' | 'posted'
  uploadProgress?: number
}

interface ListViewProps {
  videos: TikTokVideo[]
}

export function ListView({ videos }: ListViewProps) {
  const tableData = useMemo(() => {
    return videos.map(video => ({
      id: parseInt(video.id),
      header: video.title,
      type: video.status,
      status: video.status === 'posted' ? 'Completed' : video.status === 'scheduled' ? 'In Progress' : 'Draft',
      target: video.expectedEngagement.toString(),
      limit: video.duration.toString(),
      reviewer: video.trend
    }))
  }, [videos])

  return <DataTable data={tableData} />
}
