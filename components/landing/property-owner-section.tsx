import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LazyImage } from "@/components/lazy-image"

export function PropertyOwnerSection() {
  return (
    <section className="py-16 bg-background dark:bg-[var(--gradient-overlay)]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 dark:text-foreground">Property Owners</h2>
            <p className="text-lg mb-6 dark:text-muted-foreground">
              Let OnDo Real Estate handle the day-to-day management of your rental property. We provide comprehensive
              property management services so you can enjoy passive income without the hassle.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <Shield className="h-6 w-6 text-foreground dark:text-muted-foreground mr-2 flex-shrink-0" />
                <span className="dark:text-muted-foreground">Professional tenant screening and placement</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-6 w-6 text-foreground dark:text-muted-foreground mr-2 flex-shrink-0" />
                <span className="dark:text-muted-foreground">Rent collection and financial reporting</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-6 w-6 text-foreground dark:text-muted-foreground mr-2 flex-shrink-0" />
                <span className="dark:text-muted-foreground">Maintenance coordination and 24/7 emergency response</span>
              </li>
              <li className="flex items-start">
                <Shield className="h-6 w-6 text-foreground dark:text-muted-foreground mr-2 flex-shrink-0" />
                <span className="dark:text-muted-foreground">Regular property inspections and detailed reports</span>
              </li>
            </ul>
            <Button asChild className="bg-background hover:bg-muted dark:hover:bg-muted text-foreground">
              <Link href="/contact">Learn More</Link>
            </Button>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <LazyImage
              src="/city-map-with-pin.webp"
              alt="Utah property management service areas map showing Salt Lake City, Holladay, Midvale and surrounding communities served by OnDo Real Estate"
              fill
              className="object-cover"
              quality={80}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}