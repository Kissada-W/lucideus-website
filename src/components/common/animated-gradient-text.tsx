import { cn } from "@/lib/utils"
import { ReactNode } from "react"

export function AnimatedGradientText({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        "bg-linear-to-r from-primary via-foreground to-primary bg-size-[200%_auto] bg-clip-text text-transparent animate-gradient",
        className
      )}
    >
      {children}
    </span>
  )
}
