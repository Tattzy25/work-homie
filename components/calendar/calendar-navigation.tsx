"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarNavigationProps {
  onPrevious: () => void
  onNext: () => void
  onToday: () => void
}

export function CalendarNavigation({
  onPrevious,
  onNext,
  onToday
}: CalendarNavigationProps) {
  return (
    <div className="flex items-center gap-1">
      <Button variant="outline" size="sm" onClick={onPrevious}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={onToday}>
        Today
      </Button>
      <Button variant="outline" size="sm" onClick={onNext}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
