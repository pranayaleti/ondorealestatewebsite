export type CityFaq = { q: string; a: string }
export type CityContent = {
  overview: string
  neighborhoods?: string[]
  highlights?: string[]
  faq?: CityFaq[]
}

// City-specific content for priority corridor (North Ogden → Nephi)
export const cityContentByName: Record<string, CityContent> = {
  "North Ogden": {
    overview:
      "North Ogden blends mountain-side living with convenient access to Ogden employment hubs. Homes range from established neighborhoods to newer hillside subdivisions with Wasatch views. Vacancy trends are typically tighter than the Weber County average, especially for updated 3–4 bedroom homes with garages.",
    neighborhoods: ["Pleasant View border", "Ben Lomond foothills", "Washington Blvd corridor"],
    highlights: ["Strong single-family demand", "Low vacancy vs. Weber County avg", "Outdoor lifestyle draws long-term tenants"],
    faq: [
      { q: "What property types perform best?", a: "3–4 bedroom single-family homes in school-adjacent areas see strongest demand and the lowest turnover." },
      { q: "Average leasing timeline?", a: "7–14 days when priced against recent comps and professionally photographed." },
    ],
  },
  Ogden: {
    overview:
      "Ogden offers a diverse housing stock from historic east bench homes to downtown apartments near 25th Street. With Weber State University, Intermountain Health, and Hill AFB nearby, demand is broad and resilient. Investors see opportunities in both workforce housing and value-add duplexes/fourplexes.",
    neighborhoods: ["East Bench", "Downtown/25th St", "West Ogden", "Shadow Valley"],
    highlights: ["University and healthcare employment base", "Active downtown revitalization", "Strong interest in renovated units"],
    faq: [
      { q: "Do you manage multi-family?", a: "Yes, we manage small multi-family (2–20 units) and scattered single-family portfolios across Ogden." },
      { q: "Pet policies?", a: "Pet-friendly units widen the renter pool; we implement pet screening and deposits to mitigate risk." },
    ],
  },
  Roy: {
    overview:
      "Roy is a commuter-friendly city with Hill AFB influence and stable rent trends. Typical rentals are single-family homes and townhomes near 1900 W and I-15 access. Turnkey homes with fenced yards and updated kitchens lease quickly to long-term tenants.",
    neighborhoods: ["Hill AFB access", "1900 W corridor", "West Roy parks"],
    highlights: ["Military and contractor demand", "Consistent rent collections"],
    faq: [
      { q: "Ideal lease length?", a: "12 months is standard; many households renew at 24 months given commute convenience." },
    ],
  },
  Layton: {
    overview:
      "Layton combines robust retail, quality schools, and Hill AFB proximity. Townhome communities and modern single-family homes are prime inventory. Well-staged listings with video walkthroughs regularly achieve above-average inquiry rates.",
    neighborhoods: ["East Layton", "Hill AFB area", "Antelope Dr corridor"],
    highlights: ["Consistent leasing timelines", "Attractive for long-term holds", "Strong family demand"],
    faq: [
      { q: "Best time to list?", a: "Late spring through mid-summer delivers the highest application volumes, but year-round demand is healthy." },
    ],
  },
  Bountiful: {
    overview:
      "Bountiful's east-bench charm and quick SLC commute make it a resilient rental market. Updated properties with separate living spaces and outdoor areas see premium interest from professional households.",
    neighborhoods: ["Val Verda", "East Bench", "Downtown Bountiful"],
    highlights: ["Low days on market", "High renewal rates"],
    faq: [
      { q: "Do you coordinate yard care?", a: "Yes. For premium rentals we recommend owner-provided lawn care to protect curb appeal and reduce disputes." },
    ],
  },
  "Salt Lake City": {
    overview:
      "Utah's urban core spans distinct neighborhoods like the Avenues, Liberty Wells, and Sugar House. Professional renters value proximity to hospitals, tech employers, and transit. Thoughtful pet policies and in-unit laundry materially improve marketing performance.",
    neighborhoods: ["Avenues", "Sugar House", "Liberty Wells", "Downtown"],
    highlights: ["High marketing exposure", "Diverse renter profiles", "Premium for updated kitchens/baths"],
    faq: [
      { q: "Furnished vs. unfurnished?", a: "Unfurnished is standard for 12-month leases. Furnished can work for short-term corporate rentals near downtown/hospitals." },
    ],
  },
  Sandy: {
    overview:
      "Sandy offers family neighborhoods and ski-access convenience. Split-level and two-story homes with garages perform well. School adjacency and quiet streets increase renewal likelihood.",
    neighborhoods: ["Alta View area", "East bench", "Sandy Village"],
    highlights: ["Stable pricing", "Strong family tenant base"],
    faq: [
      { q: "Do basement apartments help?", a: "Separate living spaces with proper permits can enhance returns; we advise on compliance and layout." },
    ],
  },
  Draper: {
    overview:
      "Draper combines tech-corridor access with hillside neighborhoods. Newer builds and finishes command higher interest; garages and EV-ready outlets are increasingly requested by applicants.",
    neighborhoods: ["South Mountain", "Suncrest", "Draper Peaks"],
    highlights: ["Proximity to Silicon Slopes", "High-income renter profiles"],
    faq: [
      { q: "Marketing recommendations?", a: "Twilight exterior photography and 60–90 second video tours consistently boost lead volume and showing conversions." },
    ],
  },
  Lehi: {
    overview:
      "Lehi is the heart of Silicon Slopes with strong professional demand. Townhomes and modern single-family in HOA communities remain top performers. Walkability to tech campuses and retail is a differentiator.",
    neighborhoods: ["Traverse Mountain", "Thanksgiving Point", "Lehi Old Town"],
    highlights: ["Tech-driven demand", "Low days on market", "Premiums for attached garages"],
    faq: [
      { q: "Pets in townhomes?", a: "Permitted per HOA rules; our pet screening and deposits reduce risk while expanding applicant pools." },
    ],
  },
  Orem: {
    overview:
      "Orem benefits from UVU proximity and family-friendly neighborhoods. Renovations that add durable flooring and low-maintenance landscaping reduce operating friction and downtime.",
    neighborhoods: ["Northridge", "UVU area", "Cascade"],
    highlights: ["Student and family demand mix", "High renewal opportunities"],
    faq: [
      { q: "How to minimize vacancy?", a: "Proactive renewal outreach at 90 days, modest annual increases tied to comps, and early turn scheduling." },
    ],
  },
}


