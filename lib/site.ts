export const SITE_NAME = "Ondo Real Estate"
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ondorealestate.com"
export const SITE_PHONE = "+1-800-365-4441"
export const SITE_HOURS = "Mo-Fr 09:00-17:00"
export const SITE_ADDRESS = "2701 N Thanksgiving Way, Lehi, UT 84043"


// Human-friendly hours label for UI
export const SITE_HOURS_LABEL = "Mon–Fri 9:00 AM – 5:00 PM MT"

// Structured address parts for UI and schema
export const SITE_ADDRESS_STREET = "2701 N Thanksgiving Way"
export const SITE_ADDRESS_CITY = "Lehi"
export const SITE_ADDRESS_REGION = "UT"
export const SITE_ADDRESS_POSTAL_CODE = "84043"
export const SITE_ADDRESS_COUNTRY = "US"

export const SITE_ADDRESS_OBJ = {
  streetAddress: SITE_ADDRESS_STREET,
  addressLocality: SITE_ADDRESS_CITY,
  addressRegion: SITE_ADDRESS_REGION,
  postalCode: SITE_ADDRESS_POSTAL_CODE,
  addressCountry: SITE_ADDRESS_COUNTRY,
}

// Centralized emails used across the app
export const SITE_EMAILS = {
  primary: "ondorealestate@gmail.com",
  info: "info@ondorealestate.com",
  support: "help@ondorealestate.com",
  media: "media@ondorealestate.com",
  investors: "investors@ondorealestate.com",
  accessibility: "accessibility@ondorealestate.com",
  privacy: "privacy@ondorealestate.com",
  legal: "legal@ondorealestate.com",
}


// Centralized social profile URLs used across footer, metadata, and JSON-LD
export const SITE_SOCIALS = [
  "https://www.facebook.com/OnDoRealEstate",
  "https://www.youtube.com/@OnDoRealEstate",
  "https://www.instagram.com/OnDoRealEstate",
  "https://www.tiktok.com/@OnDoRealEstate",
  "https://www.linkedin.com/company/OnDoRealEstate",
  "https://x.com/OnDoRealEstate",
  "https://www.pinterest.com/ondorealestate",
  "https://yelp.com/biz/ondo-real-estate-lehi",
  "https://linktr.ee/ondorealestate",
  // TODO: Implement WhatsApp group integration - temporarily commented out
  // "https://chat.whatsapp.com/GFnQbVD7kriKlz3kHpTx2c",
  // "https://www.reddit.com/user/ondorealestate/",
]

