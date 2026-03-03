export interface InvestmentOpportunity {
  slug: string
  title: string
  location: string
  assetClass: string
  minInvestment: number
  targetReturn: string
  holdPeriod: string
  distributionFrequency: string
  status: "open" | "coming-soon" | "fully-funded"
  image: string
  description: string
  highlights: string[]
  riskFactors: string[]
}

export interface AssetClass {
  name: string
  icon: string
  description: string
}

export const ASSET_CLASSES: AssetClass[] = [
  {
    name: "Office",
    icon: "Building2",
    description:
      "Class A and B office buildings in growing metro areas with stable tenant demand and long-term lease structures.",
  },
  {
    name: "Retail",
    icon: "Store",
    description:
      "Grocery-anchored centers and neighborhood retail with essential-service tenants and NNN lease structures.",
  },
  {
    name: "Industrial",
    icon: "Warehouse",
    description:
      "Warehouses and distribution facilities driven by e-commerce growth and supply-chain demand.",
  },
  {
    name: "Multifamily",
    icon: "Hotel",
    description:
      "Apartment complexes and mixed-use residential properties in high-growth markets with strong occupancy.",
  },
  {
    name: "Medical Office",
    icon: "HeartPulse",
    description:
      "Healthcare-focused facilities leased to medical providers with recession-resistant demand profiles.",
  },
  {
    name: "Self-Storage",
    icon: "Container",
    description:
      "Climate-controlled and traditional storage facilities benefiting from steady consumer and business demand.",
  },
]

export const MOCK_OPPORTUNITIES: InvestmentOpportunity[] = [
  {
    slug: "lehi-tech-corridor-office",
    title: "Lehi Tech Corridor Office Complex",
    location: "Lehi, UT",
    assetClass: "Office",
    minInvestment: 25000,
    targetReturn: "8–12%",
    holdPeriod: "5–7 years",
    distributionFrequency: "Quarterly",
    status: "open",
    image: "/modern-office-building.webp",
    description:
      "A 48,000 sq ft Class A office building in Silicon Slopes with 92% occupancy and tenants including two publicly traded tech firms. The property benefits from proximity to I-15 and the FrontRunner commuter rail.",
    highlights: [
      "92% occupied with weighted average lease term of 4.2 years",
      "Located in Utah's fastest-growing tech employment corridor",
      "Below-market rents with 3% annual escalations",
      "Recent capital improvements to common areas and HVAC systems",
    ],
    riskFactors: [
      "Tenant concentration risk with two major tenants",
      "Interest rate changes may affect refinancing terms",
      "Local market supply additions could impact occupancy",
      "Economic downturn may reduce demand for office space",
    ],
  },
  {
    slug: "provo-student-housing-complex",
    title: "Provo Student Housing Complex",
    location: "Provo, UT",
    assetClass: "Multifamily",
    minInvestment: 10000,
    targetReturn: "7–10%",
    holdPeriod: "3–5 years",
    distributionFrequency: "Monthly",
    status: "open",
    image: "/modern-apartment-balcony.webp",
    description:
      "A 120-unit student housing property adjacent to Brigham Young University with consistent demand driven by enrollment growth. The property was renovated in 2022 with modern unit finishes.",
    highlights: [
      "98% average occupancy over the past three academic years",
      "Walking distance to BYU campus and UVX bus rapid transit",
      "Renovated in 2022 with in-unit washer/dryer and smart locks",
      "Below-market rents compared to newer competitive supply",
    ],
    riskFactors: [
      "Seasonal vacancy during summer months",
      "Dependence on university enrollment trends",
      "Potential for new student housing competition",
      "Regulatory changes affecting student rental properties",
    ],
  },
  {
    slug: "salt-lake-industrial-warehouse",
    title: "Salt Lake Industrial Distribution Center",
    location: "Salt Lake City, UT",
    assetClass: "Industrial",
    minInvestment: 50000,
    targetReturn: "9–13%",
    holdPeriod: "7–10 years",
    distributionFrequency: "Quarterly",
    status: "open",
    image: "/modern-office-building.webp",
    description:
      "A 120,000 sq ft distribution warehouse near the Salt Lake City International Airport with direct freeway access. The facility serves regional logistics for two national retail brands.",
    highlights: [
      "100% leased to creditworthy tenants on NNN lease structure",
      "Five minutes from SLC International Airport and I-80",
      "30-foot clear height with cross-dock loading configuration",
      "Industrial vacancy in Salt Lake County below 3%",
    ],
    riskFactors: [
      "Single-asset concentration with limited tenant diversification",
      "Potential environmental remediation obligations",
      "Logistics industry disruption could affect tenant demand",
      "Long hold period limits liquidity options",
    ],
  },
  {
    slug: "draper-medical-office-park",
    title: "Draper Medical Office Park",
    location: "Draper, UT",
    assetClass: "Medical Office",
    minInvestment: 25000,
    targetReturn: "7–9%",
    holdPeriod: "5–7 years",
    distributionFrequency: "Quarterly",
    status: "coming-soon",
    image: "/modern-apartment-balcony.webp",
    description:
      "A two-building medical office park totaling 32,000 sq ft leased to Intermountain Health affiliates and independent specialists. Located in the Draper corridor with strong population growth.",
    highlights: [
      "Healthcare tenants provide recession-resistant income",
      "Long-term leases with annual rent escalations",
      "Draper is one of the fastest-growing cities in Utah",
      "Property adjacent to new TRAX light rail station",
    ],
    riskFactors: [
      "Healthcare policy changes may impact tenant operations",
      "Specialized build-out limits alternative use flexibility",
      "Tenant renewal risk at lease expiration",
      "Rising construction costs may affect capital improvements",
    ],
  },
  {
    slug: "orem-grocery-anchored-retail",
    title: "Orem Grocery-Anchored Retail Center",
    location: "Orem, UT",
    assetClass: "Retail",
    minInvestment: 15000,
    targetReturn: "8–11%",
    holdPeriod: "5–7 years",
    distributionFrequency: "Quarterly",
    status: "coming-soon",
    image: "/modern-office-building.webp",
    description:
      "A 65,000 sq ft neighborhood retail center anchored by a national grocery chain with inline tenants including a pharmacy, dental office, and quick-service restaurants.",
    highlights: [
      "Grocery anchor on a 15-year NNN lease",
      "Located at a signalized intersection with 30,000+ daily traffic count",
      "Inline tenants provide service-based offerings resistant to e-commerce",
      "Strong demographics with growing households within a 3-mile radius",
    ],
    riskFactors: [
      "Anchor tenant departure would significantly impact value",
      "Retail sector remains subject to broader consumer spending trends",
      "Inline tenant turnover may create periodic vacancy",
      "Property tax reassessment risk upon acquisition",
    ],
  },
  {
    slug: "american-fork-self-storage",
    title: "American Fork Climate-Controlled Storage",
    location: "American Fork, UT",
    assetClass: "Self-Storage",
    minInvestment: 10000,
    targetReturn: "8–10%",
    holdPeriod: "3–5 years",
    distributionFrequency: "Monthly",
    status: "fully-funded",
    image: "/modern-apartment-balcony.webp",
    description:
      "A 450-unit climate-controlled self-storage facility in American Fork serving the north Utah County market. The facility opened in 2021 and has reached stabilized occupancy ahead of projections.",
    highlights: [
      "90% occupancy achieved within 18 months of opening",
      "Climate-controlled units command premium rental rates",
      "Limited new storage supply in the immediate trade area",
      "Month-to-month leases allow dynamic pricing adjustments",
    ],
    riskFactors: [
      "Self-storage is sensitive to local supply additions",
      "Month-to-month lease structure creates revenue volatility",
      "Fully funded — this opportunity is no longer accepting investors",
      "Operational costs may increase with utility rate changes",
    ],
  },
]
