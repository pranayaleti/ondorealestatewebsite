import { z } from "zod"

// Contact form validation
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
})

// Lead form validation
export const leadFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter a valid address"),
  city: z.string().min(2, "Please enter a valid city"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
  propertyType: z.string().min(1, "Please select a property type"),
  propertyValue: z.string().min(1, "Please enter property value"),
  source: z.string().min(1, "Please select a source"),
  comments: z.string().optional(),
})

// Maintenance request validation
export const maintenanceRequestSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  priority: z.enum(["low", "medium", "high", "urgent"], {
    required_error: "Please select a priority level",
  }),
  category: z.string().min(1, "Please select a category"),
  preferredDate: z.string().optional(),
  preferredTimeSlot: z.string().optional(),
  entryPermission: z.enum(["yes", "no"], {
    required_error: "Please specify entry permission",
  }),
  petInHome: z.enum(["yes", "no"], {
    required_error: "Please specify if pets are in home",
  }),
})

// Property form validation
export const propertyFormSchema = z.object({
  name: z.string().min(5, "Property name must be at least 5 characters"),
  address: z.string().min(10, "Please enter a complete address"),
  city: z.string().min(2, "Please enter a valid city"),
  state: z.string().min(2, "Please enter a valid state"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
  propertyType: z.enum(["apartment", "house", "condo", "townhouse", "commercial"], {
    required_error: "Please select a property type",
  }),
  bedrooms: z.number().min(0, "Bedrooms must be 0 or more"),
  bathrooms: z.number().min(0, "Bathrooms must be 0 or more"),
  squareFeet: z.number().min(1, "Square feet must be at least 1"),
  rent: z.number().min(0, "Rent must be 0 or more"),
  deposit: z.number().min(0, "Deposit must be 0 or more"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  amenities: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
})

// User profile validation
export const userProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter a valid address"),
  city: z.string().min(2, "Please enter a valid city"),
  state: z.string().min(2, "Please enter a valid state"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
  emergencyContact: z.object({
    name: z.string().min(2, "Emergency contact name must be at least 2 characters"),
    phone: z.string().min(10, "Please enter a valid emergency contact phone number"),
    relationship: z.string().min(2, "Please specify relationship"),
  }),
})

// Login validation
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  role: z.enum(["tenant", "owner", "admin"], {
    required_error: "Please select a role",
  }),
})

// Registration validation
export const registrationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  confirmPassword: z.string(),
  role: z.enum(["tenant", "owner", "admin"], {
    required_error: "Please select a role",
  }),
  termsAccepted: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

// Search validation
export const searchSchema = z.object({
  query: z.string().min(1, "Search query is required"),
  location: z.string().optional(),
  propertyType: z.string().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  bedrooms: z.number().min(0).optional(),
  bathrooms: z.number().min(0).optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type LeadFormData = z.infer<typeof leadFormSchema>
export type MaintenanceRequestData = z.infer<typeof maintenanceRequestSchema>
export type PropertyFormData = z.infer<typeof propertyFormSchema>
export type UserProfileData = z.infer<typeof userProfileSchema>
export type LoginData = z.infer<typeof loginSchema>
export type RegistrationData = z.infer<typeof registrationSchema>
export type SearchData = z.infer<typeof searchSchema>
