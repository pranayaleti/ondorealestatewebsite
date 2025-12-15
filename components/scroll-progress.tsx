"use client"

import { useEffect, useState } from "react"

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      
      // Calculate scrollable distance
      const scrollableHeight = documentHeight - windowHeight
      
      // Calculate progress percentage (0-100)
      const progress = scrollableHeight > 0 
        ? (scrollTop / scrollableHeight) * 100 
        : 0
      
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    // Initial calculation
    handleScroll()

    // Add scroll listener with passive flag for better performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    // Handle resize events to recalculate on content changes
    window.addEventListener("resize", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return (
    <div className="fixed top-16 left-0 right-0 z-40 h-[3px] bg-gray-200 dark:bg-gray-800">
      <div
        className="h-full bg-[#F97316] transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
    </div>
  )
}
