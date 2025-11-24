import Image from "next/image"

interface PageBannerProps {
  title: string
  subtitle: string
  backgroundImage?: string
}

export function PageBanner({ title, subtitle, backgroundImage }: PageBannerProps) {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-foreground/90 z-10" />
      <div className="relative h-[300px] overflow-hidden">
        {backgroundImage ? (
          <Image
            src={backgroundImage || "/placeholder.svg"}
            alt={`${title} background image - ${subtitle}`}
            fill
            className="object-cover"
            priority
            title={`${title} - ${subtitle}`}
            aria-label={`Background image for ${title} page showing ${subtitle}`}
          />
        ) : (
          <Image 
            src="/modern-apartment-balcony.webp" 
            alt="Modern apartment building background representing Utah rental properties and property management services" 
            fill
            className="object-cover"
            priority
            title="Modern Apartment Building - Utah Rental Properties"
            aria-label="Modern apartment building background representing Utah rental properties and property management services"
          />
        )}
      </div>
      <div className="absolute inset-0 flex items-center z-20">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{title}</h1>
            <p className="text-xl text-foreground/90">{subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
