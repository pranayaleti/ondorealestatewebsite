// Bundle optimization utilities

// Dynamic imports for code splitting
export const dynamicImports = {
  // Calculator components
  calculators: {
    mortgagePayment: () => import("@/pages/calculators/MortgagePaymentCalculator"),
    affordability: () => import("@/pages/calculators/AffordabilityCalculator"),
    income: () => import("@/pages/calculators/IncomeCalculator"),
    closingCost: () => import("@/pages/calculators/ClosingCostCalculator"),
    refinance: () => import("@/pages/calculators/RefinanceCalculator"),
    homeSale: () => import("@/pages/calculators/HomeSaleCalculator"),
    buyingPower: () => import("@/pages/calculators/BuyingPowerCalculator"),
    temporaryBuydown: () => import("@/pages/calculators/TemporaryBuydownCalculator"),
    rentVsOwn: () => import("@/pages/calculators/RentVsOwnCalculator"),
    retirement: () => import("@/pages/calculators/RetirementCalculator"),
  },

  // Dashboard components
  dashboard: {
    overview: () => import("@/components/dashboard/dashboard-overview"),
    recentLeads: () => import("@/components/dashboard/recent-leads"),
    propertyTypeDistribution: () => import("@/components/dashboard/property-type-distribution"),
    propertyValueDistribution: () => import("@/components/dashboard/property-value-distribution"),
    maintenanceRequests: () => import("@/components/dashboard/maintenance-requests"),
  },

  // Owner components
  owner: {
    propertyMaintenance: () => import("@/components/owner/property-maintenance"),
    propertyEditForm: () => import("@/components/owner/property-edit-form"),
    addUnitDialog: () => import("@/components/owner/add-unit-dialog"),
    settingsView: () => import("@/components/owner/settings-view"),
  },

  // Tenant components
  tenant: {
    maintenanceRequestForm: () => import("@/components/tenant/maintenance-request-form"),
    maintenanceRequestDetail: () => import("@/components/tenant/maintenance-request-detail"),
    maintenanceRequestList: () => import("@/components/tenant/maintenance-request-list"),
  },

  // Charts and visualizations
  charts: {
    recharts: () => import("recharts"),
    chartjs: () => import("chart.js"),
  },

  // Heavy libraries
  libraries: {
    html2canvas: () => import("html2canvas"),
    jspdf: () => import("jspdf"),
    dateFns: () => import("date-fns"),
  },
}

// Lazy loading utilities
export const lazyLoading = {
  // Create lazy component with loading fallback
  createLazyComponent: <T extends React.ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>,
    fallback?: React.ComponentType
  ) => {
    const LazyComponent = React.lazy(importFunc)
    
    return (props: React.ComponentProps<T>) => (
      <React.Suspense fallback={fallback ? <fallback /> : <div>Loading...</div>}>
        <LazyComponent {...props} />
      </React.Suspense>
    )
  },

  // Lazy load with intersection observer
  withIntersectionObserver: <T extends React.ComponentType<any>>(
    Component: T,
    options?: IntersectionObserverInit
  ) => {
    return React.forwardRef<HTMLElement, React.ComponentProps<T>>((props, ref) => {
      const [isVisible, setIsVisible] = React.useState(false)
      const elementRef = React.useRef<HTMLElement>(null)

      React.useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true)
              observer.disconnect()
            }
          },
          options
        )

        if (elementRef.current) {
          observer.observe(elementRef.current)
        }

        return () => observer.disconnect()
      }, [])

      return (
        <div ref={elementRef as any}>
          {isVisible ? <Component {...props} ref={ref} /> : <div>Loading...</div>}
        </div>
      )
    })
  },
}

// Bundle analysis utilities
export const bundleAnalysis = {
  // Get bundle size information
  getBundleInfo: () => {
    if (typeof window !== "undefined" && "performance" in window) {
      const resources = performance.getEntriesByType("resource")
      const jsFiles = resources.filter((resource) => resource.name.includes(".js"))
      const cssFiles = resources.filter((resource) => resource.name.includes(".css"))
      
      return {
        jsFiles: jsFiles.length,
        cssFiles: cssFiles.length,
        totalResources: resources.length,
        totalSize: resources.reduce((total, resource) => {
          return total + (resource.transferSize || 0)
        }, 0),
        jsSize: jsFiles.reduce((total, resource) => {
          return total + (resource.transferSize || 0)
        }, 0),
        cssSize: cssFiles.reduce((total, resource) => {
          return total + (resource.transferSize || 0)
        }, 0),
      }
    }
    return null
  },

  // Log bundle information in development
  logBundleInfo: () => {
    if (process.env.NODE_ENV === "development") {
      const info = bundleAnalysis.getBundleInfo()
      if (info) {
        console.log("Bundle Analysis:", {
          "JS Files": info.jsFiles,
          "CSS Files": info.cssFiles,
          "Total Resources": info.totalResources,
          "Total Size": `${(info.totalSize / 1024).toFixed(2)} KB`,
          "JS Size": `${(info.jsSize / 1024).toFixed(2)} KB`,
          "CSS Size": `${(info.cssSize / 1024).toFixed(2)} KB`,
        })
      }
    }
  },
}

// Tree shaking utilities
export const treeShaking = {
  // Import only what you need from libraries
  lodash: {
    // Instead of: import _ from 'lodash'
    // Use: import { debounce, throttle } from 'lodash'
    debounce: () => import("lodash/debounce"),
    throttle: () => import("lodash/throttle"),
    isEmpty: () => import("lodash/isEmpty"),
    isEqual: () => import("lodash/isEqual"),
  },

  // Date utilities
  dateFns: {
    // Instead of: import { format, parseISO } from 'date-fns'
    // Use individual imports
    format: () => import("date-fns/format"),
    parseISO: () => import("date-fns/parseISO"),
    addDays: () => import("date-fns/addDays"),
    subDays: () => import("date-fns/subDays"),
  },

  // React utilities
  react: {
    // Use specific React hooks
    useState: () => import("react").then(m => m.useState),
    useEffect: () => import("react").then(m => m.useEffect),
    useCallback: () => import("react").then(m => m.useCallback),
    useMemo: () => import("react").then(m => m.useMemo),
  },
}

// Preloading utilities
export const preloading = {
  // Preload critical resources
  preloadCritical: () => {
    if (typeof window !== "undefined") {
      // Preload critical images
      const criticalImages = [
        "/modern-office-building.png",
        "/logo.png",
      ]

      criticalImages.forEach(src => {
        const link = document.createElement("link")
        link.rel = "preload"
        link.as = "image"
        link.href = src
        document.head.appendChild(link)
      })

      // Preload critical fonts
      const link = document.createElement("link")
      link.rel = "preload"
      link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
      link.as = "style"
      document.head.appendChild(link)
    }
  },

  // Prefetch next page
  prefetchPage: (href: string) => {
    if (typeof window !== "undefined") {
      const link = document.createElement("link")
      link.rel = "prefetch"
      link.href = href
      document.head.appendChild(link)
    }
  },

  // Prefetch on hover
  prefetchOnHover: (href: string) => {
    if (typeof window !== "undefined") {
      let prefetched = false
      
      return {
        onMouseEnter: () => {
          if (!prefetched) {
            preloading.prefetchPage(href)
            prefetched = true
          }
        },
      }
    }
    return {}
  },
}

// Resource hints
export const resourceHints = {
  // Add DNS prefetch for external domains
  dnsPrefetch: (domain: string) => {
    if (typeof window !== "undefined") {
      const link = document.createElement("link")
      link.rel = "dns-prefetch"
      link.href = `//${domain}`
      document.head.appendChild(link)
    }
  },

  // Add preconnect for external resources
  preconnect: (url: string) => {
    if (typeof window !== "undefined") {
      const link = document.createElement("link")
      link.rel = "preconnect"
      link.href = url
      document.head.appendChild(link)
    }
  },

  // Add module preload for critical modules
  modulePreload: (url: string) => {
    if (typeof window !== "undefined") {
      const link = document.createElement("link")
      link.rel = "modulepreload"
      link.href = url
      document.head.appendChild(link)
    }
  },
}

// Performance monitoring
export const performanceMonitoring = {
  // Measure component render time
  measureRender: <T extends React.ComponentType<any>>(Component: T, name?: string) => {
    return React.forwardRef<HTMLElement, React.ComponentProps<T>>((props, ref) => {
      const startTime = performance.now()
      
      React.useEffect(() => {
        const endTime = performance.now()
        const renderTime = endTime - startTime
        
        if (process.env.NODE_ENV === "development") {
          console.log(`Render time for ${name || Component.displayName || "Component"}: ${renderTime.toFixed(2)}ms`)
        }
      })

      return <Component {...props} ref={ref} />
    })
  },

  // Measure async operations
  measureAsync: async <T>(operation: () => Promise<T>, name: string): Promise<T> => {
    const startTime = performance.now()
    
    try {
      const result = await operation()
      const endTime = performance.now()
      const duration = endTime - startTime
      
      if (process.env.NODE_ENV === "development") {
        console.log(`Async operation ${name} took ${duration.toFixed(2)}ms`)
      }
      
      return result
    } catch (error) {
      const endTime = performance.now()
      const duration = endTime - startTime
      
      console.error(`Async operation ${name} failed after ${duration.toFixed(2)}ms:`, error)
      throw error
    }
  },
}

export default {
  dynamicImports,
  lazyLoading,
  bundleAnalysis,
  treeShaking,
  preloading,
  resourceHints,
  performanceMonitoring,
}
