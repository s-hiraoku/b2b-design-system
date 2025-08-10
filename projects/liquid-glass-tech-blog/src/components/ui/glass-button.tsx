"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const glassButtonVariants = cva(
  "relative overflow-hidden backdrop-blur-md border border-white/20 transition-all duration-300 hover:backdrop-blur-lg hover:border-white/30 hover:shadow-lg",
  {
    variants: {
      variant: {
        default: "bg-white/10 text-white hover:bg-white/20",
        destructive: "bg-red-500/10 text-red-100 hover:bg-red-500/20 border-red-300/20",
        outline: "bg-transparent hover:bg-white/10",
        secondary: "bg-purple-500/10 text-purple-100 hover:bg-purple-500/20 border-purple-300/20",
        ghost: "bg-transparent hover:bg-white/5 border-transparent",
        link: "bg-transparent underline-offset-4 hover:underline border-transparent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {
  asChild?: boolean
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <Button
        className={cn(glassButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
GlassButton.displayName = "GlassButton"

export { GlassButton, glassButtonVariants }