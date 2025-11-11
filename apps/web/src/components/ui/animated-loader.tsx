"use client"

import Lottie from "lottie-react"
import catMarkLoading from "@/public/cat Mark loading.json"
import { cn } from "@/lib/utils"

type AnimatedLoaderProps = {
  className?: string
  loop?: boolean
  autoplay?: boolean
}

export function AnimatedLoader({
  className,
  loop = true,
  autoplay = true,
}: AnimatedLoaderProps) {
  return (
    <div className={cn("flex w-full items-center justify-center", className)}>
      <Lottie
        animationData={catMarkLoading}
        loop={loop}
        autoplay={autoplay}
        className="h-48 w-48 max-w-xs"
      />
    </div>
  )
}

