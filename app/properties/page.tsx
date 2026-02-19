// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Building, Home, Search, ArrowUpDown } from "lucide-react"
// import Image from "next/image"
// import { PropertyDetailsModal } from "@/components/property-details-modal"
// import { PropertyFilter, type PropertyFilters } from "@/components/property-filter"
// import { PropertySearch } from "@/components/property-search"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Footer } from "@/components/footer"
// import SEO from "@/components/seo"
// import { generateBreadcrumbJsonLd } from "@/lib/seo"
// import { SITE_URL } from "@/lib/site"

// // Mock property data
// const allProperties = [
//   {
//     id: 201,
//     title: "Modern Apartment",
//     address: "Downtown, Salt Lake City",
//     price: 1850,
//     bedrooms: 2,
//     bathrooms: 2,
//     sqft: 950,
//     type: "apartment",
//     image: "/modern-apartment-balcony.png",
//     logo: "/placeholder.svg?height=80&width=80",
//     rating: 4.8,
//     reviewCount: 24,
//     phone: "(801) 555-1234",
//     specialties: ["apartment", "downtown"],
//     description: "Luxury apartment with balcony and city views, pet-friendly with modern amenities.",
//     valueRanges: ["300k-500k"],
//     images: [
//       "/modern-apartment-balcony.png",
//       "/placeholder.svg?height=600&width=800",
//       "/placeholder.svg?height=600&width=800",
//     ],
//     leaseTerms: "12-month minimum lease term with option to renew. $50 application fee per adult.",
//     services: ["24/7 maintenance", "Package receiving", "Online rent payment", "Fitness center", "Rooftop lounge"],
//     fees: "Management fee: 8% of monthly rent. Leasing fee: 50% of first month's rent.",
//     availability: "Immediate",
//     website: "www.downtownapartments.com",
//     amenities: ["In-unit Laundry", "Fitness Center", "Pet Friendly", "Balcony"],
//     dateAdded: new Date("2023-04-15"),
//   },
//   {
//     id: 202,
//     title: "Suburban House",
//     address: "Holladay, UT",
//     price: 2400,
//     bedrooms: 4,
//     bathrooms: 2.5,
//     sqft: 2200,
//     type: "house",
//     image: "/suburban-house-garden.png",
//     logo: "/placeholder.svg?height=80&width=80",
//     rating: 4.6,
//     reviewCount: 18,
//     phone: "(801) 555-5678",
//     specialties: ["single-family", "suburban"],
//     description: "Spacious family home with fenced backyard, finished basement, and 2-car garage.",
//     valueRanges: ["500k-750k"],
//     images: [
//       "/suburban-house-garden.png",
//       "/placeholder.svg?height=600&width=800",
//       "/placeholder.svg?height=600&width=800",
//     ],
//     leaseTerms: "12-month lease. $45 application fee per adult. Security deposit equal to one month's rent.",
//     services: ["Lawn maintenance", "Snow removal", "Pest control", "Annual HVAC service", "24/7 emergency support"],
//     fees: "Management fee: 7% of monthly rent. Leasing fee: 75% of first month's rent.",
//     availability: "Available in 30 days",
//     website: "www.familyhomerentals.com",
//     amenities: ["Parking", "Hardwood Floors", "Air Conditioning", "Dishwasher"],
//     dateAdded: new Date("2023-05-20"),
//   },
//   {
//     id: 203,
//     title: "Modern Townhouse",
//     address: "Midvale, UT",
//     price: 1950,
//     bedrooms: 3,
//     bathrooms: 2.5,
//     sqft: 1800,
//     type: "townhouse",
//     image: "/modern-townhouse-garage.png",
//     logo: "/placeholder.svg?height=80&width=80",
//     rating: 4.7,
//     reviewCount: 15,
//     phone: "(801) 555-9012",
//     specialties: ["townhouse", "modern"],
//     description: "Contemporary townhouse with attached garage, open floor plan, and community pool access.",
//     valueRanges: ["300k-500k"],
//     images: [
//       "/modern-townhouse-garage.png",
//       "/placeholder.svg?height=600&width=800",
//       "/placeholder.svg?height=600&width=800",
//     ],
//     leaseTerms: "6 or 12-month lease terms. $40 application fee. Security deposit equal to one month's rent.",
//     services: ["Community pool maintenance", "Exterior maintenance", "Trash removal", "Snow removal", "HOA management"],
//     fees: "Management fee: 8% of monthly rent. Leasing fee: 50% of first month's rent.",
//     availability: "Immediate",
//     website: "www.moderntownhomes.com",
//     amenities: ["Pool", "Parking", "Pet Friendly", "Dishwasher"],
//     dateAdded: new Date("2023-06-10"),
//   },
//   {
//     id: 204,
//     title: "Luxury Condo",
//     address: "Downtown, Salt Lake City",
//     price: 2800,
//     bedrooms: 2,
//     bathrooms: 2,
//     sqft: 1400,
//     type: "condo",
//     image: "/placeholder.svg?height=600&width=800",
//     logo: "/placeholder.svg?height=80&width=80",
//     rating: 4.9,
//     reviewCount: 22,
//     phone: "(801) 555-3456",
//     specialties: ["luxury", "downtown"],
//     description: "Upscale condo with panoramic city views, high-end finishes, and building amenities.",
//     valueRanges: ["750k-1m"],
//     images: [
//       "/placeholder.svg?height=600&width=800",
//       "/placeholder.svg?height=600&width=800",
//       "/placeholder.svg?height=600&width=800",
//     ],
//     leaseTerms: "12-month lease. $75 application fee. Security deposit equal to one month's rent plus $500.",
//     services: ["Concierge", "Valet parking", "Package receiving", "Fitness center", "Rooftop lounge"],
//     fees: "Management fee: 10% of monthly rent. Leasing fee: One month's rent.",
//     availability: "Available in 15 days",
//     website: "www.luxurycondos.com",
//     amenities: ["Fitness Center", "Pool", "Balcony", "Furnished", "Air Conditioning"],
//     dateAdded: new Date("2023-06-25"),
//   },
//   {
//     id: 205,
//     title: "Cozy Studio",
//     address: "Sugar House, Salt Lake City",
//     price: 1100,
//     bedrooms: 0,
//     bathrooms: 1,
//     sqft: 550,
//     type: "studio",
//     image: "/placeholder.svg?height=600&width=800",
//     logo: "/placeholder.svg?height=80&width=80",
//     rating: 4.5,
//     reviewCount: 12,
//     phone: "(801) 555-7890",
//     specialties: ["studio", "affordable"],
//     description: "Charming studio apartment in trendy Sugar House neighborhood with great amenities.",
//     valueRanges: ["under-300k"],
//     images: [
//       "/placeholder.svg?height=600&width=800",
//       "/placeholder.svg?height=600&width=800",
//       "/placeholder.svg?height=600&width=800",
//     ],
//     leaseTerms: "6 or 12-month lease. $35 application fee. Security deposit equal to one month's rent.",
//     services: ["Laundry facilities", "Bike storage", "Package receiving", "On-site management", "Utilities included"],
//     fees: "Management fee: 8% of monthly rent. Leasing fee: 50% of first month's rent.",
//     availability: "Immediate",
//     website: "www.sugarhouseliving.com",
//     amenities: ["Pet Friendly", "Furnished", "Air Conditioning"],
//     dateAdded: new Date("2023-07-05"),
//   },
//   {
//     id: 206,
//     title: "Family Home with Yard",
//     address: "Murray, UT",
//     price: 2200,
//     bedrooms: 3,
//     bathrooms: 2,
//     sqft: 1900,
//     type: "house",
//     image: "/placeholder.svg?height=600&width=800",
//     logo: "/placeholder.svg?height=80&width=80",
//     rating: 4.7,
//     reviewCount: 14,
//     phone: "(801) 555-2345",
//     specialties: ["single-family", "yard"],
//     description: "Comfortable family home with large fenced yard, updated kitchen, and finished basement.",
//     valueRanges: ["300k-500k"],
//     images: [
//       "/placeholder.svg?height=600&width=800",
//       "/placeholder.svg?height=600&width=800",
//       "/placeholder.svg?height=600&width=800",
//     ],
//     leaseTerms: "12-month lease. $45 application fee per adult. Security deposit equal to one month's rent.",
//     services: ["Lawn care", "Snow removal", "Pest control", "HVAC maintenance", "24/7 emergency support"],
//     fees: "Management fee: 7% of monthly rent. Leasing fee: 75% of first month's rent.",
//     availability: "Available in 45 days",
//     website: "www.murrayhomes.com",
//     amenities: ["Parking", "Dishwasher", "Hardwood Floors", "Air Conditioning"],
//     dateAdded: new Date("2023-07-15"),
//   },
// ]

// type SortOption = "newest" | "price-low" | "price-high" | "bedrooms" | "bathrooms" | "sqft"

// export default function PropertiesPage() {
//   const [selectedProperty, setSelectedProperty] = useState<number | null>(null)
//   const [properties, setProperties] = useState(allProperties)
//   const [filters, setFilters] = useState<PropertyFilters>({
//     priceRange: [500, 5000],
//     bedrooms: "any",
//     bathrooms: "any",
//     propertyType: "any",
//     amenities: [],
//   })
//   const [sortBy, setSortBy] = useState<SortOption>("newest")
//   const [searchQuery, setSearchQuery] = useState("")

//   const handleViewDetails = (propertyId: number) => {
//     setSelectedProperty(propertyId)
//   }

//   const handleFilterChange = (newFilters: PropertyFilters) => {
//     setFilters(newFilters)
//   }

//   const handleSearch = (query: string) => {
//     setSearchQuery(query)
//   }

//   // Apply filters and sorting
//   useEffect(() => {
//     let filteredProperties = [...allProperties]

//     // Apply price filter
//     filteredProperties = filteredProperties.filter(
//       (property) => property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1],
//     )

//     // Apply bedroom filter
//     if (filters.bedrooms !== "any") {
//       if (filters.bedrooms === "studio") {
//         filteredProperties = filteredProperties.filter((property) => property.bedrooms === 0)
//       } else if (filters.bedrooms === "4+") {
//         filteredProperties = filteredProperties.filter((property) => property.bedrooms >= 4)
//       } else {
//         filteredProperties = filteredProperties.filter(
//           (property) => property.bedrooms === Number.parseInt(filters.bedrooms),
//         )
//       }
//     }

//     // Apply bathroom filter
//     if (filters.bathrooms !== "any") {
//       if (filters.bathrooms === "3+") {
//         filteredProperties = filteredProperties.filter((property) => property.bathrooms >= 3)
//       } else {
//         filteredProperties = filteredProperties.filter(
//           (property) => property.bathrooms === Number.parseFloat(filters.bathrooms),
//         )
//       }
//     }

//     // Apply property type filter
//     if (filters.propertyType !== "any") {
//       filteredProperties = filteredProperties.filter((property) => property.type === filters.propertyType)
//     }

//     // Apply amenities filter
//     if (filters.amenities.length > 0) {
//       filteredProperties = filteredProperties.filter((property) =>
//         filters.amenities.every((amenity) => property.amenities.includes(amenity)),
//       )
//     }

//     // Apply search query
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase()
//       filteredProperties = filteredProperties.filter(
//         (property) =>
//           property.title.toLowerCase().includes(query) ||
//           property.address.toLowerCase().includes(query) ||
//           property.description.toLowerCase().includes(query),
//       )
//     }

//     // Apply sorting
//     switch (sortBy) {
//       case "newest":
//         filteredProperties.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime())
//         break
//       case "price-low":
//         filteredProperties.sort((a, b) => a.price - b.price)
//         break
//       case "price-high":
//         filteredProperties.sort((a, b) => b.price - a.price)
//         break
//       case "bedrooms":
//         filteredProperties.sort((a, b) => b.bedrooms - a.bedrooms)
//         break
//       case "bathrooms":
//         filteredProperties.sort((a, b) => b.bathrooms - a.bathrooms)
//         break
//       case "sqft":
//         filteredProperties.sort((a, b) => b.sqft - a.sqft)
//         break
//     }

//     setProperties(filteredProperties)
//   }, [filters, sortBy, searchQuery])

//   const selectedPropertyData = selectedProperty ? properties.find((property) => property.id === selectedProperty) : null

//   return (
//     <div className="flex flex-col min-h-screen">
//       <SEO
//         title="Browse Rental Properties in Utah"
//         description="Explore available rental homes, apartments, condos, and townhouses managed by Ondo Real Estate across Utah."
//         pathname="/properties"
//         image={`${SITE_URL}/modern-apartment-balcony.png`}
//         jsonLd={generateBreadcrumbJsonLd([
//           { name: "Home", url: SITE_URL },
//           { name: "Properties", url: `${SITE_URL}/properties` },
//         ])}
//       />
//       {/* Banner with search field */}
//       <section className="relative">
//         <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-black/90 z-10" />
//         <div className="relative h-[400px] overflow-hidden">
//           <Image
//             src="/modern-apartment-balcony.png"
//             alt="Modern apartment building representing Utah rental properties available through Ondo Real Estate"
//             fill
//             className="object-cover"
//             priority
//             title="Utah Rental Properties - Ondo Real Estate"
//             aria-label="Modern apartment building representing Utah rental properties available through Ondo Real Estate"
//           />
//         </div>
//         <div className="absolute inset-0 flex items-center justify-center z-20">
//           <div className="container px-4 md:px-6 mx-auto">
//             <div className="max-w-3xl mx-auto text-center">
//               <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Find Your Perfect Home</h1>
//               <p className="text-xl text-foreground/90 mb-8">
//                 Browse our curated selection of quality rental properties managed by Ondo Real Estate
//               </p>
//               <div className="flex justify-center">
//                 <PropertySearch onSearch={handleSearch} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <main className="flex-1">
//         <section className="w-full py-12 md:py-24">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//               <div>
//                 <h2 className="text-3xl font-bold tracking-tight">Available Properties</h2>
//                 <p className="text-foreground/70 mt-2">{properties.length} properties available for rent</p>
//               </div>
//               <div className="flex gap-2">
//                 <PropertyFilter onFilterChange={handleFilterChange} initialFilters={filters} />

//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <Button variant="outline">
//                       <ArrowUpDown className="mr-2 h-4 w-4" />
//                       Sort by:{" "}
//                       <span className="font-medium ml-1">
//                         {sortBy === "newest"
//                           ? "Newest"
//                           : sortBy === "price-low"
//                             ? "Price (Low to High)"
//                             : sortBy === "price-high"
//                               ? "Price (High to Low)"
//                               : sortBy === "bedrooms"
//                                 ? "Bedrooms"
//                                 : sortBy === "bathrooms"
//                                   ? "Bathrooms"
//                                   : "Square Feet"}
//                       </span>
//                     </Button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end">
//                     <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest</DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => setSortBy("price-low")}>Price (Low to High)</DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => setSortBy("price-high")}>Price (High to Low)</DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => setSortBy("bedrooms")}>Bedrooms</DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => setSortBy("bathrooms")}>Bathrooms</DropdownMenuItem>
//                     <DropdownMenuItem onClick={() => setSortBy("sqft")}>Square Feet</DropdownMenuItem>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               </div>
//             </div>

//             {properties.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {properties.map((property) => (
//                   <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
//                     <div className="relative aspect-video">
//                       <Image
//                         src={property.image || "/placeholder.svg"}
//                         alt={property.title}
//                         fill
//                         className="object-cover"
//                       />
//                       <div className="absolute top-2 right-2 bg-primary text-foreground px-3 py-1 rounded-md font-medium">
//                         ${property.price}/mo
//                       </div>
//                     </div>
//                     <CardContent className="p-4">
//                       <div className="flex justify-between items-center mb-2">
//                         <h3 className="font-semibold text-lg">{property.title}</h3>
//                       </div>
//                       <p className="text-foreground/70 text-sm mb-2">{property.address}</p>
//                       <div className="flex items-center gap-4 text-sm">
//                         <span className="flex items-center gap-1">
//                           <Home className="h-4 w-4" />{" "}
//                           {property.bedrooms === 0 ? "Studio" : `${property.bedrooms} Beds`}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <Building className="h-4 w-4" /> {property.bathrooms} Baths
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <Search className="h-4 w-4" /> {property.sqft} sqft
//                         </span>
//                       </div>
//                       <Button className="w-full mt-4" onClick={() => handleViewDetails(property.id)}>
//                         View Details
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             ) : (
//               <div className="py-12 flex flex-col items-center">
//                 <div className="max-w-md w-full">
//                   <div className="bg-card p-6 rounded-lg shadow-sm border mb-6 dark:bg-muted dark:border-border">
//                     <h3 className="text-lg font-semibold mb-4 dark:text-foreground">No properties found</h3>
//                     <p className="text-foreground/70 mb-4 dark:text-foreground/70">
//                       We couldn't find any properties matching your search criteria.
//                     </p>
//                     <Button
//                       onClick={() => {
//                         setFilters({
//                           priceRange: [500, 5000],
//                           bedrooms: "any",
//                           bathrooms: "any",
//                           propertyType: "any",
//                           amenities: [],
//                         })
//                         setSearchQuery("")
//                       }}
//                       className="w-full"
//                     >
//                       Reset Filters
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </section>
//       </main>

//       {/* Footer rendered globally in RootLayout */}

//       {/* Property Details Modal */}
//       {selectedPropertyData && (
//         <PropertyDetailsModal
//           company={{
//             id: selectedPropertyData.id,
//             name: selectedPropertyData.title,
//             logo: selectedPropertyData.logo,
//             rating: selectedPropertyData.rating,
//             reviewCount: selectedPropertyData.reviewCount,
//             address: selectedPropertyData.address,
//             phone: selectedPropertyData.phone,
//             specialties: selectedPropertyData.specialties,
//             description: selectedPropertyData.description,
//             valueRanges: selectedPropertyData.valueRanges,
//             images: selectedPropertyData.images,
//             leaseTerms: selectedPropertyData.leaseTerms,
//             services: selectedPropertyData.services,
//             fees: selectedPropertyData.fees,
//             availability: selectedPropertyData.availability,
//             website: selectedPropertyData.website,
//           }}
//           open={selectedProperty !== null}
//           onOpenChange={() => setSelectedProperty(null)}
//         />
//       )}
//     </div>
//   )
// }

'use client';

import { useState, useEffect, useMemo, useCallback, Suspense, lazy } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building, Home, Search, ArrowUpDown } from 'lucide-react';
import Image from 'next/image';

// Lazy load the modal component for better performance
const PropertyDetailsModal = lazy(() => import('@/components/property-details-modal').then(mod => ({ default: mod.PropertyDetailsModal })));
import {
  type PropertyFilters,
} from '@/components/property-filter';

// Lazy load heavy components
const PropertyFilter = lazy(() => import('@/components/property-filter').then(mod => ({ default: mod.PropertyFilter })));
const PropertySearch = lazy(() => import('@/components/property-search').then(mod => ({ default: mod.PropertySearch })));
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SEO from '@/components/seo';
import { generateBreadcrumbJsonLd, generatePropertyJsonLd } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import type { Property } from '@/app/types/property';
import { mapApiProperty } from '@/lib/mapProperty';
import { backendUrl } from '@/lib/backend';
import { caches, cacheKeys } from '@/lib/cache';
import { registerBfcacheRestoreCallback } from '@/lib/bfcache-optimization';

// keep your SortOption union if not importing
type LocalSortOption =
  | 'newest'
  | 'price-low'
  | 'price-high'
  | 'bedrooms'
  | 'bathrooms'
  | 'sqft';

export default function PropertiesPage() {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [allApiProperties, setAllApiProperties] = useState<Property[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const [filters, setFilters] = useState<PropertyFilters>({
    priceRange: [0, 20000], // NOTE: your API is INR; tune UI later if needed
    bedrooms: 'any',
    bathrooms: 'any',
    propertyType: 'any',
    amenities: [],
  });

  const [sortBy, setSortBy] = useState<LocalSortOption>('newest');
  const [searchQuery, setSearchQuery] = useState('');

  // 3a) Fetch from your Render API; use in-memory cache for repeat visits and bfcache-friendly behavior
  const PROPERTIES_CACHE_TTL = 2 * 60 * 1000; // 2 minutes
  const propertiesCacheKey = cacheKeys.api.properties();

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const cached = caches.properties.get(propertiesCacheKey) as Property[] | null;
        if (Array.isArray(cached) && cached.length >= 0 && retryCount === 0) {
          setAllApiProperties(cached);
          setLoading(false);
          setError(null);
          return;
        }

        setLoading(true);
        setError(null);
        const res = await fetch(backendUrl('/api/properties/public'), {
          signal: controller.signal,
          cache: 'no-store',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          if (res.status === 429) {
            throw new Error('Too many requests. Please try again in a moment.');
          } else if (res.status >= 500) {
            throw new Error('Server error. Please try again later.');
          } else if (res.status === 404) {
            throw new Error('Property data not found. Please contact support.');
          } else {
            throw new Error(`Failed to load properties (${res.status}). Please try again.`);
          }
        }

        const json = await res.json();
        if (!Array.isArray(json)) {
          throw new Error('Invalid response format. Please try again.');
        }

        const mapped: Property[] = json.map(mapApiProperty);
        caches.properties.set(propertiesCacheKey, mapped, PROPERTIES_CACHE_TTL);
        setAllApiProperties(mapped);
        setRetryCount(0);
      } catch (e: unknown) {
        if (e instanceof Error && e.name === 'AbortError') {
          return;
        }

        const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred while loading properties';

        if (process.env.NODE_ENV === 'development') {
          console.error('Property fetch error:', e);
        }

        setError(errorMessage);
        setAllApiProperties([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [retryCount, propertiesCacheKey]);

  // Revalidate on bfcache restore so returning users see fresh data without full loading state
  useEffect(() => {
    const handleRestore = () => {
      fetch(backendUrl('/api/properties/public'), {
        cache: 'no-store',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
        .then((json: unknown) => {
          if (!Array.isArray(json)) return;
          const mapped: Property[] = json.map(mapApiProperty);
          caches.properties.set(propertiesCacheKey, mapped, PROPERTIES_CACHE_TTL);
          setAllApiProperties(mapped);
          setError(null);
        })
        .catch(() => { /* ignore background revalidate errors */ });
    };

    const unregister = registerBfcacheRestoreCallback(handleRestore);
    return unregister;
  }, [propertiesCacheKey]);

  // 3b) Apply your existing filter/sort/search on the fetched list
  useEffect(() => {
    let filtered = [...allApiProperties];

    // price (your UI is 500–5000; your API returns INR like 15000)
    // If your UI slider is in INR, adjust range. For now, treat UI as INR:
    filtered = filtered.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // bedrooms
    if (filters.bedrooms !== 'any') {
      if (filters.bedrooms === 'studio')
        filtered = filtered.filter((p) => p.bedrooms === 0);
      else if (filters.bedrooms === '4+')
        filtered = filtered.filter((p) => p.bedrooms >= 4);
      else
        filtered = filtered.filter(
          (p) => p.bedrooms === Number.parseInt(filters.bedrooms)
        );
    }

    // bathrooms
    if (filters.bathrooms !== 'any') {
      if (filters.bathrooms === '3+')
        filtered = filtered.filter((p) => p.bathrooms >= 3);
      else
        filtered = filtered.filter(
          (p) => p.bathrooms === Number.parseFloat(filters.bathrooms)
        );
    }

    // property type
    if (filters.propertyType !== 'any') {
      filtered = filtered.filter((p) => p.type === filters.propertyType);
    }

    // amenities (API provides snake_case; keep exact match)
    if (filters.amenities.length > 0) {
      filtered = filtered.filter((p) =>
        filters.amenities.every((a) => p.amenities.includes(a))
      );
    }

    // search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // sort
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime());
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'bedrooms':
        filtered.sort((a, b) => b.bedrooms - a.bedrooms);
        break;
      case 'bathrooms':
        filtered.sort((a, b) => b.bathrooms - a.bathrooms);
        break;
      case 'sqft':
        filtered.sort((a, b) => b.sqft - a.sqft);
        break;
    }

    setProperties(filtered);
  }, [allApiProperties, filters, sortBy, searchQuery]);

  const selectedPropertyData = useMemo(() => {
    return selectedProperty
      ? properties.find((p) => p.id === selectedProperty) ?? null
      : null;
  }, [selectedProperty, properties]);

  const handleViewDetails = useCallback((id: string) => {
    setSelectedProperty(id);
  }, []);

  const handleFilterChange = useCallback((f: PropertyFilters) => {
    setFilters(f);
  }, []);

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q);
  }, []);

  const handleRetry = useCallback(() => {
    setRetryCount(prev => prev + 1);
  }, []);

  const propertySchemas = useMemo(() => {
    return properties.slice(0, 5).map((p) => {
    const addressParts = p.addressParts ?? {};
    const streetAddress = [addressParts.line1, addressParts.line2].filter(Boolean).join(', ').trim();
    const addressLocality = addressParts.city ?? '';
    const addressRegion = addressParts.state ?? '';
    const postalCode = addressParts.zipcode ?? '';
    const addressCountry = addressParts.country ?? '';

    if (!streetAddress || !addressLocality || !addressRegion || !postalCode || !addressCountry) return null;

    return generatePropertyJsonLd({
      name: p.title ?? 'Property',
      description: p.description || 'Rental property listed by Ondo Real Estate.',
      address: {
        streetAddress,
        addressLocality,
        addressRegion,
        postalCode,
        addressCountry,
      },
      numberOfRooms: p.bedrooms ?? undefined,
      floorSize: p.sqft
        ? {
            value: p.sqft,
            unitCode: 'SQF',
          }
        : undefined,
      image: p.images,
      offers: p.price
        ? {
            price: p.price,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          }
        : undefined,
    });
  }).filter(Boolean);
  }, [properties]);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Browse Rental Properties in India"
        description="Explore available rental homes, apartments, condos, and townhouses managed by Ondo Real Estate."
        pathname="/properties"
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        jsonLd={[
          generateBreadcrumbJsonLd([
            { name: 'Home', url: SITE_URL },
            { name: 'Properties', url: `${SITE_URL}/properties` },
          ]),
          ...propertySchemas,
        ]}
      />
      
      {/* Banner with search field */}
      <section className="relative" aria-labelledby="properties-hero-heading">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-black/90 z-10" />
        <div className="relative h-[400px] overflow-hidden">
          <Image
            src="/modern-apartment-balcony.png"
            alt="Modern apartment building representing rental properties"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
            title="Rental Properties"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 id="properties-hero-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">Find Your Perfect Home</h1>
              <p className="text-lg sm:text-xl text-white/90 mb-8 px-4">
                Browse our curated selection of quality rental properties
              </p>
              <div className="flex justify-center px-4">
                <Suspense fallback={<div className="h-12 w-full max-w-md bg-white/10 animate-pulse rounded"></div>}>
                  <PropertySearch onSearch={handleSearch} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 fade-in" aria-labelledby="properties-section-heading">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 fade-in-up">
              <div>
                <h2 id="properties-section-heading" className="text-3xl font-bold tracking-tight">
                  Available Properties
                </h2>
                <p className="text-foreground/70 mt-2" aria-live="polite" aria-atomic="true">
                  {loading
                    ? 'Loading...'
                    : `${properties.length} properties available for rent`}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto" role="group" aria-label="Property filters and sorting">
                <Suspense fallback={<div className="h-10 w-32 bg-muted animate-pulse rounded"></div>}>
                  <PropertyFilter
                    onFilterChange={handleFilterChange}
                    initialFilters={filters}
                  />
                </Suspense>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="justify-start sm:justify-center min-h-[44px]" aria-label={`Sort properties by ${sortBy === 'newest' ? 'newest' : sortBy === 'price-low' ? 'price low to high' : sortBy === 'price-high' ? 'price high to low' : sortBy === 'bedrooms' ? 'bedrooms' : sortBy === 'bathrooms' ? 'bathrooms' : 'square feet'}`}>
                      <ArrowUpDown className="mr-2 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                      <span className="truncate">
                        Sort by:{' '}
                        <span className="font-medium ml-1">
                          {sortBy === 'newest'
                            ? 'Newest'
                            : sortBy === 'price-low'
                            ? 'Price (Low to High)'
                            : sortBy === 'price-high'
                            ? 'Price (High to Low)'
                            : sortBy === 'bedrooms'
                            ? 'Bedrooms'
                            : sortBy === 'bathrooms'
                            ? 'Bathrooms'
                            : 'Square Feet'}
                        </span>
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortBy('newest')}>
                      Newest
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('price-low')}>
                      Price (Low to High)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('price-high')}>
                      Price (High to Low)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('bedrooms')}>
                      Bedrooms
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('bathrooms')}>
                      Bathrooms
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('sqft')}>
                      Square Feet
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="relative">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary"></div>
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary/30 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                </div>
                <p className="text-lg text-foreground/70 mt-4">Finding the perfect properties for you...</p>
                <p className="text-sm text-foreground/70/70 mt-2">This may take a moment</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="max-w-md w-full">
                  <div className="bg-card p-6 rounded-lg shadow-sm border mb-6 border-destructive">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-destructive">Unable to Load Properties</h3>
                    </div>
                    <p className="text-foreground/70 mb-6">{error}</p>
                    <div className="flex gap-3">
                      <Button
                        onClick={handleRetry}
                        className="flex-1"
                        variant="default"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Try Again
                      </Button>
                      <Button
                        onClick={() => window.location.reload()}
                        variant="outline"
                        className="px-4"
                      >
                        Refresh Page
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-fade-in" role="grid" aria-label="Available rental properties">
                {properties.map((property) => (
                  <Card
                    key={property.id}
                    className="overflow-hidden card-hover hover-lift focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 btn-interactive"
                    role="gridcell"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={property.image || '/placeholder.svg'}
                        alt={property.title}
                        fill
                        className="object-cover"
                        loading="lazy"
                        quality={85}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Switch to INR display */}
                      <div className="absolute top-2 right-2 bg-primary text-foreground px-3 py-1 rounded-md font-medium">
                        ₹{property.price.toLocaleString('en-IN')}/mo
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-lg">
                          {property.title}
                        </h3>
                      </div>
                      <p className="text-foreground/70 text-sm mb-2">
                        {property.address}
                      </p>
                      <div className="flex items-center gap-4 text-sm" role="list" aria-label="Property specifications">
                        <span className="flex items-center gap-1" role="listitem">
                          <Home className="h-4 w-4" aria-hidden="true" />{' '}
                          {property.bedrooms === 0
                            ? 'Studio'
                            : `${property.bedrooms} Beds`}
                        </span>
                        <span className="flex items-center gap-1" role="listitem">
                          <Building className="h-4 w-4" aria-hidden="true" /> {property.bathrooms}{' '}
                          Baths
                        </span>
                        <span className="flex items-center gap-1" role="listitem">
                          <Search className="h-4 w-4" aria-hidden="true" /> {property.sqft} sqft
                        </span>
                      </div>
                      <Button
                        className="w-full mt-4 min-h-[44px] text-base btn-interactive hover-lift"
                        onClick={() => handleViewDetails(property.id)}
                        aria-label={`View details for ${property.title} at ${property.address}, priced at ${property.price} per month`}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center">
                <div className="max-w-md w-full">
                  <div className="bg-card p-6 rounded-lg shadow-sm border mb-6 dark:bg-muted dark:border-border">
                    <h3 className="text-lg font-semibold mb-4 dark:text-foreground">
                      No properties found
                    </h3>
                    <p className="text-foreground/70 mb-4 dark:text-foreground/70">
                      We couldn't find any properties matching your search
                      criteria.
                    </p>
                    <Button
                      onClick={() => {
                        setFilters({
                          priceRange: [500, 20000],
                          bedrooms: 'any',
                          bathrooms: 'any',
                          propertyType: 'any',
                          amenities: [],
                        });
                        setSearchQuery('');
                      }}
                      className="w-full"
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Details modal */}
      {selectedPropertyData && (
        <Suspense fallback={
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span>Loading property details...</span>
            </div>
          </div>
        }>
          <PropertyDetailsModal
            company={{
              id: parseInt(selectedPropertyData.id) || 0,
              title: selectedPropertyData.title,
              address: selectedPropertyData.address,
              price: selectedPropertyData.price,
              bedrooms: selectedPropertyData.bedrooms,
              bathrooms: selectedPropertyData.bathrooms,
              sqft: selectedPropertyData.sqft,
              type: selectedPropertyData.type,
              image: selectedPropertyData.image,
              description: selectedPropertyData.description,
              features: selectedPropertyData.amenities || [],
              availability: selectedPropertyData.availability || undefined,
              leaseTerms: selectedPropertyData.leaseTerms || undefined,
              services: selectedPropertyData.services || undefined,
              fees: selectedPropertyData.fees || undefined,
              rating: selectedPropertyData.rating,
              reviewCount: selectedPropertyData.reviewCount,
              phone: selectedPropertyData.contact?.phone || selectedPropertyData.phone,
              website: selectedPropertyData.website || undefined,
              logo: selectedPropertyData.logo,
              specialties: selectedPropertyData.specialties || undefined,
              valueRanges: selectedPropertyData.valueRanges || undefined,
              images: selectedPropertyData.images || undefined,
            }}
            open={selectedProperty !== null}
            onOpenChange={() => setSelectedProperty(null)}
          />
        </Suspense>
      )}
    </div>
  );
}
