"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"

interface VideoFormData {
  title: string
  description: string
  trend: string
  hashtags: string
  optimalTime: string
  scheduledDate: Date
}

interface VideoFormProps {
  formData: VideoFormData
  onFormDataChange: (field: keyof VideoFormData, value: string | Date) => void
  showDateField?: boolean
}

const MOCK_TRENDS = [
  "#DanceChallenge2026",
  "#AITools",
  "#SustainableLiving",
  "#TechTrends",
  "#CreatorEconomy",
  "#ViralHacks",
  "#ContentCreation",
  "#TikTokTips"
] as const

const OPTIMAL_TIMES = [
  "07:00", "09:00", "12:00", "15:00", "18:00", "20:00", "22:00"
] as const

export function VideoForm({ formData, onFormDataChange, showDateField = false }: VideoFormProps) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Video Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => onFormDataChange('title', e.target.value)}
          placeholder="e.g., Epic Dance Challenge Entry"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => onFormDataChange('description', e.target.value)}
          placeholder="Brief description of your content..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="trend">Trend</Label>
          <Select value={formData.trend} onValueChange={(value) => onFormDataChange('trend', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a trend" />
            </SelectTrigger>
            <SelectContent>
              {MOCK_TRENDS.map((trend) => (
                <SelectItem key={trend} value={trend}>
                  {trend}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="time">Optimal Time</Label>
          <Select value={formData.optimalTime} onValueChange={(value) => onFormDataChange('optimalTime', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              {OPTIMAL_TIMES.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="hashtags">Hashtags (comma-separated)</Label>
        <Input
          id="hashtags"
          value={formData.hashtags}
          onChange={(e) => onFormDataChange('hashtags', e.target.value)}
          placeholder="#Viral, #Trending, #TikTok"
        />
      </div>

      {showDateField && (
        <div className="grid gap-2">
          <Label>Schedule Date</Label>
          <Input
            type="date"
            value={format(formData.scheduledDate, 'yyyy-MM-dd')}
            onChange={(e) => onFormDataChange('scheduledDate', new Date(e.target.value))}
          />
        </div>
      )}
    </div>
  )
}
