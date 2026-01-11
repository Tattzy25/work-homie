"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon?: LucideIcon
  badge?: string
  action?: {
    label: string
    onClick: () => void
    variant?: "default" | "secondary" | "outline"
  }
  children?: React.ReactNode
  className?: string
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  badge,
  action,
  children,
  className = ""
}: FeatureCardProps) {
  return (
    <Card className={`border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="h-5 w-5 text-primary" />
              </div>
            )}
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              {badge && (
                <Badge variant="secondary" className="mt-1">
                  {badge}
                </Badge>
              )}
            </div>
          </div>
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
        {action && (
          <Button
            onClick={action.onClick}
            variant={action.variant || "default"}
            className="w-full"
          >
            {action.label}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
