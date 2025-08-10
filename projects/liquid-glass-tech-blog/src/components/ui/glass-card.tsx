"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "subtle" | "medium" | "intense" | "dark"
  interactive?: boolean
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "medium", interactive = false, ...props }, ref) => {
    const variantClasses = {
      subtle: "backdrop-blur-sm bg-white/5 border-white/10",
      medium: "backdrop-blur-md bg-white/10 border-white/20",
      intense: "backdrop-blur-lg bg-white/15 border-white/25",
      dark: "backdrop-blur-md bg-black/20 border-white/10",
    }

    return (
      <Card
        ref={ref}
        className={cn(
          "relative overflow-hidden",
          variantClasses[variant],
          "shadow-xl",
          interactive && "transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:bg-white/15 cursor-pointer",
          className
        )}
        {...props}
      />
    )
  }
)
GlassCard.displayName = "GlassCard"

const GlassCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <CardHeader
      ref={ref}
      className={cn("border-b border-white/10", className)}
      {...props}
    />
  )
)
GlassCardHeader.displayName = "GlassCardHeader"

const GlassCardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <CardTitle
      ref={ref}
      className={cn("text-white", className)}
      {...props}
    />
  )
)
GlassCardTitle.displayName = "GlassCardTitle"

const GlassCardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <CardDescription
      ref={ref}
      className={cn("text-white/70", className)}
      {...props}
    />
  )
)
GlassCardDescription.displayName = "GlassCardDescription"

const GlassCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <CardContent
      ref={ref}
      className={cn("text-white/90", className)}
      {...props}
    />
  )
)
GlassCardContent.displayName = "GlassCardContent"

const GlassCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <CardFooter
      ref={ref}
      className={cn("border-t border-white/10", className)}
      {...props}
    />
  )
)
GlassCardFooter.displayName = "GlassCardFooter"

export {
  GlassCard,
  GlassCardHeader,
  GlassCardFooter,
  GlassCardTitle,
  GlassCardDescription,
  GlassCardContent,
}