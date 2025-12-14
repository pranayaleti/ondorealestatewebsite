/**
 * Shared TypeScript interfaces and types for the application
 */

// User types
export interface User {
  id: string
  name: string
  email: string
  role: 'tenant' | 'owner' | 'admin'
  avatar?: string
  token?: string
}

export interface AuthUser extends User {
  token: string
}

// Property types
export interface Property {
  id: number
  title: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  type: string
  image: string
  description: string
  features: string[]
  availability?: string
  leaseTerms?: string
  services?: string[]
  fees?: string
  rating?: number
  reviewCount?: number
  phone?: string
  website?: string
  logo?: string
  specialties?: string[]
  valueRanges?: string[]
  images?: string[]
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface LoginResponse {
  token: string
  user: User
  expiresIn?: number
}

export interface SearchResponse {
  properties: Property[]
  totalCount: number
  hasMore: boolean
}

// Form types
export interface SearchFormData {
  zipCode: string
  city?: string
}

export interface ConsultationFormData {
  name: string
  email: string
  phone: string
  service: string
  message?: string
  preferredTime?: string
}

export interface AuthFormData {
  email: string
  password: string
  role: 'tenant' | 'owner' | 'admin'
}

// Component prop types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface LoadingState {
  isLoading: boolean
  error?: string | null
}

// SEO types
export interface SEOData {
  title: string
  description: string
  pathname?: string
  image?: string
  keywords?: string[]
  jsonLd?: object | object[]
}

// Theme types
export type Theme = 'light' | 'dark' | 'system'

// Navigation types
export interface NavigationItem {
  href: string
  label: string
  special?: boolean
  external?: boolean
}

// Modal types
export interface ModalProps extends BaseComponentProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: any
}

// Validation types
export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export interface FieldValidation {
  field: string
  isValid: boolean
  message?: string
}