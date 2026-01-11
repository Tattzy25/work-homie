"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Filter, Download, Upload } from "lucide-react"

interface AnalyticsHeaderProps {
  title: string
  description: string
  actions?: Array<{
    label: string
    icon: React.ComponentType<any>
    onClick: () => void
    variant?: "default" | "outline" | "secondary"
  }>
}

export function AnalyticsHeader({
  title,
  description,
  actions = [
    { label: "Filters", icon: Filter, onClick: () => {}, variant: "outline" },
    { label: "Export", icon: Download, onClick: () => {}, variant: "outline" },
    { label: "Analyze New", icon: Upload, onClick: () => {} }
  ]
}: AnalyticsHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b pb-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <Badge variant="secondary">Premium Analytics</Badge>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant || "default"}
            size="sm"
            onClick={action.onClick}
          >
            <action.icon className="h-4 w-4 mr-2" />
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
