"use client"

import { useState, useMemo, useCallback } from "react"
import { useBoolean, useToggle, useMount, useUnmount, useUpdateEffect, useEventListener, useInterval } from "ahooks"
import { CalendarView } from "./calendar-view"
import { ListView } from "./list-view"
import { CalendarAnalytics } from "./calendar-analytics"
import { CalendarNavigation } from "./calendar-navigation"
import { VideoUpload } from "./video-upload"
import { VideoForm } from "./video-form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import { format, isSameDay, startOfMonth, endOfMonth, addMonths, subMonths } from "date-fns"
import { toast } from "sonner"

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

interface PostFormData {
  title: string
  description: string
  trend: string
  hashtags: string
  optimalTime: string
  scheduledDate: Date
}

// Mock data for existing videos
const MOCK_VIDEOS: TikTokVideo[] = [
  {
    id: "1",
    title: "AI Dance Challenge",
    description: "Showcasing the latest AI-powered dance moves",
    videoUrl: "/videos/dance-challenge.mp4",
    thumbnailUrl: "/thumbnails/dance.jpg",
    duration: 15,
    trend: "#DanceChallenge2026",
    hashtags: ["#DanceChallenge2026", "#AI", "#Viral"],
    optimalTime: "18:00",
    scheduledDate: new Date(),
    expectedEngagement: 85,
    status: 'scheduled'
  },
  {
    id: "2",
    title: "Sustainable Fashion Haul",
    description: "Eco-friendly fashion finds under $50",
    videoUrl: "/videos/fashion-haul.mp4",
    thumbnailUrl: "/thumbnails/fashion.jpg",
    duration: 30,
    trend: "#SustainableLiving",
    hashtags: ["#SustainableLiving", "#EcoFashion", "#BudgetFriendly"],
    optimalTime: "15:00",
    scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    expectedEngagement: 72,
    status: 'draft'
  }
]

type ViewMode = 'calendar' | 'list'

export function ViralCalendar() {
  // Advanced hooks from ahooks
  const [loading, { setTrue: setLoading, setFalse: setNotLoading }] = useBoolean(false)
  const [viewMode, { toggle: toggleViewMode, set: setViewMode }] = useToggle<ViewMode>('calendar')
  const [autoSaveEnabled] = useBoolean(true)

  const [currentDate, setCurrentDate] = useState(new Date())
  const [videos, setVideos] = useState<TikTokVideo[]>(MOCK_VIDEOS)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingVideo, setEditingVideo] = useState<TikTokVideo | null>(null)
  const [formData, setFormData] = useState<PostFormData>({
    title: "",
    description: "",
    trend: "",
    hashtags: "",
    optimalTime: "6:00 PM",
    scheduledDate: new Date()
  })
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  // Lifecycle hooks
  useMount(() => {
    console.log('🗓️ Viral Calendar mounted!')
    // Load saved calendar data from localStorage
    const saved = localStorage.getItem('viral-calendar-videos')
    if (saved) {
      try {
        const parsedVideos = JSON.parse(saved).map((video: any) => ({
          ...video,
          scheduledDate: new Date(video.scheduledDate)
        }))
        setVideos(parsedVideos)
      } catch (error) {
        console.warn('Failed to load saved calendar data')
      }
    }
  })

  useUnmount(() => {
    console.log('📅 Viral Calendar unmounting...')
  })

  // Auto-save videos to localStorage when they change
  useUpdateEffect(() => {
    if (autoSaveEnabled) {
      localStorage.setItem('viral-calendar-videos', JSON.stringify(videos))
      console.log('💾 Auto-saved calendar data')
    }
  }, [videos])

  // Keyboard navigation
  useEventListener('keydown', (event: KeyboardEvent) => {
    if (isDialogOpen) return // Don't interfere with form inputs

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        navigatePrevious()
        break
      case 'ArrowRight':
        event.preventDefault()
        navigateNext()
        break
      case 'Home':
        event.preventDefault()
        navigateToday()
        break
      case 't':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault()
          toggleViewMode()
        }
        break
    }
  })

  // Auto-refresh trends every 5 minutes
  useInterval(() => {
    if (!loading) {
      console.log('🔄 Refreshing calendar trends...')
      // In a real app, this would fetch latest TikTok trends
    }
  }, 300000) // 5 minutes

  // Computed values
  const currentViewVideos = useMemo(() => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    return videos.filter(video =>
      video.scheduledDate >= monthStart && video.scheduledDate <= monthEnd
    )
  }, [videos, currentDate])

  const analyticsData = useMemo(() => ({
    totalVideos: videos.length,
    scheduledVideos: videos.filter(v => v.status === 'scheduled').length,
    avgEngagement: 78,
    bestTime: "6-8 PM"
  }), [videos])

  // Navigation functions
  const navigatePrevious = useCallback(() => {
    setCurrentDate(prev => subMonths(prev, 1))
  }, [])

  const navigateNext = useCallback(() => {
    setCurrentDate(prev => addMonths(prev, 1))
  }, [])

  const navigateToday = useCallback(() => {
    setCurrentDate(new Date())
  }, [])

  // Form validation
  const validateForm = useCallback(() => {
    console.log('🔍 Validating form...', { formData, selectedDate, viewMode })

    if (!formData.title.trim()) {
      toast.error("Video title is required")
      return false
    }

    if (!formData.description.trim()) {
      toast.error("Video description is required")
      return false
    }

    if (!formData.trend) {
      toast.error("Please select a trend")
      return false
    }

    // In calendar mode, we need a selected date
    if (viewMode === 'calendar' && !selectedDate) {
      toast.error("Please select a date on the calendar first")
      return false
    }

    console.log('✅ Form validation passed')
    return true
  }, [formData, selectedDate, viewMode])

  // Form handlers
  const handleAddVideo = useCallback(() => {
    console.log('📝 handleAddVideo called')

    if (!validateForm()) {
      console.log('❌ Form validation failed')
      return
    }

    try {
      const newVideo: TikTokVideo = {
        id: crypto.randomUUID(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        trend: formData.trend,
        hashtags: formData.hashtags.split(',').map(tag => tag.trim()).filter(Boolean),
        optimalTime: formData.optimalTime,
        scheduledDate: selectedDate || formData.scheduledDate,
        expectedEngagement: Math.floor(Math.random() * 40) + 60,
        status: 'draft' as const,
        duration: 0
      }

      console.log('🎬 Creating new video:', newVideo)

      setVideos(prev => [...prev, newVideo])
      resetForm()
      setIsDialogOpen(false)
      toast.success("Video scheduled successfully!")
      console.log('✅ Video added successfully')
    } catch (error) {
      console.error('❌ Error adding video:', error)
      toast.error("Failed to add video. Please try again.")
    }
  }, [selectedDate, formData, viewMode, validateForm])

  const handleEditVideo = useCallback((video: TikTokVideo) => {
    setEditingVideo(video)
    setFormData({
      title: video.title,
      description: video.description,
      trend: video.trend,
      hashtags: video.hashtags.join(', '),
      optimalTime: video.optimalTime,
      scheduledDate: video.scheduledDate
    })
    setIsDialogOpen(true)
  }, [])

  const handleUpdateVideo = useCallback(() => {
    if (!editingVideo) return

    setVideos(prev => prev.map(video =>
      video.id === editingVideo.id
        ? {
            ...video,
            title: formData.title,
            description: formData.description,
            trend: formData.trend,
            hashtags: formData.hashtags.split(',').map(tag => tag.trim()).filter(Boolean),
            optimalTime: formData.optimalTime,
            scheduledDate: formData.scheduledDate
          }
        : video
    ))

    setEditingVideo(null)
    resetForm()
    setIsDialogOpen(false)
    toast.success("Video updated successfully!")
  }, [editingVideo, formData])

  const handleDeleteVideo = useCallback((videoId: string) => {
    setVideos(prev => prev.filter(video => video.id !== videoId))
    toast.success("Video deleted successfully!")
  }, [])

  const resetForm = useCallback(() => {
    setFormData({
      title: "",
      description: "",
      trend: "",
      hashtags: "",
      optimalTime: "6:00 PM",
      scheduledDate: new Date()
    })
    setEditingVideo(null)
  }, [])

  // CSV Import/Export
  const exportToCSV = useCallback(() => {
    const csvData = videos.map(video => ({
      title: video.title,
      description: video.description,
      trend: video.trend,
      hashtags: video.hashtags.join(';'),
      optimalTime: video.optimalTime,
      scheduledDate: format(video.scheduledDate, 'yyyy-MM-dd'),
      status: video.status,
      expectedEngagement: video.expectedEngagement
    }))

    const csvString = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n')

    const blob = new Blob([csvString], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tiktok-calendar-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success("CSV exported successfully!")
  }, [videos])

  const importFromCSV = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const csv = e.target?.result as string
      const lines = csv.split('\n')
      const headers = lines[0].split(',')

      const importedVideos: TikTokVideo[] = lines.slice(1).map(line => {
        const values = line.split(',')
        return {
          id: crypto.randomUUID(),
          title: values[0] || '',
          description: values[1] || '',
          trend: values[2] || '',
          hashtags: values[3] ? values[3].split(';') : [],
          optimalTime: values[4] || '18:00',
          scheduledDate: new Date(values[5] || new Date()),
          status: (values[6] as TikTokVideo['status']) || 'draft',
          expectedEngagement: parseInt(values[7]) || 70,
          duration: 0
        }
      }).filter(video => video.title)

      setVideos(prev => [...prev, ...importedVideos])
      toast.success(`Imported ${importedVideos.length} videos from CSV!`)
    }
    reader.readAsText(file)
  }, [])

  const updateFormField = useCallback((field: keyof PostFormData, value: string | Date) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleSubmitForm = useCallback(() => {
    if (editingVideo) {
      handleUpdateVideo()
    } else {
      handleAddVideo()
    }
  }, [editingVideo, handleUpdateVideo, handleAddVideo])

  return (
    <Tabs defaultValue="calendar" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="calendar">Calendar</TabsTrigger>
        <TabsTrigger value="stats">Stats</TabsTrigger>
      </TabsList>

      <TabsContent value="calendar" className="space-y-6">
        {/* Calendar Header with Big Add Button */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="text-2xl">🗓️</span>
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <p className="text-muted-foreground">
              {currentViewVideos.length} video{currentViewVideos.length !== 1 ? 's' : ''} scheduled
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Navigation */}
            <CalendarNavigation
              onPrevious={navigatePrevious}
              onNext={navigateNext}
              onToday={navigateToday}
            />

            {/* Big Add Video Button */}
            <Button
              size="lg"
              className="gap-2 px-6"
              onClick={() => setIsDialogOpen(true)}
            >
              <Plus className="h-5 w-5" />
              Add Video
            </Button>
          </div>
        </div>

        {/* View Toggle & Controls */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border">
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('calendar')}
              className="rounded-r-none"
            >
              Calendar View
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              List View
            </Button>
          </div>

          {/* Additional controls */}
          <div className="flex gap-2 ml-auto">
            <Button variant="outline" size="sm" onClick={exportToCSV}>
              Export CSV
            </Button>
            <div>
              <input
                type="file"
                accept=".csv"
                onChange={importFromCSV}
                className="hidden"
                id="csv-import"
              />
              <Button variant="outline" size="sm" asChild>
                <label htmlFor="csv-import" className="cursor-pointer">
                  Import CSV
                </label>
              </Button>
            </div>
          </div>
        </div>

        {/* Main content area */}
        {viewMode === 'calendar' ? (
          <CalendarView
            currentDate={currentDate}
            selectedDate={selectedDate}
            videos={videos}
            onDateSelect={setSelectedDate}
            onMonthChange={setCurrentDate}
            onEditVideo={handleEditVideo}
            onDeleteVideo={handleDeleteVideo}
            onAddVideo={() => setIsDialogOpen(true)}
          />
        ) : (
          <ListView videos={currentViewVideos} />
        )}
      </TabsContent>

      <TabsContent value="stats" className="space-y-6">
        <CalendarAnalytics {...analyticsData} />
      </TabsContent>

      {/* Hidden dialog for adding/editing videos */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingVideo ? 'Edit Video' : 'Add New Video'}
            </DialogTitle>
            <DialogDescription>
              {editingVideo
                ? 'Update your video details and scheduling information.'
                : 'Upload and schedule a new TikTok video.'
              }
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Video</TabsTrigger>
              <TabsTrigger value="details">Video Details</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              <VideoUpload
                uploadedFiles={uploadedFiles}
                onFilesChange={setUploadedFiles}
              />
            </TabsContent>

            <TabsContent value="details" className="space-y-4">
              <VideoForm
                formData={formData}
                onFormDataChange={updateFormField}
                showDateField={viewMode === 'list'}
              />
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitForm}>
              {editingVideo ? 'Update Video' : 'Schedule Video'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Tabs>
  )
}
