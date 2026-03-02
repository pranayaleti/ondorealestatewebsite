// Accessibility utilities and helpers

export const accessibility = {
  // Generate unique IDs for form elements
  generateId: (prefix: string = "id") => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
  },

  // ARIA live region announcements
  announceToScreenReader: (message: string, priority: "polite" | "assertive" = "polite") => {
    if (typeof window !== "undefined") {
      const announcement = document.createElement("div")
      announcement.setAttribute("aria-live", priority)
      announcement.setAttribute("aria-atomic", "true")
      announcement.className = "sr-only"
      announcement.textContent = message
      
      document.body.appendChild(announcement)
      
      // Remove after announcement
      setTimeout(() => {
        document.body.removeChild(announcement)
      }, 1000)
    }
  },

  // Focus management
  focus: {
    // Focus first focusable element
    focusFirst: (container: HTMLElement) => {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      if (firstElement) {
        firstElement.focus()
      }
    },

    // Focus last focusable element
    focusLast: (container: HTMLElement) => {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement
      if (lastElement) {
        lastElement.focus()
      }
    },

    // Trap focus within container
    trapFocus: (container: HTMLElement) => {
      const focusableElements = container.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus()
              e.preventDefault()
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus()
              e.preventDefault()
            }
          }
        }
      }

      container.addEventListener("keydown", handleTabKey)
      
      return () => {
        container.removeEventListener("keydown", handleTabKey)
      }
    },
  },

  // Color contrast utilities
  contrast: {
    // Calculate relative luminance
    getLuminance: (r: number, g: number, b: number) => {
      const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
      })
      return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
    },

    // Calculate contrast ratio
    getContrastRatio: (color1: [number, number, number], color2: [number, number, number]) => {
      const lum1 = accessibility.contrast.getLuminance(...color1)
      const lum2 = accessibility.contrast.getLuminance(...color2)
      const brightest = Math.max(lum1, lum2)
      const darkest = Math.min(lum1, lum2)
      return (brightest + 0.05) / (darkest + 0.05)
    },

    // Check if contrast meets WCAG AA standards
    meetsWCAGAA: (color1: [number, number, number], color2: [number, number, number]) => {
      const ratio = accessibility.contrast.getContrastRatio(color1, color2)
      return ratio >= 4.5 // WCAG AA standard for normal text
    },
  },

  // Keyboard navigation utilities
  keyboard: {
    // Handle arrow key navigation for lists
    handleArrowNavigation: (
      event: KeyboardEvent,
      items: HTMLElement[],
      currentIndex: number,
      orientation: "horizontal" | "vertical" = "vertical"
    ) => {
      const isVertical = orientation === "vertical"
      const isHorizontal = orientation === "horizontal"
      
      if (isVertical && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
        event.preventDefault()
        const direction = event.key === "ArrowUp" ? -1 : 1
        const newIndex = Math.max(0, Math.min(items.length - 1, currentIndex + direction))
        items[newIndex]?.focus()
        return newIndex
      }
      
      if (isHorizontal && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
        event.preventDefault()
        const direction = event.key === "ArrowLeft" ? -1 : 1
        const newIndex = Math.max(0, Math.min(items.length - 1, currentIndex + direction))
        items[newIndex]?.focus()
        return newIndex
      }
      
      return currentIndex
    },

    // Handle Enter and Space key activation
    handleActivation: (event: KeyboardEvent, callback: () => void) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        callback()
      }
    },
  },

  // Screen reader utilities
  screenReader: {
    // Hide element from screen readers
    hideFromScreenReader: (element: HTMLElement) => {
      element.setAttribute("aria-hidden", "true")
    },

    // Show element to screen readers
    showToScreenReader: (element: HTMLElement) => {
      element.removeAttribute("aria-hidden")
    },

    // Provide screen reader only text
    createScreenReaderText: (text: string) => {
      const element = document.createElement("span")
      element.className = "sr-only"
      element.textContent = text
      return element
    },
  },
}

// ARIA attributes helpers
export const aria = {
  // Generate ARIA attributes for form fields
  formField: (id: string, label: string, error?: string, description?: string) => ({
    id,
    "aria-label": label,
    "aria-describedby": [description && `${id}-description`, error && `${id}-error`]
      .filter(Boolean)
      .join(" ") || undefined,
    "aria-invalid": !!error,
  }),

  // Generate ARIA attributes for buttons
  button: (label: string, pressed?: boolean, expanded?: boolean) => ({
    "aria-label": label,
    "aria-pressed": pressed,
    "aria-expanded": expanded,
  }),

  // Generate ARIA attributes for modals
  modal: (id: string, _title: string) => ({
    id,
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": `${id}-title`,
    "aria-describedby": `${id}-description`,
  }),
}

export default accessibility
