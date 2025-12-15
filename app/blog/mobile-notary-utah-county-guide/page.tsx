import { PageBanner } from "@/components/page-banner";
import SEO from "@/components/seo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_EMAILS, SITE_PHONE, SITE_URL } from "@/lib/site";
import Link from "next/link";

const published = "2025-01-10";
const modified = "2025-01-10";
const slug = "/blog/mobile-notary-utah-county-guide";

const keywords = [
  "mobile notary Utah County",
  "notary Lehi Utah",
  "mobile notary Provo",
  "traveling notary American Fork",
  "after hours notary Utah",
  "loan signing agent Utah County",
  "real estate notary Utah",
];

const serviceAreas = [
  "Lehi",
  "American Fork",
  "Saratoga Springs",
  "Eagle Mountain",
  "Orem",
  "Provo",
  "Draper",
  "Pleasant Grove",
];

export default function MobileNotaryUtahCountyGuide() {
  return (
    <main className="min-h-screen">
      <SEO
        title="Mobile Notary in Utah County: Fees, Timing, and How to Book"
        description="ONDO Notary offers mobile notarization across Utah County with transparent pricing, same-day scheduling, and real estate-ready loan signing expertise."
        pathname={slug}
        image={`${SITE_URL}/modern-apartment-balcony.png`}
        publishedTime={published}
        modifiedTime={modified}
        author="ONDO Notary Team"
        section="Notary"
        tags={["Mobile Notary", "Utah County", "Loan Signing", "Real Estate"]}
        keywords={keywords}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Mobile Notary in Utah County: Fees, Timing, and How to Book",
          description:
            "Book a mobile notary anywhere in Utah County with transparent pricing and same-day appointments.",
          author: { "@type": "Organization", name: "ONDO Notary" },
          datePublished: published,
          dateModified: modified,
          mainEntityOfPage: `${SITE_URL}${slug}`,
        }}
      />

      <PageBanner
        title="Mobile Notary in Utah County"
        subtitle="On-site notarization across Utah County with transparent fees and fast booking."
        backgroundImage="/modern-apartment-balcony.png"
      />

      <article className="bg-background py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="flex flex-wrap gap-3 mb-8">
            <Badge variant="secondary">Mobile Notary</Badge>
            <Badge variant="outline">Utah County</Badge>
            <Badge variant="outline">Real Estate & Loan Signings</Badge>
          </div>

          <div className="not-prose mb-6">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Link href="/blog">← Back to blog</Link>
            </Button>
          </div>

          {/* Gestalt: quick anchors */}
          <div className="not-prose grid gap-4 md:grid-cols-3 mb-10">
            <CardSpot title="Who it's for" body="Borrowers, title, and residents needing on-site notarization." />
            <CardSpot title="What you get" body="Same-day or scheduled visits across Utah County with transparent pricing." />
            <CardSpot title="How it flows" body="Choose city → confirm fee → ID check → stamp → receipt/scan-back if needed." />
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            <p>
              Need a notary to come to you in Utah County? ONDO Notary sends a commissioned, bonded
              professional to your home, office, title company, hospital, or designated meeting
              point. We specialize in real estate, loan signings, POA, estate documents, and sworn
              statements—without the drive time.
            </p>

            <h2>Where We Travel in Utah County</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
              {serviceAreas.map((city) => (
                <Card key={city} className="bg-muted border-border">
                  <CardContent className="p-4 text-center text-foreground font-semibold">
                    {city}
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-foreground/70">
              Additional nearby stops available. Travel fees are quoted upfront based on distance
              and urgency.
            </p>

            <h2>Pricing Snapshot</h2>
            <ul>
              <li><strong>Notarial act:</strong> $10 per stamp (Utah maximum)</li>
              <li><strong>Mobile trip fee:</strong> Starting at $25 (quoted by location)</li>
              <li><strong>Loan signing packages:</strong> $75–$200 depending on pages and parties</li>
              <li><strong>After-hours/urgent:</strong> Available; surcharge disclosed before booking</li>
            </ul>

            <div className="not-prose my-6 grid gap-3 md:grid-cols-2">
              <KeyLine title="Clarity" detail="Trip fee quoted upfront; stamp costs fixed by Utah statute." />
              <KeyLine title="Expectation" detail="Loan packages scale with page count and party count." />
            </div>

            <h2>What to Expect at the Appointment</h2>
            <ul>
              <li>ID check for every signer (government-issued ID)</li>
              <li>Document review for completeness and witness needs</li>
              <li>Proper journaling, seals, and notarizations for each signature</li>
              <li>Clear next steps for title/escrow or your records</li>
            </ul>

            <h2>Real Estate & Loan Signing Focus</h2>
            <ul>
              <li>Purchase, refinance, HELOC, and investment property packages</li>
              <li>Borrower walkthroughs with clear summaries for each document</li>
              <li>Courier or scan-back coordination upon request</li>
              <li>Flexible scheduling to align with lender and title deadlines</li>
            </ul>

            <h2>Same-Day and After-Hours Options</h2>
            <p>
              We reserve calendar blocks for urgent requests. If you need a notary today—or after 7 PM—
              call or text to confirm availability and pricing before dispatch.
            </p>

            <h3>Process at a Glance</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
{`Caller → City/urgency check → Fee quote → Confirm time/place
→ ID verified on-site → Journal entry + seal → Scan-back/courier (optional)`}
            </pre>

            <h2>Book Your Mobile Notary</h2>
            <ul>
              <li>Call or text: {SITE_PHONE}</li>
              <li>Email: {SITE_EMAILS.primary}</li>
              <li>
                Request online: <Link href="/notary" className="text-primary underline">/notary</Link>
              </li>
            </ul>
          </div>
        </div>
      </article>
    </main>
  );
}

function CardSpot({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-border bg-card/60 p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-primary mb-1">{title}</p>
      <p className="text-sm text-foreground">{body}</p>
    </div>
  );
}

function KeyLine({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-md border border-border bg-muted/60 px-4 py-3 h-full">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="text-sm text-foreground/70">{detail}</p>
    </div>
  );
}
