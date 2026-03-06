"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

/** Event fired when the PWA is deemed installable (Chrome/Edge, etc.). */
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<{ outcome: "accepted" | "dismissed" }>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

type PwaInstallContextValue = {
  /** True when beforeinstallprompt has fired and app is not already installed. */
  isInstallable: boolean
  /** Call to show the native install prompt (must be from a user gesture). */
  triggerInstall: () => Promise<void>
}

const PwaInstallContext = createContext<PwaInstallContextValue | null>(null)

function isStandalone(): boolean {
  if (typeof window === "undefined") return false
  const nav = window.navigator as Navigator & { standalone?: boolean }
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (nav.standalone === true) ||
    (document.referrer.includes("android-app://") ?? false)
  )
}

export function PwaInstallProvider({ children }: { children: ReactNode }) {
  const [installPromptEvent, setInstallPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    setInstalled(isStandalone())

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPromptEvent(e as BeforeInstallPromptEvent)
    }

    const handleAppInstalled = () => {
      setInstallPromptEvent(null)
      setInstalled(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  const triggerInstall = useCallback(async () => {
    if (!installPromptEvent) return
    try {
      await installPromptEvent.prompt()
      const { outcome } = await installPromptEvent.userChoice
      if (outcome === "accepted") setInstallPromptEvent(null)
    } catch {
      // User dismissed or prompt failed
    }
  }, [installPromptEvent])

  const value = useMemo<PwaInstallContextValue>(
    () => ({
      isInstallable: Boolean(installPromptEvent) && !installed,
      triggerInstall,
    }),
    [installPromptEvent, installed, triggerInstall],
  )

  return (
    <PwaInstallContext.Provider value={value}>
      {children}
    </PwaInstallContext.Provider>
  )
}

export function usePwaInstall(): PwaInstallContextValue | null {
  return useContext(PwaInstallContext)
}
