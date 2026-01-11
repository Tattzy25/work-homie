"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarNavigation } from "./calendar-navigation"
import { VideoUpload } from "./video-upload"
import { VideoForm } from "./video-form"
import { Plus, Upload, Download, Grid, List } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"

interface PostFormData {
  title: string
  description: string
  trend: string
  hashtags: string
  optimalTime: string
  scheduledDate: Date
}

interface TikTokVideo {
  id: string
  title: string
  description: string
  trend: string
  hashtags: string[]
  optimalTime: string
  scheduledDate: Date
  expectedEngagement: number
  status: 'draft' | 'scheduled' | 'posted'
  duration: number
}

interface CalendarHeaderProps {
  viewMode: 'calendar' | 'list'
  currentDate: Date
  videosCount: number
  onViewModeChange: (mode: 'calendar' | 'list') => void
  onNavigatePrevious: () => void
  onNavigateNext: () => void
  onNavigateToday: () => void
  onExportCSV: () => void
  onImportCSV: (event: React.ChangeEvent<HTMLInputElement>) => void
  onAddVideo: () => void
  uploadedFiles: File[]
  onFilesChange: (files: File[]) => void
  formData: PostFormData
  onFormDataChange: (field: keyof PostFormData, value: string | Date) => void
  viewModeForForm: 'calendar' | 'list'
  editingVideo: TikTokVideo | null
  onSubmitForm: () => void
  isDialogOpen: boolean
  onDialogChange: (open: boolean) => void
}

export function CalendarHeader({
  viewMode,
  currentDate,
  videosCount,
  onViewModeChange,
  onNavigatePrevious,
  onNavigateNext,
  onNavigateToday,
  onExportCSV,
  onImportCSV,
  onAddVideo,
  uploadedFiles,
  onFilesChange,
  formData,
  onFormDataChange,
  viewModeForForm,
  editingVideo,
  onSubmitForm,
  isDialogOpen,
  onDialogChange
}: CalendarHeaderProps) {
  const currentPeriodDisplay = format(currentDate, 'MMMM yyyy')

  return (
    <>
      {/* Header with controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-2xl">🎥</span>
            Viral Calendar
          </h2>
          <p className="text-muted-foreground">
            Schedule and manage your TikTok content calendar
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View mode toggle */}
          <div className="flex rounded-lg border">
            <Button
              variant={viewMode === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('calendar')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4 mr-2" />
              Calendar
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
          </div>

          {/* Navigation */}
          <CalendarNavigation
            onPrevious={onNavigatePrevious}
            onNext={onNavigateNext}
            onToday={onNavigateToday}
          />

          {/* Import/Export */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onExportCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <div>
              <input
                type="file"
                accept=".csv"
                onChange={onImportCSV}
                className="hidden"
                id="csv-import"
              />
              <Button variant="outline" size="sm" asChild>
                <label htmlFor="csv-import" className="cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Import CSV
                </label>
              </Button>
            </div>
          </div>

          {/* Add video button */}
          <Dialog open={isDialogOpen} onOpenChange={onDialogChange}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Video
              </Button>
            </DialogTrigger>
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
                    onFilesChange={onFilesChange}
                  />
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <VideoForm
                    formData={formData}
                    onFormDataChange={onFormDataChange}
                    showDateField={viewModeForForm === 'list'}
                  />
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <Button variant="outline" onClick={() => onDialogChange(false)}>
                  Cancel
                </Button>
                <Button onClick={onSubmitForm}>
                  {editingVideo ? 'Update Video' : 'Schedule Video'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Current period display */}
      <div className="text-center">
        <h3 className="text-lg font-semibold">
          {currentPeriodDisplay}
        </h3>
        <p className="text-muted-foreground">
          {videosCount} video{videosCount !== 1 ? 's' : ''} scheduled
        </p>
      </div>
    </>
  )
}
