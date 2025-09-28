import Image from "next/image"

interface PageBannerProps {
  title: string
  subtitle: string
  backgroundImage?: string
}

export function PageBanner({ title, subtitle, backgroundImage }: PageBannerProps) {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-black/90 z-10" />
      <div className="relative h-[300px] overflow-hidden">
        {backgroundImage ? (
          <Image
            src={backgroundImage || "/placeholder.svg"}
            alt={`${title} background image`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <Image 
            src="/modern-apartment-balcony.png" 
            alt="Modern apartment building background" 
            fill
            className="object-cover"
            priority
          />
        )}
      </div>
      <div className="absolute inset-0 flex items-center z-20">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
            <p className="text-xl text-white/90">{subtitle}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
