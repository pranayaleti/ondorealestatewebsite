import { Button } from "@/components/ui/button"
import { SITE_PHONE } from "@/lib/site"
import { Calendar } from "lucide-react"
import Link from "next/link"

export function NotaryBooking() {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6 text-primary">Book Your Appointment</h3>
      <p className="text-gray-300 mb-6">
        Schedule your notary appointment quickly and easily using our online calendar. Select a time that works best for you.
      </p>
      <div className="bg-primary/10 rounded-lg p-8 text-center">
        <div className="flex flex-col items-center gap-6">
          <Calendar className="w-16 h-16 text-primary" />
          <div>
            <p className="text-lg font-semibold text-white mb-3">
              Ready to schedule your appointment?
            </p>
            <p className="text-sm text-gray-400 mb-6 max-w-md">
              Click the button below to view our available time slots and book your notary service appointment at a time that works best for you.
            </p>
          </div>
          
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8">
            <Link href="https://calendly.com/pranay_ondo" target="_blank" rel="noopener noreferrer">
              <Calendar className="w-5 h-5 mr-2" />
              View Available Times & Book Now
            </Link>
          </Button>
          
          <p className="text-xs text-gray-500 mt-4">
            For urgent requests or mobile services, please call us at <span className="text-primary font-semibold">{SITE_PHONE}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

