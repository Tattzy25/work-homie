"use client"

import { BaseCalendar } from "./base-calendar"

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

interface CalendarViewProps {
  currentDate: Date
  selectedDate: Date | undefined
  videos: TikTokVideo[]
  onDateSelect: (date: Date | undefined) => void
  onMonthChange: (month: Date) => void
  onEditVideo: (video: TikTokVideo) => void
  onDeleteVideo: (videoId: string) => void
  onAddVideo: () => void
}

export function CalendarView({
  currentDate,
  selectedDate,
  videos,
  onDateSelect,
  onMonthChange,
  onEditVideo,
  onDeleteVideo,
  onAddVideo
}: CalendarViewProps) {
  return (
    <BaseCalendar
      videos={videos}
      selectedDate={selectedDate}
      currentDate={currentDate}
      onDateSelect={onDateSelect}
      onMonthChange={onMonthChange}
      onEditVideo={onEditVideo}
      onDeleteVideo={onDeleteVideo}
      onAddVideo={onAddVideo}
    />
  )
}
