"use client"

import { useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileVideo, Video, X } from "lucide-react"
import { toast } from "sonner"

interface VideoUploadProps {
  uploadedFiles: File[]
  onFilesChange: (files: File[]) => void
}

export function VideoUpload({ uploadedFiles, onFilesChange }: VideoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 0) {
      onFilesChange([...uploadedFiles, ...files])
      toast.success(`Uploaded ${files.length} file(s)`)
    }
  }, [uploadedFiles, onFilesChange])

  const removeFile = useCallback((index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    onFilesChange(newFiles)
  }, [uploadedFiles, onFilesChange])

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-lg font-medium mb-2">
          Upload your TikTok videos
        </p>
        <p className="text-muted-foreground mb-4">
          Select multiple video files (MP4, MOV, AVI, WebM)
        </p>
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
        >
          Choose Files
        </Button>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Uploaded Files:</h4>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center gap-2 p-2 border rounded">
              <FileVideo className="h-4 w-4" />
              <span className="flex-1 text-sm">{file.name}</span>
              <Badge variant="secondary">{(file.size / 1024 / 1024).toFixed(1)}MB</Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
