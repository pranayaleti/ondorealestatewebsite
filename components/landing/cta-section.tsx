import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-16 bg-muted dark:bg-[var(--gradient-overlay)] text-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Rental?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Enter your ZIP code to start browsing available properties in your area.
        </p>
        <div className="mx-auto max-w-md">
          <form className="flex gap-2">
            <input
              type="text"
              placeholder="Enter ZIP code"
              className="flex-1 px-4 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background dark:bg-card dark:border-border dark:placeholder:text-foreground/70"
            />
            <Button type="submit" className="bg-background hover:bg-muted dark:hover:bg-muted text-foreground">
              Search
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}