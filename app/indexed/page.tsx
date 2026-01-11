"use client"

import { useState, useRef, useCallback } from "react"
import {
  useDebounce,
  useThrottle,
  useHover,
  useKeyPress,
  useFullscreen,
  useMouse,
  useScroll,
  useInViewport,
  useEventListener
} from "ahooks"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MetricCard } from "@/components/trend-pilot/metric-card"
import { FeatureCard } from "@/components/trend-pilot/feature-card"
import {
  Scissors,
  Wand2,
  Palette,
  Music,
  Type,
  Smile,
  Zap,
  Video,
  Camera,
  Filter,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Download,
  Share,
  Smartphone,
  Monitor,
  Settings,
  Undo,
  Redo,
  Crop,
  Move,
  ZoomIn,
  ZoomOut,
  Timer,
  Sticker,
  Text,
  AudioWaveform,
  Film,
  Upload,
  CheckCircle
} from "lucide-react"

interface VideoFile {
  file: File
  url: string
  duration: number
  name: string
  size: number
}

interface EditSettings {
  brightness: number
  contrast: number
  saturation: number
  volume: number
  playbackSpeed: number
  filter: string
  textOverlays: TextOverlay[]
  trimStart: number
  trimEnd: number
}

interface TextOverlay {
  id: string
  text: string
  x: number
  y: number
  fontSize: number
  color: string
  style: string
}

interface UserPreferences {
  defaultFilter: string
  autoSave: boolean
  keyboardShortcuts: boolean
}

export default function VideoEditorPro() {
  // User preferences with localStorage using globalThis
  const [userPreferences] = useState<UserPreferences>(() => {
    if (typeof globalThis.window !== 'undefined') {
      const saved = globalThis.localStorage.getItem('video-editor-prefs')
      return saved ? JSON.parse(saved) : {
        defaultFilter: 'none',
        autoSave: true,
        keyboardShortcuts: true
      }
    }
    return {
      defaultFilter: 'none',
      autoSave: true,
      keyboardShortcuts: true
    }
  })

  const [uploadedVideo, setUploadedVideo] = useState<VideoFile | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [exportProgress, setExportProgress] = useState(0)

  const [editSettings, setEditSettings] = useState<EditSettings>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    volume: 100,
    playbackSpeed: 1,
    filter: userPreferences.defaultFilter || 'none',
    textOverlays: [],
    trimStart: 0,
    trimEnd: 0
  })

  const [guidelinesCheck, setGuidelinesCheck] = useState<{
    isChecking: boolean
    violations: string[]
    safe: boolean
    score: number
  }>({
    isChecking: false,
    violations: [],
    safe: true,
    score: 100
  })

  const [searchQuery, setSearchQuery] = useState('')
  const debouncedSearchQuery = useDebounce(searchQuery, { wait: 300 })

  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  // Advanced hooks usage
  const isHovering = useHover(videoContainerRef)
  const mouse = useMouse()
  const scroll = useScroll()
  const [isFullscreen, { enterFullscreen, exitFullscreen, toggleFullscreen }] = useFullscreen(videoContainerRef)

  const [inViewport] = useInViewport(videoContainerRef)

  // Keyboard shortcuts
  useKeyPress('space', (event) => {
    if (userPreferences.keyboardShortcuts) {
      event.preventDefault()
      togglePlayback()
    }
  })

  useKeyPress('f', (event) => {
    if (userPreferences.keyboardShortcuts && event.ctrlKey) {
      event.preventDefault()
      toggleFullscreen()
    }
  })

  // Throttled volume updates for performance
  const throttledVolumeUpdate = useThrottle((newVolume: number) => {
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }, { wait: 100 })

  // Auto-save edit settings
  useEventListener('beforeunload', () => {
    if (userPreferences.autoSave && uploadedVideo) {
      localStorage.setItem('last-edit-session', JSON.stringify(editSettings))
    }
  })

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !file.type.startsWith('video/')) {
      alert('Please select a valid video file')
      return
    }

    const url = URL.createObjectURL(file)
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.onloadedmetadata = () => {
      const videoFile: VideoFile = {
        file,
        url,
        duration: video.duration,
        name: file.name,
        size: file.size
      }
      setUploadedVideo(videoFile)
      setDuration(video.duration)
      setEditSettings(prev => ({ ...prev, trimEnd: video.duration }))
    }
    video.src = url
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('video/')) {
      handleFileUpload({ target: { files: [file] } } as any)
    }
  }, [handleFileUpload])

  const togglePlayback = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleSeek = (newTime: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const applyFilter = (filterName: string) => {
    setEditSettings(prev => ({ ...prev, filter: filterName }))
    if (videoRef.current) {
      videoRef.current.style.filter = getFilterCSS(filterName)
    }
  }

  const getFilterCSS = (filter: string) => {
    const filters = {
      none: 'none',
      vsco: 'sepia(0.3) contrast(1.1) brightness(1.1) saturate(1.3)',
      retro: 'sepia(0.5) hue-rotate(20deg) contrast(1.2)',
      bw: 'grayscale(1)',
      vintage: 'sepia(0.4) contrast(1.3) brightness(0.9)',
      glow: 'brightness(1.2) contrast(1.1) saturate(1.5)',
      cyber: 'hue-rotate(180deg) contrast(1.4) brightness(1.1)'
    }
    return filters[filter as keyof typeof filters] || 'none'
  }

  const addTextOverlay = () => {
    const newText: TextOverlay = {
      id: crypto.randomUUID(),
      text: "YOUR TEXT HERE",
      x: 50,
      y: 50,
      fontSize: 24,
      color: "#ffffff",
      style: "bold"
    }
    setEditSettings(prev => ({
      ...prev,
      textOverlays: [...prev.textOverlays, newText]
    }))
  }

  const updateTextOverlay = (id: string, updates: Partial<TextOverlay>) => {
    setEditSettings(prev => ({
      ...prev,
      textOverlays: prev.textOverlays.map(overlay =>
        overlay.id === id ? { ...overlay, ...updates } : overlay
      )
    }))
  }

  const removeTextOverlay = (id: string) => {
    setEditSettings(prev => ({
      ...prev,
      textOverlays: prev.textOverlays.filter(overlay => overlay.id !== id)
    }))
  }

  const exportVideo = async () => {
    if (!uploadedVideo || !videoRef.current) return

    setIsProcessing(true)
    setExportProgress(0)

    // Simulate export process
    const exportInterval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(exportInterval)
          setIsProcessing(false)
          alert('Video exported successfully!')
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const checkGuidelines = async () => {
    if (!uploadedVideo) return

    setGuidelinesCheck(prev => ({ ...prev, isChecking: true, violations: [], safe: true, score: 100 }))

    // Simulate AI analysis of TikTok guidelines
    setTimeout(() => {
      const violations: string[] = []
      let score = 100

      // Check for potential violations based on content analysis
      // This would normally use AI/ML to analyze video content

      // Random simulation of guideline checks
      const potentialViolations = [
        "Misinformation: Content appears to spread false claims",
        "Hate Speech: Detected potentially harmful language",
        "Dangerous Activity: Shows risky behavior that could harm viewers",
        "Adult Content: Contains mature themes not suitable for all audiences",
        "Copyright: Music may violate intellectual property rights",
        "Harassment: Content could be seen as bullying or harassment",
        "Fake Engagement: Appears to be artificially boosting engagement",
        "Regulated Goods: Promotes items that require special licensing"
      ]

      // Randomly select 0-2 violations for demo
      const numViolations = Math.floor(Math.random() * 3)
      for (let i = 0; i < numViolations; i++) {
        const violation = potentialViolations[Math.floor(Math.random() * potentialViolations.length)]
        if (!violations.includes(violation)) {
          violations.push(violation)
        }
      }

      score = Math.max(0, 100 - (violations.length * 25))

      setGuidelinesCheck({
        isChecking: false,
        violations,
        safe: violations.length === 0,
        score
      })
    }, 2000)
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col bg-linear-to-br from-background via-background to-muted/20">
          <div className="@container/main flex flex-1 flex-col gap-6 py-6 md:gap-8 md:py-8">
            <div className="px-4 lg:px-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Film className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold tracking-tight">Video Editor Pro</h1>
                  <p className="text-muted-foreground mt-1">
                    Snapchat-style video editing with AI-powered effects for Gen Z creators. No boring editing, just viral results.
                  </p>
                </div>
              </div>
            </div>

            {/* Editor Stats */}
            <div className="px-4 lg:px-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard
                  title="Videos Edited"
                  value="247"
                  description="This week"
                  icon={Video}
                  trend="up"
                  trendValue="34"
                />
                <MetricCard
                  title="AI Effects Applied"
                  value="1.2K"
                  description="Auto-enhancements"
                  icon={Sparkles}
                  trend="up"
                  trendValue="89"
                />
                <MetricCard
                  title="Avg. Edit Time"
                  value="2.3m"
                  description="From upload to export"
                  icon={Timer}
                  trend="down"
                  trendValue="0.4m"
                />
                <MetricCard
                  title="Viral Ready"
                  value="94%"
                  description="Export success rate"
                  icon={Zap}
                  trend="up"
                  trendValue="7"
                />
              </div>
            </div>

            {/* Main Editor Interface */}
            <div className="px-4 lg:px-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Video Preview */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Video className="h-5 w-5 text-primary" />
                        Video Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div
                        className="aspect-video bg-linear-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/25 relative overflow-hidden"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >
                        {uploadedVideo ? (
                          <div className="relative w-full h-full">
                            <video
                              ref={videoRef}
                              src={uploadedVideo.url}
                              className="w-full h-full object-cover rounded-lg"
                              onTimeUpdate={handleTimeUpdate}
                              onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
                              style={{ filter: getFilterCSS(editSettings.filter) }}
                              controls={false}
                              muted={false}
                              preload="metadata"
                              aria-label={`Video: ${uploadedVideo.name}`}
                            >
                              <track kind="captions" srcLang="en" label="English captions" />
                            </video>

                            {/* Text Overlays */}
                            {editSettings.textOverlays.map((overlay, index) => (
                              <div
                                key={`${overlay.id}-${index}`}
                                className="absolute text-white font-bold drop-shadow-lg cursor-move"
                                style={{
                                  left: `${overlay.x}%`,
                                  top: `${overlay.y}%`,
                                  fontSize: `${overlay.fontSize}px`,
                                  color: overlay.color,
                                  textShadow: overlay.style === 'bold' ? '2px 2px 4px rgba(0,0,0,0.8)' : 'none'
                                }}
                              >
                                {overlay.text}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center space-y-4">
                            <Video className="h-16 w-16 text-muted-foreground mx-auto" />
                            <div>
                              <p className="text-lg font-medium">Drop your video here</p>
                              <p className="text-sm text-muted-foreground">or click to browse</p>
                            </div>
                            <Button
                              className="gap-2"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <Camera className="h-4 w-4" />
                              Upload Video
                            </Button>
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="video/*"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </div>
                        )}
                      </div>

                      {uploadedVideo && (
                        <>
                          {/* Playback Controls */}
                          <div className="flex items-center justify-between mt-4 p-3 bg-muted/20 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={togglePlayback}
                              >
                                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                              </Button>
                              <span className="text-sm text-muted-foreground">
                                {formatTime(currentTime)} / {formatTime(duration)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Volume2 className="h-4 w-4" />
                              <Slider
                                value={[volume * 100]}
                                onValueChange={(value) => {
                                  const newVolume = value[0] / 100
                                  setVolume(newVolume)
                                  if (videoRef.current) videoRef.current.volume = newVolume
                                }}
                                className="w-20"
                              />
                            </div>
                          </div>

                          {/* Seek Bar */}
                          <div className="mt-2">
                            <Slider
                              value={[currentTime]}
                              max={duration}
                              step={0.1}
                              onValueChange={(value) => handleSeek(value[0])}
                              className="w-full"
                            />
                          </div>

                          {/* Timeline */}
                          <div className="mt-4 p-3 bg-muted/20 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Scissors className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">Timeline</span>
                              <Badge variant="outline" className="text-xs">
                                {uploadedVideo.name}
                              </Badge>
                            </div>
                            <div className="relative h-16 bg-muted rounded-lg overflow-hidden">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-sm text-muted-foreground">Video loaded successfully</p>
                              </div>

                              {/* Trim handles would go here */}
                              <div className="absolute bottom-0 left-0 right-0 h-2 bg-primary/20">
                                <div
                                  className="h-full bg-primary"
                                  style={{ width: `${((currentTime - editSettings.trimStart) / (editSettings.trimEnd - editSettings.trimStart)) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Editing Tools */}
                <div className="space-y-6">
                  <Tabs defaultValue="effects" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-muted/50 border">
                      <TabsTrigger value="effects" className="text-xs">
                        Effects
                      </TabsTrigger>
                      <TabsTrigger value="filters" className="text-xs">
                        Filters
                      </TabsTrigger>
                      <TabsTrigger value="text" className="text-xs">
                        Text
                      </TabsTrigger>
                    </TabsList>

                    {/* Effects Tab */}
                    <TabsContent value="effects" className="mt-4 space-y-4">
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm flex items-center gap-2">
                          <Sparkles className="h-4 w-4" />
                          AI Effects
                        </h4>
                        <div className="grid gap-2">
                          {[
                            { name: "Auto Enhance", desc: "One-click viral boost", icon: Zap },
                            { name: "Color Pop", desc: "Make colors pop for Gen Z", icon: Palette },
                            { name: "Smooth Vibes", desc: "Remove shakiness", icon: Wand2 },
                            { name: "Audio Boost", desc: "Enhance sound quality", icon: Volume2 }
                          ].map((effect) => (
                            <Button key={effect.name} variant="outline" className="justify-start h-auto p-3">
                              <div className="flex items-center gap-3 w-full">
                                <effect.icon className="h-4 w-4 text-primary" />
                                <div className="text-left">
                                  <p className="text-sm font-medium">{effect.name}</p>
                                  <p className="text-xs text-muted-foreground">{effect.desc}</p>
                                </div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-sm flex items-center gap-2">
                          <Smile className="h-4 w-4" />
                          Fun Effects
                        </h4>
                        <div className="grid gap-2">
                          {[
                            { name: "Glitch", emoji: "⚡" },
                            { name: "Rainbow", emoji: "🌈" },
                            { name: "Neon", emoji: "💫" },
                            { name: "Pixelate", emoji: "🎮" }
                          ].map((effect) => (
                            <Button key={effect.name} variant="outline" size="sm" className="justify-center">
                              <span className="mr-2">{effect.emoji}</span>
                              {effect.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    {/* Filters Tab */}
                    <TabsContent value="filters" className="mt-4 space-y-4">
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm flex items-center gap-2">
                          <Filter className="h-4 w-4" />
                          TikTok Filters
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { name: "VSCO", color: "bg-yellow-400" },
                            { name: "Retro", color: "bg-purple-400" },
                            { name: "B&W", color: "bg-gray-400" },
                            { name: "Vintage", color: "bg-orange-400" },
                            { name: "Glow", color: "bg-pink-400" },
                            { name: "Cyber", color: "bg-blue-400" }
                          ].map((filter) => (
                            <Button
                              key={filter.name}
                              variant={editSettings.filter === filter.name.toLowerCase() ? "default" : "outline"}
                              size="sm"
                              className="h-12 flex flex-col items-center justify-center p-2"
                              onClick={() => applyFilter(filter.name.toLowerCase())}
                            >
                              <div className={`w-6 h-6 ${filter.color} rounded mb-1`}></div>
                              <span className="text-xs">{filter.name}</span>
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Intensity</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Subtle</span>
                            <span className="font-medium">70%</span>
                            <span>Extreme</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full">
                            <div className="w-7/10 h-full bg-primary rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Text Tab */}
                    <TabsContent value="text" className="mt-4 space-y-4">
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm flex items-center gap-2">
                          <Type className="h-4 w-4" />
                          Text Styles
                        </h4>
                        <div className="grid gap-2">
                          {[
                            { name: "Bold Impact", style: "font-bold text-lg" },
                            { name: "Neon Glow", style: "text-lg drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" },
                            { name: "Rainbow", style: "text-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent" },
                            { name: "Outline", style: "text-lg text-white drop-shadow-[0_0_4px_rgba(0,0,0,1)]" }
                          ].map((textStyle) => (
                            <Button key={textStyle.name} variant="outline" className="justify-start h-auto p-3">
                              <div className="flex items-center gap-3 w-full">
                                <div className={`flex-1 text-center p-2 rounded ${textStyle.style}`}>
                                  {textStyle.name}
                                </div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-sm">Quick Text</h4>
                        <div className="grid gap-2">
                          {[
                            "POV:",
                            "Real ones know",
                            "No cap",
                            "Slay",
                            "Vibes",
                            "Facts"
                          ].map((text) => (
                            <Button key={text} variant="outline" size="sm">
                              {text}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* TikTok Guidelines Check */}
                  {uploadedVideo && (
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          TikTok Guidelines Check
                        </CardTitle>
                        <CardDescription>
                          AI-powered analysis to ensure your content meets TikTok's community guidelines
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`h-3 w-3 rounded-full ${
                              guidelinesCheck.safe ? 'bg-green-500' : 'bg-red-500'
                            }`} />
                            <span className="text-sm font-medium">
                              {guidelinesCheck.safe ? '✅ Safe to Post' : '⚠️ Review Required'}
                            </span>
                          </div>
                          <Badge variant={guidelinesCheck.safe ? "default" : "destructive"}>
                            {guidelinesCheck.score}% Safe
                          </Badge>
                        </div>

                        {guidelinesCheck.violations.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium text-red-600">Potential Violations:</h5>
                            {guidelinesCheck.violations.map((violation, index) => (
                              <div key={index} className="p-2 bg-red-50 border border-red-200 rounded text-xs text-red-800">
                                {violation}
                              </div>
                            ))}
                          </div>
                        )}

                        <Button
                          onClick={checkGuidelines}
                          disabled={guidelinesCheck.isChecking}
                          className="w-full gap-2"
                          variant={guidelinesCheck.safe ? "outline" : "default"}
                        >
                          {guidelinesCheck.isChecking ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              Check Guidelines
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  )}

                  {/* Export Options */}
                  <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Download className="h-4 w-4 text-primary" />
                        Export Video
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {isProcessing && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Processing...</span>
                            <span>{exportProgress}%</span>
                          </div>
                          <Progress value={exportProgress} className="w-full" />
                        </div>
                      )}

                      <div className="grid gap-2">
                        <Button
                          className="w-full gap-2"
                          onClick={() => exportVideo()}
                          disabled={!uploadedVideo || isProcessing}
                        >
                          <Smartphone className="h-4 w-4" />
                          Export Mobile (9:16)
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full gap-2"
                          onClick={() => exportVideo()}
                          disabled={!uploadedVideo || isProcessing}
                        >
                          <Monitor className="h-4 w-4" />
                          Export Desktop (16:9)
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full gap-2"
                          onClick={() => exportVideo()}
                          disabled={!uploadedVideo || isProcessing}
                        >
                          <Share className="h-4 w-4" />
                          Export & Share
                        </Button>
                      </div>

                      {uploadedVideo && (
                        <div className="text-xs text-muted-foreground text-center">
                          Ready to export: {uploadedVideo.name}
                        </div>
                      )}

                      {!uploadedVideo && (
                        <div className="text-xs text-muted-foreground text-center">
                          Upload a video to start exporting
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Advanced Features */}
            <div className="px-4 lg:px-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <FeatureCard
                  title="One-Tap Viral"
                  description="AI analyzes and applies the perfect effects for maximum engagement"
                  icon={Zap}
                  badge="AI-Powered"
                  action={{
                    label: "Make Viral",
                    onClick: () => console.log("Applying viral effects"),
                    variant: "default"
                  }}
                />
                <FeatureCard
                  title="Trend Match"
                  description="Automatically sync your video with current trending sounds and effects"
                  icon={Music}
                  badge="Real-time"
                  action={{
                    label: "Auto-Sync",
                    onClick: () => console.log("Syncing with trends"),
                    variant: "outline"
                  }}
                />
                <FeatureCard
                  title="Gen Z Presets"
                  description="Pre-built effect combinations that Gen Z creators love"
                  icon={Sparkles}
                  badge="Trending"
                  action={{
                    label: "Browse Presets",
                    onClick: () => console.log("Browsing presets"),
                    variant: "outline"
                  }}
                />
                <FeatureCard
                  title="Instant Share"
                  description="Export and share directly to all platforms in one click"
                  icon={Share}
                  badge="Cross-platform"
                  action={{
                    label: "Share Now",
                    onClick: () => console.log("Sharing to platforms"),
                    variant: "outline"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
