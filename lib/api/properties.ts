import { networkFirstGet } from "@/lib/api/http"
import type { PropertyFilters, PropertySummary } from "@/lib/api/types"

const LAST_VIEWED_KEY = "ondo:last-viewed-properties"
const FAVORITES_KEY = "ondo:favorites"

const FALLBACK_PROPERTIES: PropertySummary[] = [
  {
    id: "prop-001",
    title: "Modern Downtown Apartment",
    location: "Salt Lake City, UT",
    price: 2400,
    bedrooms: 2,
    propertyType: "apartment",
    image: "/favicon.svg",
    lat: 40.7608,
    lng: -111.891,
    description: "Walkable downtown apartment with modern finishes and secure parking.",
  },
  {
    id: "prop-002",
    title: "Family Home in Lehi",
    location: "Lehi, UT",
    price: 3200,
    bedrooms: 4,
    propertyType: "house",
    image: "/favicon.svg",
    lat: 40.3916,
    lng: -111.8508,
    description: "Spacious home with fenced yard and strong school district access.",
  },
  {
    id: "prop-003",
    title: "Townhouse Near Tech Corridor",
    location: "Draper, UT",
    price: 2800,
    bedrooms: 3,
    propertyType: "townhouse",
    image: "/favicon.svg",
    lat: 40.5247,
    lng: -111.8638,
    description: "Contemporary townhouse with garage and quick access to I-15.",
  },
]

function readJsonList<T>(key: string): T[] {
  if (typeof window === "undefined") return []
  const raw = localStorage.getItem(key)
  if (!raw) return []
  try {
    return JSON.parse(raw) as T[]
  } catch {
    return []
  }
}

function writeJsonList<T>(key: string, value: T[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(key, JSON.stringify(value))
}

function applyFilters(data: PropertySummary[], filters?: PropertyFilters): PropertySummary[] {
  if (!filters) return data

  return data.filter((property) => {
    const priceMatch =
      (filters.minPrice === undefined || property.price >= filters.minPrice) &&
      (filters.maxPrice === undefined || property.price <= filters.maxPrice)
    const bedroomMatch = filters.bedrooms === undefined || property.bedrooms >= filters.bedrooms
    const typeMatch =
      !filters.propertyType || filters.propertyType === "any" || property.propertyType === filters.propertyType
    const locationMatch =
      !filters.location ||
      property.location.toLowerCase().includes(filters.location.toLowerCase().trim())

    return priceMatch && bedroomMatch && typeMatch && locationMatch
  })
}

export async function fetchProperties(filters?: PropertyFilters): Promise<PropertySummary[]> {
  try {
    const data = await networkFirstGet<PropertySummary[]>("/api/properties/public", "properties:list")
    return applyFilters(data, filters)
  } catch {
    return applyFilters(FALLBACK_PROPERTIES, filters)
  }
}

export async function fetchPropertyById(propertyId: string): Promise<PropertySummary | null> {
  const properties = await fetchProperties()
  const property = properties.find((item) => item.id === propertyId) ?? null
  if (property) {
    addLastViewedProperty(property)
  }
  return property
}

export function addLastViewedProperty(property: PropertySummary): void {
  const current = readJsonList<PropertySummary>(LAST_VIEWED_KEY).filter((p) => p.id !== property.id)
  const updated = [property, ...current].slice(0, 10)
  writeJsonList(LAST_VIEWED_KEY, updated)
}

export function getLastViewedProperties(): PropertySummary[] {
  return readJsonList<PropertySummary>(LAST_VIEWED_KEY)
}

export function toggleFavoriteProperty(propertyId: string): string[] {
  const favorites = new Set(readJsonList<string>(FAVORITES_KEY))
  if (favorites.has(propertyId)) {
    favorites.delete(propertyId)
  } else {
    favorites.add(propertyId)
  }
  const next = Array.from(favorites)
  writeJsonList(FAVORITES_KEY, next)
  return next
}

export function getFavoritePropertyIds(): string[] {
  return readJsonList<string>(FAVORITES_KEY)
}
