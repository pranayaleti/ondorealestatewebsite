export interface PropertySummary {
  id: string
  title: string
  location: string
  price: number
  bedrooms: number
  propertyType: "apartment" | "house" | "townhouse" | "condo" | "studio"
  image: string
  lat: number
  lng: number
  description: string
}

export interface PropertyFilters {
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
  propertyType?: PropertySummary["propertyType"] | "any"
  location?: string
}

export interface PropertyInquiryPayload {
  propertyId: string
  fullName: string
  email: string
  phone?: string
  message: string
  submittedAt?: string
}

export interface MaintenanceRequestPayload {
  leaseId: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  submittedAt?: string
}
