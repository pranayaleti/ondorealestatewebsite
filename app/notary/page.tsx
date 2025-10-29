import { Button } from "@/components/ui/button"
import Link from "next/link"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL, SITE_PHONE, SITE_EMAILS } from "@/lib/site"
import { CheckCircle, Clock, MapPin, Phone, Mail, Download, FileText, Shield, Users, Calendar, Award, Building2, Globe, Zap } from "lucide-react"
import { NotaryFAQ } from "@/components/notary-faq"
import { NotaryBooking } from "@/components/notary-booking"

export default function NotaryPage() {
  return (
    <main className="min-h-screen">
      <SEO
        title="Notary Services — ONDO Real Estate"
        description="ONDO Real Estate Utah Notary Public services, offering in-person, mobile, and remote notarization for real estate, loan documents, affidavits, and legal documents in Lehi and Utah County. Book online today."
        pathname="/notary"
        image={`${SITE_URL}/placeholder.jpg`}
        keywords={[
          "Utah notary public",
          "notary services Utah",
          "mobile notary Utah",
          "remote online notary Utah",
          "real estate notary",
          "loan signing notary",
          "Lehi notary",
          "Utah County notary",
          "notarization services",
          "document notarization",
          "RON notary Utah",
          "mobile notary Lehi"
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "NotaryPublic"],
          "name": "Notary Services — ONDO Real Estate",
          "description": "ONDO Real Estate Utah Notary Public services, offering in-person, mobile, and remote notarization for real estate, loan documents, affidavits, and legal documents in Lehi and Utah County. Book online today.",
          "url": `${SITE_URL}/notary`,
          "telephone": SITE_PHONE,
          "email": SITE_EMAILS.primary,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lehi",
            "addressRegion": "UT",
            "addressCountry": "US"
          },
          "openingHours": "Mo-Fr 09:00-19:00",
          "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
              "@type": "GeoCoordinates",
              "latitude": 40.3916,
              "longitude": -111.8508
            },
            "geoRadius": "50000"
          },
          "makesOffer": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Notary Public Services",
                "description": "In-person, mobile, and remote online notarization services"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "Real Estate Document Notarization",
                "description": "Specialized notarization for real estate closings and loan documents"
              }
            }
          ],
          "hasCredential": {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Notary Public Commission",
            "recognizedBy": {
              "@type": "Organization",
              "name": "State of Utah"
            }
          },
          "parentOrganization": {
            "@type": "Organization",
            "name": "Ondo Real Estate",
            "url": SITE_URL
          }
        }}
      />

      {/* Hero Section */}
      <section id="hero" className="relative py-16 md:py-24 bg-gradient-to-br from-primary to-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              ONDO Notary Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Utah-commissioned Notary Public services focused on fast, reliable notarization for ONDO clients — in-person, mobile, and RON where applicable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="https://calendly.com/pranay_ondo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Book Notary Services
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="#about" className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About & Credentials */}
      <section id="about" className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">About & Credentials</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-primary">Professional Notary Services</h3>
                <p className="text-lg leading-relaxed mb-6 text-gray-300">
                  ONDO Real Estate provides professional notarial services through our Utah-commissioned notary public, serving Lehi and the greater Utah area. We specialize in real estate closings, loan documentation, affidavits, acknowledgements, jurats, and oaths for ONDO clients.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Commission Details</h4>
                      <p className="text-sm text-gray-300">
                        Commission Number: {"{{COMMISSION_NUMBER}}"}<br />
                        Commissioned in Utah. Commission expires: {"{{COMMISSION_EXPIRY_DATE}}"}<br />
                        Bond: $5,000 surety bond (Vendor: {"{{BOND_VENDOR}}"})
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Remote Online Notary (RON)</h4>
                      <p className="text-sm text-gray-300">
                        RON status: {"{{RON_STATUS}}"}<br />
                        RON vendor (if applicable): {"{{RON_VENDOR}}"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-primary p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-white">Why Choose ONDO?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Utah-commissioned notary with real estate expertise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Fast, reliable service with flexible scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Mobile notary services for your convenience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Specialized in real estate and loan documents</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section id="services" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Services Offered</h2>
              <p className="text-xl text-muted-foreground">Professional notarial services tailored to your needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black p-6 rounded-lg border border-primary">
                <h3 className="text-xl font-semibold mb-4 text-primary">In-Office Notarizations</h3>
                <p className="text-gray-300 mb-4">Professional notary services by appointment at our Lehi office.</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Real estate closing documents</li>
                  <li>• Loan documentation</li>
                  <li>• Affidavits and acknowledgements</li>
                  <li>• Jurats and oaths</li>
                </ul>
              </div>
              
              <div className="bg-muted p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Mobile Notarizations</h3>
                <p className="text-muted-foreground mb-4">Convenient notary services at your location throughout Lehi and surrounding areas.</p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Home and office visits</li>
                  <li>• Travel fees may apply</li>
                  <li>• Flexible scheduling</li>
                  <li>• Same-day service available</li>
                </ul>
              </div>
              
              <div className="bg-muted p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Loan Signing Support</h3>
                <p className="text-muted-foreground mb-4">Specialized support for mortgage and refinance document notarization.</p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Coordinated with title companies</li>
                  <li>• Mortgage document notarization</li>
                  <li>• Refinance paperwork</li>
                  <li>• Investment property loans</li>
                </ul>
              </div>
              
              <div className="bg-black p-6 rounded-lg border border-primary">
                <h3 className="text-xl font-semibold mb-4 text-primary">Remote Online Notary (RON)</h3>
                <p className="text-gray-300 mb-4">Secure online notarization services when available and applicable.</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Digital document notarization</li>
                  <li>• Secure video verification</li>
                  <li>• Electronic signatures</li>
                  <li>• Instant document delivery</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fees & Availability */}
      <section id="fees" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Fees & Availability</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-primary">Pricing</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="font-medium text-foreground">Standard notary fee</span>
                    <span className="text-primary font-semibold">Per Utah statute</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="font-medium text-foreground">Mobile trip fee</span>
                    <span className="text-primary font-semibold">$25</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    We comply with all state fee caps and regulations. Contact us for specific pricing based on your needs.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-primary">Availability</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black">Typical Hours</h4>
                      <p className="text-gray-600">
                        Weekdays 9 AM – 7 PM<br />
                        Select weekends by appointment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Client Volume</h4>
                      <p className="text-muted-foreground">
                        Currently serving 5–10 clients per month, primarily ONDO clients
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Bring */}
      <section id="what-to-bring" className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">What to Bring</h2>
              <p className="text-xl text-gray-300">Prepare for your notary appointment with these essential items</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-muted p-6 rounded-lg border border-border">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Required Documents</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Valid government photo ID (driver's license or passport)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Original documents to be notarized (do not sign before appointment unless instructed)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Required witnesses (we can help arrange if needed)</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-black p-6 rounded-lg border border-primary">
                <h3 className="text-xl font-semibold mb-4 text-primary">For RON Appointments</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Camera and microphone access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Government-issued photo ID</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Stable internet connection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Quiet, well-lit environment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">How It Works</h2>
              <p className="text-xl text-muted-foreground">Simple 3-step process to get your documents notarized</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Book Appointment</h3>
                <p className="text-muted-foreground">
                  Contact us to schedule your notary appointment or call to arrange a convenient time.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Verify & Notarize</h3>
                <p className="text-muted-foreground">
                  We verify your documents and ID during the meeting, then perform the notarization.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">Receive Documents</h3>
                <p className="text-muted-foreground">
                  Get your notarized document immediately (digital copy if RON).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-300">Click on any question to expand and view the answer</p>
            </div>
            
            <NotaryFAQ />
          </div>
        </div>
      </section>

      {/* Contact & Booking */}
      <section id="contact" className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Contact & Booking</h2>
              <p className="text-xl text-gray-300">Ready to schedule your notary appointment?</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-primary">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Phone</h4>
                      <p className="text-gray-300">{SITE_PHONE}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Email</h4>
                      <p className="text-gray-300">{SITE_EMAILS.primary}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Office Location</h4>
                      <p className="text-gray-300">2701 N Thanksgiving Way, Lehi, UT 84043</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Building2 className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Service Area</h4>
                      <p className="text-gray-300">Lehi, Provo, Orem, American Fork, and all of Utah County</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Business Hours</h4>
                      <p className="text-gray-300">Monday - Friday: 9:00 AM - 7:00 PM<br />Weekends: By appointment only</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <NotaryBooking />
            </div>
          </div>
        </div>
      </section>

      {/* Downloadable Documents */}
      <section id="documents" className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Downloadable Documents</h2>
            <p className="text-xl text-muted-foreground mb-8">Access official notary credentials and documentation</p>
            
            <div className="bg-black p-8 rounded-lg border border-primary max-w-md mx-auto">
              <Download className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-white">Commission Certificate</h3>
              <p className="text-gray-300 mb-6">
                Download official proof of notary commission and credentials
              </p>
              <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/assets/commission.pdf" className="flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Commission Certificate
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section id="disclaimer" className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-primary p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-6 text-white">Legal Disclaimer</h2>
              <div className="space-y-4 text-orange-100">
                <p>
                  Notary services are provided in compliance with Utah law. Notary cannot offer legal advice. All notarizations require valid identification and adherence to Utah's notarial act rules.
                </p>
                <p>
                  This notary public is commissioned in the State of Utah and authorized to perform notarial acts within the state. Services are provided in accordance with Utah Code Title 46, Chapter 1, Notaries Public Reform Act.
                </p>
                <p>
                  For questions about specific document requirements or legal implications, please consult with an attorney. The notary's role is limited to verifying identity and witnessing signatures as required by law.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
