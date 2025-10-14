import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PageBanner } from "@/components/page-banner"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL, SITE_PHONE } from "@/lib/site"
import { CheckCircle, Clock, MapPin, Phone, Mail, Download, FileText, Shield, Users, Calendar } from "lucide-react"

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
          "email": "{{YOUR_EMAIL}}",
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
      <section id="hero" className="relative py-16 md:py-24 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              ONDO Notary Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-100">
              Utah-commissioned Notary Public services focused on fast, reliable notarization for ONDO clients — in-person, mobile, and RON where applicable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700 text-white">
                <Link href="#contact" className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Book Notary Services
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-orange-600">
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
                <h3 className="text-2xl font-semibold mb-4 text-orange-500">Professional Notary Services</h3>
                <p className="text-lg leading-relaxed mb-6 text-gray-300">
                  ONDO Real Estate provides professional notarial services through our Utah-commissioned notary public, serving Lehi and the greater Utah area. We specialize in real estate closings, loan documentation, affidavits, acknowledgements, jurats, and oaths for ONDO clients.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
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
                    <Users className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
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
              
              <div className="bg-orange-500 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-white">Why Choose ONDO?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-orange-100">Utah-commissioned notary with real estate expertise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-orange-100">Fast, reliable service with flexible scheduling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-orange-100">Mobile notary services for your convenience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-orange-100">Specialized in real estate and loan documents</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section id="services" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Services Offered</h2>
              <p className="text-xl text-gray-600">Professional notarial services tailored to your needs</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black p-6 rounded-lg border border-orange-500">
                <h3 className="text-xl font-semibold mb-4 text-orange-500">In-Office Notarizations</h3>
                <p className="text-gray-300 mb-4">Professional notary services by appointment at our Lehi office.</p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Real estate closing documents</li>
                  <li>• Loan documentation</li>
                  <li>• Affidavits and acknowledgements</li>
                  <li>• Jurats and oaths</li>
                </ul>
              </div>
              
              <div className="bg-orange-500 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-white">Mobile Notarizations</h3>
                <p className="text-orange-100 mb-4">Convenient notary services at your location throughout Lehi and surrounding areas.</p>
                <ul className="space-y-2 text-sm text-orange-100">
                  <li>• Home and office visits</li>
                  <li>• Travel fees may apply</li>
                  <li>• Flexible scheduling</li>
                  <li>• Same-day service available</li>
                </ul>
              </div>
              
              <div className="bg-orange-500 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-white">Loan Signing Support</h3>
                <p className="text-orange-100 mb-4">Specialized support for mortgage and refinance document notarization.</p>
                <ul className="space-y-2 text-sm text-orange-100">
                  <li>• Coordinated with title companies</li>
                  <li>• Mortgage document notarization</li>
                  <li>• Refinance paperwork</li>
                  <li>• Investment property loans</li>
                </ul>
              </div>
              
              <div className="bg-black p-6 rounded-lg border border-orange-500">
                <h3 className="text-xl font-semibold mb-4 text-orange-500">Remote Online Notary (RON)</h3>
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
      <section id="fees" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Fees & Availability</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-orange-500">Pricing</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-300">
                    <span className="font-medium text-black">Standard notary fee</span>
                    <span className="text-orange-500 font-semibold">Per Utah statute</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-300">
                    <span className="font-medium text-black">Mobile trip fee</span>
                    <span className="text-orange-500 font-semibold">$25</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    We comply with all state fee caps and regulations. Contact us for specific pricing based on your needs.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-orange-500">Availability</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black">Typical Hours</h4>
                      <p className="text-gray-600">
                        Weekdays 9 AM – 7 PM<br />
                        Select weekends by appointment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black">Client Volume</h4>
                      <p className="text-gray-600">
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
              <div className="bg-orange-500 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-white">Required Documents</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-orange-100">Valid government photo ID (driver's license or passport)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-orange-100">Original documents to be notarized (do not sign before appointment unless instructed)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                    <span className="text-orange-100">Required witnesses (we can help arrange if needed)</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-black p-6 rounded-lg border border-orange-500">
                <h3 className="text-xl font-semibold mb-4 text-orange-500">For RON Appointments</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Camera and microphone access</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Government-issued photo ID</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Stable internet connection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">Quiet, well-lit environment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">How It Works</h2>
              <p className="text-xl text-gray-600">Simple 3-step process to get your documents notarized</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-4 text-black">Book Appointment</h3>
                <p className="text-gray-600">
                  Contact us to schedule your notary appointment or call to arrange a convenient time.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-4 text-black">Verify & Notarize</h3>
                <p className="text-gray-600">
                  We verify your documents and ID during the meeting, then perform the notarization.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-4 text-black">Receive Documents</h3>
                <p className="text-gray-600">
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
            </div>
            
            <div className="space-y-6">
              <div className="bg-orange-500 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Can you notarize for non-ONDO clients?
                </h3>
                <p className="text-orange-100">
                  Yes, when schedule permits. Priority goes to ONDO clients first, but we're happy to serve the broader community when availability allows.
                </p>
              </div>
              
              <div className="bg-black p-6 rounded-lg border border-orange-500">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Are your services valid for real estate loans and closings?
                </h3>
                <p className="text-gray-300">
                  Yes — I notarize for loan and closing documents, in compliance with Utah law and lender/title requirements. My real estate background ensures proper handling of complex real estate documents.
                </p>
              </div>
              
              <div className="bg-orange-500 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  How can I verify your commission?
                </h3>
                <p className="text-orange-100">
                  You can request my commission certificate or bond via the contact form or download link below. All notary credentials are publicly verifiable through Utah state records.
                </p>
              </div>
              
              <div className="bg-black p-6 rounded-lg border border-orange-500">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  What types of documents can you notarize?
                </h3>
                <p className="text-gray-300">
                  I can notarize acknowledgements, jurats, oaths, affidavits, and witness signatures. This includes real estate documents, loan papers, legal affidavits, and general business documents.
                </p>
              </div>
              
              <div className="bg-orange-500 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Do you offer same-day service?
                </h3>
                <p className="text-orange-100">
                  Same-day service is available based on schedule and location. Contact us as early as possible to check availability for urgent notarization needs.
                </p>
              </div>

              <div className="bg-black p-6 rounded-lg border border-orange-500">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  What identification do I need to bring?
                </h3>
                <p className="text-gray-300">
                  You must bring a valid government-issued photo ID such as a driver's license, passport, or state ID card. The ID must be current and not expired. We cannot notarize documents without proper identification.
                </p>
              </div>

              <div className="bg-orange-500 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  How much do notary services cost?
                </h3>
                <p className="text-orange-100">
                  Standard notary fees follow Utah state regulations. Mobile services may include a travel fee. Contact us for specific pricing based on your needs. We're transparent about all costs upfront.
                </p>
              </div>

              <div className="bg-black p-6 rounded-lg border border-orange-500">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Can you notarize documents that are already signed?
                </h3>
                <p className="text-gray-300">
                  No, documents must be signed in the presence of the notary. This is a legal requirement in Utah. Please do not sign documents before your appointment unless specifically instructed to do so.
                </p>
              </div>

              <div className="bg-orange-500 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  What is Remote Online Notarization (RON)?
                </h3>
                <p className="text-orange-100">
                  RON allows notarization to occur remotely through secure video technology. It's legally equivalent to in-person notarization when performed by a certified RON notary. This service is available when applicable and permitted by law.
                </p>
              </div>

              <div className="bg-black p-6 rounded-lg border border-orange-500">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  How far in advance should I schedule?
                </h3>
                <p className="text-gray-300">
                  We recommend scheduling at least 24-48 hours in advance for in-office appointments. For mobile services, please allow more time for travel. Same-day service may be available but is not guaranteed.
                </p>
              </div>

              <div className="bg-orange-500 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Can you notarize documents in languages other than English?
                </h3>
                <p className="text-orange-100">
                  Yes, I can notarize documents in other languages. However, I must be able to communicate with you in English to verify your identity and ensure you understand what you're signing. The notarial certificate will be in English as required by Utah law.
                </p>
              </div>

              <div className="bg-black p-6 rounded-lg border border-orange-500">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  What if I need witnesses for my document?
                </h3>
                <p className="text-gray-300">
                  We can help arrange witnesses if needed, or you can bring your own. Witnesses must also present valid ID and be present during the notarization. There may be additional fees for witness services.
                </p>
              </div>

              <div className="bg-orange-500 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-white">
                  Are your notarizations valid in other states?
                </h3>
                <p className="text-orange-100">
                  Utah notarizations are generally recognized in other states, but requirements vary. For documents to be used in other states, check with the receiving party or institution to ensure Utah notarizations are acceptable for your specific needs.
                </p>
              </div>
            </div>
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
                <h3 className="text-2xl font-semibold mb-6 text-orange-500">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Phone className="w-6 h-6 text-orange-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Phone</h4>
                      <p className="text-gray-300">{"{{YOUR_PHONE}}"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-orange-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Email</h4>
                      <p className="text-gray-300">{"{{YOUR_EMAIL}}"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <MapPin className="w-6 h-6 text-orange-500 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white">Service Area</h4>
                      <p className="text-gray-300">Lehi and surrounding Utah County areas</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-500 p-8 rounded-lg">
                <h3 className="text-2xl font-semibold mb-6 text-white">Book Appointment</h3>
                <p className="text-orange-100 mb-6">
                  Schedule your notary appointment quickly and easily through our booking system.
                </p>
                <Button asChild size="lg" className="w-full bg-black hover:bg-gray-800 text-white">
                  <Link href={"{{BOOKING_URL}}"} className="flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Book Appointment Now
                  </Link>
                </Button>
                <p className="text-sm text-orange-100 mt-4 text-center">
                  Or call us directly for immediate assistance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Downloadable Documents */}
      <section id="documents" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Downloadable Documents</h2>
            <p className="text-xl text-gray-600 mb-8">Access official notary credentials and documentation</p>
            
            <div className="bg-black p-8 rounded-lg border border-orange-500 max-w-md mx-auto">
              <Download className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-white">Commission Certificate</h3>
              <p className="text-gray-300 mb-6">
                Download official proof of notary commission and credentials
              </p>
              <Button asChild className="w-full bg-orange-500 hover:bg-orange-600 text-white">
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
            <div className="bg-orange-500 p-8 rounded-lg">
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
