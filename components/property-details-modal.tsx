"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LazyImage } from "@/components/lazy-image"
import { Phone, ExternalLink, Star, MapPin, DollarSign } from "lucide-react"
import { useState } from "react"
import { Property, ModalProps } from "@/lib/types"

interface PropertyDetailsModalProps extends ModalProps {
  company: Property
}

export function PropertyDetailsModal({ company, open, onOpenChange }: PropertyDetailsModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = company.images || [company.image].filter(Boolean)
  const hasMultipleImages = images.length > 1

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {company.logo && (
              <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                <LazyImage
                  src={company.logo}
                  alt={`${company.title} logo`}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold">{company.title}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {company.rating && company.reviewCount && (
                  <>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current text-yellow-500" />
                      <span>{company.rating}</span>
                      <span>({company.reviewCount} reviews)</span>
                    </div>
                    <span>•</span>
                  </>
                )}
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{company.address}</span>
                </div>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription>{company.description}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <LazyImage
                src={images[currentImageIndex] || company.image}
                alt={`${company.title} property ${currentImageIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {hasMultipleImages && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {hasMultipleImages && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-video w-20 flex-shrink-0 rounded border-2 transition-colors ${
                      index === currentImageIndex ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <LazyImage
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover rounded"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            {/* Specialties */}
            {company.specialties && company.specialties.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {company.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary">
                    {specialty}
                  </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Value Ranges */}
            {company.valueRanges && company.valueRanges.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Property Value Ranges</h3>
                <div className="flex flex-wrap gap-2">
                  {company.valueRanges.map((range) => (
                  <Badge key={range} variant="outline">
                    <DollarSign className="h-3 w-3 mr-1" />
                    {range}
                  </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Services */}
            {company.services && company.services.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Services Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    {company.services.map((service, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Lease Terms */}
            {company.leaseTerms && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Lease Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{company.leaseTerms}</p>
                </CardContent>
              </Card>
            )}

            {/* Fees */}
            {company.fees && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Fees & Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{company.fees}</p>
                </CardContent>
              </Card>
            )}

            {/* Availability */}
            {company.availability && (
              <div className="flex items-center gap-2">
                <Badge variant={company.availability.toLowerCase().includes('available') ? 'default' : 'secondary'}>
                  {company.availability}
                </Badge>
              </div>
            )}

            {/* Contact Actions */}
            <div className="flex flex-col gap-3">
              <Button asChild className="w-full">
                <a href={`tel:${company.phone}`} className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Call {company.phone}
                </a>
              </Button>

              {company.website && (
                <Button variant="outline" asChild className="w-full">
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Visit Website
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}