"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Calendar,
  Plus,
  Clock,
  TrendingUp,
  Zap,
  Target,
  BarChart3,
  Edit,
  Trash2,
  Play,
  CheckCircle,
  Circle,
  Sparkles,
  Camera,
  Hash
} from "lucide-react"
import { format, addDays, addMonths, subMonths, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isPast } from "date-fns"

interface ContentPost {
  id: string
  title: string
  caption: string
  hashtags: string[]
  scheduledDate: Date
  scheduledTime: string
  status: 'draft' | 'scheduled' | 'posted'
  platform: 'tiktok' | 'instagram' | 'twitter'
  thumbnail?: string
  viralScore: number
}

const MOCK_POSTS: ContentPost[] = [
  {
    id: "1",
    title: "Morning Dance Routine 💃",
    caption: "POV: You wake up and choose violence 💥 Starting my day with moves that hit different! What's your go-to morning motivation? 🌅",
    hashtags: ["#DanceTok", "#MorningVibes", "#ViralDance"],
    scheduledDate: new Date(),
    scheduledTime: "07:00",
    status: 'scheduled',
    platform: 'tiktok',
    viralScore: 87
  },
  {
    id: "2",
    title: "Sustainable Fashion Haul 🛍️",
    caption: "Eco-friendly finds under $50 that actually SLAY 💅 Who knew being sustainable could look this good?",
    hashtags: ["#SustainableLiving", "#EcoFashion", "#BudgetFriendly"],
    scheduledDate: addDays(new Date(), 1),
    scheduledTime: "15:00",
    status: 'draft',
    platform: 'instagram',
    viralScore: 92
  },
  {
    id: "3",
    title: "AI Dance Challenge 🤖",
    caption: "When AI meets dance moves... the future is now! 🔥 Tag a friend who needs this in their life",
    hashtags: ["#DanceChallenge2026", "#AI", "#Viral"],
    scheduledDate: addDays(new Date(), 2),
    scheduledTime: "18:00",
    status: 'scheduled',
    platform: 'tiktok',
    viralScore: 94
  }
]

export function ViralCalendar() {
  const [posts, setPosts] = useState<ContentPost[]>(MOCK_POSTS)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingPost, setEditingPost] = useState<ContentPost | null>(null)
  const [newPost, setNewPost] = useState({
    title: "",
    caption: "",
    hashtags: "",
    scheduledTime: "18:00",
    platform: "tiktok" as 'tiktok' | 'instagram' | 'twitter'
  })

  // Calculate view dates based on mode
  const monthStart = startOfMonth(selectedDate)
  const monthEnd = endOfMonth(selectedDate)
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 })

  const currentViewStart = viewMode === 'month' ? monthStart : weekStart
  const currentViewEnd = viewMode === 'month' ? monthEnd : weekEnd

  // Generate days for current view
  const viewDays = viewMode === 'month'
    ? eachDayOfInterval({ start: monthStart, end: monthEnd })
    : eachDayOfInterval({ start: weekStart, end: weekEnd })

  const postsForView = posts.filter(post =>
    post.scheduledDate >= currentViewStart && post.scheduledDate <= currentViewEnd
  )

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.caption.trim()) return

    const post: ContentPost = {
      id: crypto.randomUUID(),
      title: newPost.title,
      caption: newPost.caption,
      hashtags: newPost.hashtags.split(',').map(tag => tag.trim()).filter(Boolean),
      scheduledDate: selectedDate,
      scheduledTime: newPost.scheduledTime,
      status: 'draft',
      platform: newPost.platform,
      viralScore: Math.floor(Math.random() * 30) + 70
    }

    setPosts(prev => [...prev, post])
    setNewPost({ title: "", caption: "", hashtags: "", scheduledTime: "18:00", platform: "tiktok" })
    setShowCreateModal(false)
  }

  const handleEditPost = (post: ContentPost) => {
    setEditingPost(post)
    setNewPost({
      title: post.title,
      caption: post.caption,
      hashtags: post.hashtags.join(', '),
      scheduledTime: post.scheduledTime,
      platform: post.platform
    })
    setShowCreateModal(true)
  }

  const handleUpdatePost = () => {
    if (!editingPost) return

    setPosts(prev => prev.map(post =>
      post.id === editingPost.id
        ? {
            ...post,
            title: newPost.title,
            caption: newPost.caption,
            hashtags: newPost.hashtags.split(',').map(tag => tag.trim()).filter(Boolean),
            scheduledTime: newPost.scheduledTime,
            platform: newPost.platform
          }
        : post
    ))

    setEditingPost(null)
    setNewPost({ title: "", caption: "", hashtags: "", scheduledTime: "18:00", platform: "tiktok" })
    setShowCreateModal(false)
  }

  const handleDeletePost = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId))
  }

  const navigatePrevious = () => {
    setSelectedDate(prev => viewMode === 'month' ? subMonths(prev, 1) : subMonths(prev, 0))
  }

  const navigateNext = () => {
    setSelectedDate(prev => viewMode === 'month' ? addMonths(prev, 1) : addMonths(prev, 0))
  }

  const togglePostStatus = (postId: string) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? { ...post, status: post.status === 'scheduled' ? 'draft' : 'scheduled' }
        : post
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <Calendar className="h-8 w-8 text-primary" />
            Content Calendar
          </h2>
          <p className="text-muted-foreground mt-1">
            Schedule your viral content like a pro 📅
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex rounded-lg border">
            <Button
              variant={viewMode === 'month' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('month')}
              className="rounded-r-none"
            >
              Month
            </Button>
            <Button
              variant={viewMode === 'week' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('week')}
              className="rounded-l-none"
            >
              Week
            </Button>
          </div>
          <Button
            size="lg"
            className="gap-2 px-6"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus className="h-5 w-5" />
            New Post
          </Button>
        </div>
      </div>

      {/* Calendar View */}
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">
              {viewMode === 'month'
                ? format(monthStart, 'MMMM yyyy')
                : `${format(currentViewStart, 'MMM d')} - ${format(currentViewEnd, 'MMM d, yyyy')}`
              }
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={navigatePrevious}>
                ‹ Prev
              </Button>
              <Button variant="outline" size="sm" onClick={navigateNext}>
                Next ›
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className={`grid gap-4 ${viewMode === 'month' ? 'grid-cols-7' : 'grid-cols-7'}`}>
            {viewDays.map((day) => {
              const dayPosts = postsForView.filter(post => isSameDay(post.scheduledDate, day))
              const isSelected = isSameDay(day, selectedDate)

              return (
                <div
                  key={day.toISOString()}
                  className={`${
                    viewMode === 'month' ? 'min-h-[100px]' : 'min-h-[120px]'
                  } p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : isToday(day)
                      ? 'border-orange-300 bg-orange-50'
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className="text-sm font-medium mb-2">
                    {format(day, 'EEE')}
                  </div>
                  <div className={`text-lg font-bold ${isPast(day) && !isToday(day) ? 'text-muted-foreground' : ''}`}>
                    {format(day, 'd')}
                  </div>
                  <div className="mt-2 space-y-1">
                    {dayPosts.map((post) => (
                      <div
                        key={post.id}
                        className={`text-xs p-1 rounded truncate ${
                          post.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          post.status === 'posted' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                        title={post.title}
                      >
                        {post.title}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <div className="grid gap-4">
        <h3 className="text-xl font-semibold">Scheduled Posts</h3>
        {postsForView.length === 0 ? (
          <Card className="border-dashed border-border/50 bg-muted/20">
            <CardContent className="py-16 text-center">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No posts scheduled</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Click "New Post" to schedule your first viral content! 🚀
              </p>
            </CardContent>
          </Card>
        ) : (
          postsForView
            .sort((a: ContentPost, b: ContentPost) => a.scheduledDate.getTime() - b.scheduledDate.getTime())
            .map((post: ContentPost) => (
              <Card key={post.id} className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.thumbnail} />
                          <AvatarFallback>
                            {post.platform === 'tiktok' ? '🎵' :
                             post.platform === 'instagram' ? '📸' : '🐦'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-lg">{post.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {format(post.scheduledDate, 'MMM d')} at {post.scheduledTime}
                            <Badge variant="outline" className="text-xs">
                              {post.platform}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-3 leading-relaxed">
                        {post.caption}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.hashtags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4 text-orange-500" />
                          <span className="font-medium">{post.viralScore}% viral potential</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => togglePostStatus(post.id)}
                        className="gap-2"
                      >
                        {post.status === 'scheduled' ? <CheckCircle className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                        {post.status === 'scheduled' ? 'Scheduled' : 'Draft'}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditPost(post)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
        )}
      </div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader>
              <CardTitle>
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </CardTitle>
              <CardDescription>
                Schedule your content for maximum viral potential 📈
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Post Title</label>
                  <Input
                    placeholder="e.g., Morning Dance Challenge"
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Platform</label>
                  <Select
                    value={newPost.platform}
                    onValueChange={(value: any) => setNewPost(prev => ({ ...prev, platform: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tiktok">🎵 TikTok</SelectItem>
                      <SelectItem value="instagram">📸 Instagram</SelectItem>
                      <SelectItem value="twitter">🐦 Twitter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Caption</label>
                <Textarea
                  placeholder="Write something that will make people stop scrolling..."
                  rows={4}
                  value={newPost.caption}
                  onChange={(e) => setNewPost(prev => ({ ...prev, caption: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Hashtags</label>
                <Input
                  placeholder="#DanceTok #Viral #GenZ"
                  value={newPost.hashtags}
                  onChange={(e) => setNewPost(prev => ({ ...prev, hashtags: e.target.value }))}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Input
                    type="date"
                    value={format(selectedDate, 'yyyy-MM-dd')}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Time</label>
                  <Input
                    type="time"
                    value={newPost.scheduledTime}
                    onChange={(e) => setNewPost(prev => ({ ...prev, scheduledTime: e.target.value }))}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 bg-primary/5 rounded-lg">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">
                  AI predicts {Math.floor(Math.random() * 30) + 70}% viral potential for this post! 🚀
                </span>
              </div>
            </CardContent>
            <div className="flex justify-end gap-3 p-6 pt-0">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button onClick={editingPost ? handleUpdatePost : handleCreatePost}>
                {editingPost ? 'Update Post' : 'Schedule Post'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
