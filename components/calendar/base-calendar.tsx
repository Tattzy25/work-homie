"use client"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Video, Clock, TrendingUp, Hash, Edit, Trash2, Plus } from "lucide-react"
import { format, isSameDay } from "date-fns"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

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

interface BaseCalendarProps {
  videos: TikTokVideo[]
  selectedDate: Date | undefined
  currentDate: Date
  onDateSelect: (date: Date | undefined) => void
  onMonthChange: (month: Date) => void
  onEditVideo: (video: TikTokVideo) => void
  onDeleteVideo: (videoId: string) => void
  onAddVideo: () => void
  calendarProps?: Partial<React.ComponentProps<typeof Calendar>>
}

export function BaseCalendar({
  videos,
  selectedDate,
  currentDate,
  onDateSelect,
  onMonthChange,
  onEditVideo,
  onDeleteVideo,
  onAddVideo,
  calendarProps = {}
}: BaseCalendarProps) {
  const videosForSelectedDate = useMemo(() => {
    if (!selectedDate) return []
    return videos.filter(video => isSameDay(video.scheduledDate, selectedDate))
  }, [videos, selectedDate])

  const datesWithPosts = useMemo(() => {
    return videos.map(video => video.scheduledDate)
  }, [videos])

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: 'bg-blue-100 text-blue-800 border-blue-200',
      posted: 'bg-green-100 text-green-800 border-green-200',
      draft: 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[status as keyof typeof colors] || colors.draft
  }

  return (
    <Card className="p-6">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={onDateSelect}
        month={currentDate}
        onMonthChange={onMonthChange}
        className="w-full"
        captionLayout="dropdown"
        modifiers={{
          hasVideos: datesWithPosts
        }}
        modifiersClassNames={{
          hasVideos: "bg-primary/10 font-bold text-primary"
        }}
        numberOfMonths={1}
        {...(calendarProps as any)}
      />
    </Card>
  )
}

interface VideoCardProps {
  video: TikTokVideo
  getStatusColor: (status: string) => string
  onEdit: (video: TikTokVideo) => void
  onDelete: (videoId: string) => void
}

function VideoCard({ video, getStatusColor, onEdit, onDelete }: VideoCardProps) {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold flex items-center gap-2">
            <Video className="h-4 w-4" />
            {video.title}
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            {video.description}
          </p>
        </div>
        <Badge className={cn("ml-2", getStatusColor(video.status))}>
          {video.status}
        </Badge>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {video.optimalTime}
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="h-4 w-4" />
          {video.expectedEngagement}%
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Hash className="h-4 w-4 text-muted-foreground" />
        {video.hashtags.slice(0, 3).map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
        {video.hashtags.length > 3 && (
          <Badge variant="secondary" className="text-xs">
            +{video.hashtags.length - 3}
          </Badge>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(video)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(video.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
