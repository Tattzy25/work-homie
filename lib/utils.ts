import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Calendar list view tab configuration
export interface CalendarTabConfig {
  value: string
  label: string
  count: number
  filterStatus: string
}

export const CALENDAR_TABS: CalendarTabConfig[] = [
  { value: "all", label: "All", count: 5, filterStatus: "" },
  { value: "ideas", label: "Ideas", count: 2, filterStatus: "Draft" },
  { value: "planned", label: "Planned", count: 1, filterStatus: "In Process" },
  { value: "in-progress", label: "In Progress", count: 1, filterStatus: "Completed" },
]

// Status filter mapping for calendar items
export const STATUS_FILTERS = {
  ideas: "Draft",
  planned: "In Process",
  "in-progress": "Completed",
} as const

export type StatusFilterKey = keyof typeof STATUS_FILTERS
