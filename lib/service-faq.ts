import { type CityFaq } from "./city-content"

export type ServiceKey = "property-management" | "buy-sell" | "loans"

export const propertyManagementFaqBank: CityFaq[] = [
  { q: "What areas do you manage in Utah?", a: "We manage single-family homes, townhomes, and small multifamily across the Wasatch Front, including Salt Lake City, Utah County, Davis County, and Weber County." },
  { q: "What are your management and leasing fees?", a: "Management typically ranges 7–10% of collected rent, and leasing is a one-time fee due upon tenant placement. Fees vary by property type and portfolio size." },
  { q: "How quickly can you lease my property?", a: "Well-priced, well-presented homes typically lease in 7–21 days depending on seasonality and local comps. We share weekly activity metrics and recommendations." },
  { q: "How do you screen tenants?", a: "We verify income, credit, criminal background, prior evictions, rental history, and employment. Applications are scored against fair, written criteria." },
  { q: "How is maintenance handled?", a: "Tenants submit requests online 24/7. We triage, dispatch vetted vendors, and keep owners informed. Emergency issues are handled immediately." },
  { q: "Is there a maintenance reserve or markups?", a: "We maintain a small operating reserve to cover minor repairs and do not add markups to vendor invoices. You receive copies of all bills in monthly statements." },
  { q: "How often do you inspect properties?", a: "We complete move-in/move-out inspections, annual or semi-annual checkups, and spot checks as needed, with detailed photo reports." },
  { q: "When will I receive owner payouts?", a: "Owner disbursements are sent monthly after rent clears and expenses are reconciled. You’ll receive a statement itemizing all income and costs." },
  { q: "How do you handle late rent and evictions?", a: "We follow Utah statutes for notices and timelines, apply late fees per lease, and coordinate with legal partners when necessary to protect your interests." },
  { q: "Can I approve repairs over a certain amount?", a: "Yes. We obtain owner approval for non-emergency repairs above your chosen dollar threshold. Emergencies are handled to prevent further damage." },
  { q: "Do you allow pets?", a: "Pet policies are owner-led. If allowed, we use pet screening, deposits, and pet rent to mitigate risk while expanding the renter pool." },
  { q: "What does onboarding look like?", a: "We review your goals, collect documents and keys, perform a walk-through, set pricing, activate marketing, and begin showings—typically within 48–72 hours." },
]

export const buySellFaqBank: CityFaq[] = [
  { q: "How do I get started buying a home in Utah?", a: "Begin with a quick consultation and mortgage pre-approval. We then refine neighborhoods, must-haves, and budget before touring homes." },
  { q: "What down payment do I need?", a: "Conventional loans can start as low as 3% down. FHA often requires 3.5%, VA and USDA can be 0% for eligible buyers. Your lender will confirm options." },
  { q: "How competitive is the market right now?", a: "Competitiveness varies by city and price band. We share current absorption rates, days on market, and strategy for winning in multiple-offer scenarios." },
  { q: "Should I waive inspections or appraisal?", a: "We protect your interests. We rarely recommend waiving protections; instead we tailor timelines, escalation terms, and credits to strengthen offers." },
  { q: "What closing costs should I expect?", a: "Plan for 2–3% of purchase price for lender, title, and prepaid items. We can pursue seller credits to offset costs where appropriate." },
  { q: "Do you represent new construction buyers?", a: "Yes. We help evaluate builders, negotiate upgrades, review timelines, and coordinate inspections—representation costs are typically covered by the builder." },
  { q: "Can you help me sell my current home and buy another?", a: "Yes. We coordinate pricing, timing, and financing—often with leasebacks or extended closings—to minimize overlap and stress." },
  { q: "What is earnest money?", a: "A good-faith deposit credited at closing. It signals commitment and is protected by your contract’s contingencies and timelines." },
  { q: "How long does a typical purchase take?", a: "Most close in 30–45 days from acceptance. Cash can be faster. Pre-approval and document readiness help keep timelines tight." },
  { q: "How do you market homes for sale?", a: "For sellers, we use professional photography, video, 3D tours, targeted digital ads, and agent networks to maximize exposure and results." },
  { q: "What improvements deliver the best ROI before selling?", a: "Light paint, landscaping refresh, lighting updates, deep clean, and minor repairs usually yield strong returns vs. cost and time." },
  { q: "Can I buy before I sell?", a: "Potentially. We can explore bridge loans, HELOCs, or contract terms that align both transactions with manageable risk." },
]

export const loansFaqBank: CityFaq[] = [
  { q: "Which loan programs are available in Utah?", a: "Conventional, FHA, VA, USDA, jumbo, and specialty options. We match your profile and goals to the best-fit program." },
  { q: "How does mortgage pre-approval work?", a: "We review credit, income, assets, and debts, then issue a pre-approval letter that strengthens offers and clarifies budget." },
  { q: "What’s the difference between rate and APR?", a: "Rate is the interest cost; APR includes most lender fees, providing a more complete cost comparison across loans." },
  { q: "How much are closing costs?", a: "Typically 2–3% of the purchase price. We can negotiate seller credits or explore lender options to reduce cash to close." },
  { q: "What credit score do I need?", a: "Minimums vary by program. Stronger credit typically improves pricing. We’ll suggest steps to optimize credit before locking." },
  { q: "Can I use gift funds for my down payment?", a: "Often yes, especially with FHA and conventional loans. Your lender will outline documentation needed for compliant gift sourcing." },
  { q: "How is DTI calculated?", a: "Debt-to-income compares monthly debts vs. gross income. Most programs prefer DTI under 45%, though exceptions exist." },
  { q: "I’m self-employed—what documents are required?", a: "Expect two years of returns, YTD P&L, and bank statements. Some programs allow alternative documentation with conditions." },
  { q: "Should I buy points or do a buydown?", a: "Discount points can lower rate for the life of the loan; temporary buydowns reduce payments for 1–3 years. We model both scenarios." },
  { q: "How long is a rate lock?", a: "Common lock periods are 30–60 days. We select a lock that covers your closing timeline with flexibility for extensions if needed." },
  { q: "When does PMI apply and how can I remove it?", a: "PMI generally applies with <20% down on conventional loans and can be removed as equity grows, per investor guidelines." },
  { q: "Can I refinance later?", a: "Yes. You can refinance to lower rate, change term, or access equity. We monitor markets and notify you when it’s advantageous." },
]

export function getServiceFaqBank(service: ServiceKey): CityFaq[] {
  if (service === "property-management") return propertyManagementFaqBank
  if (service === "loans") return loansFaqBank
  return buySellFaqBank
}


