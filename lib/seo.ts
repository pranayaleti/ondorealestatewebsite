import { SITE_NAME, SITE_URL } from "./site"

export interface FAQItem {
  question: string
  answer: string
}

export interface ServiceData {
  name: string
  description: string
  serviceType: string
  areaServed?: string
  offers?: {
    description: string
  }
}

export interface LocalBusinessData {
  name: string
  url: string
  telephone?: string
  image?: string
  areaServed?: string
  openingHours?: string
  address?: {
    addressRegion: string
    addressCountry: string
  }
  makesOffer?: Array<{
    itemOffered: {
      name: string
    }
  }>
}

/**
 * Generate JSON-LD for a Service
 */
export function generateServiceJsonLd(service: ServiceData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: service.areaServed ? {
      '@type': 'State',
      name: service.areaServed,
    } : undefined,
    serviceType: service.serviceType,
    offers: service.offers ? {
      '@type': 'Offer',
      description: service.offers.description,
    } : undefined,
  }
}

/**
 * Generate JSON-LD for FAQPage
 */
export function generateFAQJsonLd(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate JSON-LD for LocalBusiness/RealEstateAgent
 */
export function generateLocalBusinessJsonLd(business: LocalBusinessData) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness', 'RealEstateAgent'],
    name: business.name,
    url: business.url,
    telephone: business.telephone,
    image: business.image,
    areaServed: business.areaServed,
    openingHours: business.openingHours,
    address: business.address,
    makesOffer: business.makesOffer,
  }
}

/**
 * Generate breadcrumb JSON-LD
 */
export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * Generate WebSite JSON-LD with search action
 */
export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Generate RealEstateAgent JSON-LD
 */
export function generateRealEstateAgentJsonLd(agent: {
  name: string
  url?: string
  telephone?: string
  email?: string
  image?: string
  worksFor?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: agent.name,
    url: agent.url || SITE_URL,
    telephone: agent.telephone,
    email: agent.email,
    image: agent.image,
    worksFor: agent.worksFor ? {
      '@type': 'RealEstateAgent',
      name: agent.worksFor,
    } : undefined,
  }
}

/**
 * Generate Property JSON-LD
 */
export function generatePropertyJsonLd(property: {
  name: string
  description: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo?: {
    latitude: number
    longitude: number
  }
  numberOfRooms?: number
  floorSize?: {
    value: number
    unitCode: string
  }
  image?: string[]
  offers?: {
    price: number
    priceCurrency: string
    availability: string
  }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.name,
    description: property.description,
    address: {
      '@type': 'PostalAddress',
      ...property.address,
    },
    geo: property.geo ? {
      '@type': 'GeoCoordinates',
      latitude: property.geo.latitude,
      longitude: property.geo.longitude,
    } : undefined,
    numberOfRooms: property.numberOfRooms,
    floorSize: property.floorSize ? {
      '@type': 'QuantitativeValue',
      value: property.floorSize.value,
      unitCode: property.floorSize.unitCode,
    } : undefined,
    image: property.image,
    offers: property.offers ? {
      '@type': 'Offer',
      price: property.offers.price,
      priceCurrency: property.offers.priceCurrency,
      availability: property.offers.availability,
    } : undefined,
  }
}
