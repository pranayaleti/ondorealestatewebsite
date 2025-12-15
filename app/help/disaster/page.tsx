import { PageBanner } from "@/components/page-banner"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL, SITE_PHONE } from "@/lib/site"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { AlertTriangle, Phone, FileText, Shield, Home, Heart, Clock, CheckCircle } from "lucide-react"

export default function DisasterResourcesPage() {
  const disasterTypes = [
    {
      title: "Earthquakes",
      description: "Utah is prone to earthquakes. Know what to do before, during, and after an earthquake.",
      icon: <AlertTriangle className="h-6 w-6" />,
      immediate: ["Drop, cover, and hold on", "Stay indoors if safe", "Avoid doorways and windows"],
      after: ["Check for injuries", "Inspect property damage", "Contact insurance", "Document damage"]
    },
    {
      title: "Floods",
      description: "Flash floods and river flooding can cause significant property damage in Utah.",
      icon: <AlertTriangle className="h-6 w-6" />,
      immediate: ["Move to higher ground", "Avoid driving through floodwaters", "Turn off utilities if safe"],
      after: ["Document damage with photos", "Contact insurance immediately", "Avoid contaminated areas", "Get professional cleanup"]
    },
    {
      title: "Wildfires",
      description: "Wildfire season brings smoke, evacuation orders, and potential property damage.",
      icon: <AlertTriangle className="h-6 w-6" />,
      immediate: ["Follow evacuation orders", "Close all windows and doors", "Turn off air conditioning"],
      after: ["Wait for all-clear before returning", "Check air quality", "Inspect property for damage", "Contact insurance"]
    },
    {
      title: "Severe Weather",
      description: "Hail, wind, and severe storms can cause significant damage to homes and property.",
      icon: <AlertTriangle className="h-6 w-6" />,
      immediate: ["Seek shelter indoors", "Stay away from windows", "Avoid electrical equipment"],
      after: ["Check for damage", "Take photos of any damage", "Contact insurance", "Make temporary repairs if safe"]
    }
  ]

  const assistancePrograms = [
    {
      title: "FEMA Disaster Assistance",
      description: "Federal assistance for individuals and families affected by declared disasters.",
      icon: <Shield className="h-6 w-6" />,
      contact: "1-800-621-3362",
      website: "disasterassistance.gov",
      eligibility: "Must be in declared disaster area"
    },
    {
      title: "SBA Disaster Loans",
      description: "Low-interest loans for homeowners, renters, and businesses affected by disasters.",
      icon: <FileText className="h-6 w-6" />,
      contact: "1-800-659-2955",
      website: "sba.gov/disaster",
      eligibility: "Must be in declared disaster area"
    },
    {
      title: "Utah Emergency Management",
      description: "State-level resources and assistance for disaster recovery.",
      icon: <Home className="h-6 w-6" />,
      contact: "801-538-3400",
      website: "beReady.utah.gov",
      eligibility: "Utah residents"
    },
    {
      title: "Red Cross Disaster Relief",
      description: "Immediate assistance including shelter, food, and emergency supplies.",
      icon: <Heart className="h-6 w-6" />,
      contact: "1-800-733-2767",
      website: "redcross.org",
      eligibility: "Anyone affected by disaster"
    }
  ]

  const mortgageAssistance = [
    {
      title: "Forbearance",
      description: "Temporarily pause mortgage payments during disaster recovery.",
      duration: "Up to 12 months",
      requirements: "Documented disaster impact"
    },
    {
      title: "Payment Deferral",
      description: "Add missed payments to the end of your loan term.",
      duration: "Varies by situation",
      requirements: "Temporary hardship due to disaster"
    },
    {
      title: "Loan Modification",
      description: "Permanently adjust loan terms to make payments more affordable.",
      duration: "Permanent change",
      requirements: "Long-term financial impact"
    }
  ]

  const emergencyContacts = [
    { name: "Emergency Services", number: "911", description: "Life-threatening emergencies" },
    { name: "Non-Emergency Police", number: "801-799-3000", description: "Non-life-threatening situations" },
    { name: "Utah Emergency Management", number: "801-538-3400", description: "State disaster resources" },
    { name: "FEMA Helpline", number: "1-800-621-3362", description: "Federal disaster assistance" },
    { name: "Red Cross", number: "1-800-733-2767", description: "Immediate disaster relief" }
  ]

  return (
    <main className="min-h-screen">
      <SEO
        title="Natural Disaster Resources & Assistance"
        description="Emergency resources, assistance programs, and mortgage relief options for Utah residents affected by natural disasters."
        pathname="/help/disaster"
        image={`${SITE_URL}/modern-office-building.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Help", url: `${SITE_URL}/help` },
          { name: "Disaster Resources", url: `${SITE_URL}/help/disaster` },
        ])}
      />
      <PageBanner
        title="Natural Disaster Resources"
        subtitle="Emergency assistance and recovery support for Utah residents"
      />

      <section className="py-16 bg-background dark:bg-gradient-to-b dark:from-black dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 dark:text-foreground">We're Here to Help</h2>
              <p className="text-lg text-foreground/70 dark:text-foreground/70">
                Natural disasters can be devastating, but you don't have to face them alone. We provide support and resources to help you recover.
              </p>
            </div>

            <div className="bg-muted dark:bg-card/20 rounded-lg p-8 mb-12">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-destructive dark:text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-4 dark:text-foreground">Emergency Contacts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {emergencyContacts.map((contact, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-destructive dark:text-destructive" />
                        <div>
                          <p className="font-medium dark:text-foreground">{contact.name}</p>
                          <p className="text-sm text-foreground/70 dark:text-foreground/70">{contact.number}</p>
                          <p className="text-xs text-foreground/70 dark:text-gray-400">{contact.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 dark:text-foreground">Common Utah Disasters</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {disasterTypes.map((disaster, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-8 w-8 bg-muted rounded-lg flex items-center justify-center text-primary">
                          {disaster.icon}
                        </div>
                        <CardTitle className="dark:text-foreground">{disaster.title}</CardTitle>
                      </div>
                      <CardDescription>{disaster.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-foreground dark:text-gray-300 mb-2">Immediate Actions:</p>
                          <ul className="text-sm text-foreground/70 dark:text-foreground/70 space-y-1">
                            {disaster.immediate.map((action, idx) => (
                              <li key={idx}>• {action}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground dark:text-gray-300 mb-2">After the Event:</p>
                          <ul className="text-sm text-foreground/70 dark:text-foreground/70 space-y-1">
                            {disaster.after.map((action, idx) => (
                              <li key={idx}>• {action}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 dark:text-foreground">Disaster Assistance Programs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assistancePrograms.map((program, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-8 w-8 bg-muted dark:bg-card rounded-lg flex items-center justify-center text-primary dark:text-primary">
                          {program.icon}
                        </div>
                        <CardTitle className="dark:text-foreground">{program.title}</CardTitle>
                      </div>
                      <CardDescription>{program.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-foreground/70" />
                          <span className="text-sm font-medium">{program.contact}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-foreground/70" />
                          <span className="text-sm text-primary dark:text-primary">{program.website}</span>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/70 dark:text-gray-400">Eligibility: {program.eligibility}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 dark:text-foreground">Mortgage Assistance During Disasters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mortgageAssistance.map((assistance, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="dark:text-foreground">{assistance.title}</CardTitle>
                      <CardDescription>{assistance.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-foreground dark:text-gray-300">Duration:</p>
                          <p className="text-sm text-foreground/70 dark:text-foreground/70">{assistance.duration}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground dark:text-gray-300">Requirements:</p>
                          <p className="text-sm text-foreground/70 dark:text-foreground/70">{assistance.requirements}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="bg-muted dark:bg-card/20 rounded-lg p-8 mb-12">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-primary dark:text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold mb-4 dark:text-foreground">Disaster Preparedness Tips</h3>
                  <ul className="space-y-2 text-foreground dark:text-gray-300">
                    <li>• Create an emergency kit with water, food, and supplies for 72 hours</li>
                    <li>• Keep important documents in a waterproof, portable container</li>
                    <li>• Have a family communication plan and meeting place</li>
                    <li>• Know your insurance coverage and keep policy numbers handy</li>
                    <li>• Take photos of your property and belongings for insurance purposes</li>
                    <li>• Sign up for emergency alerts from your local government</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 dark:text-foreground">Need Immediate Help?</h3>
              <p className="text-lg text-foreground/70 dark:text-foreground/70 mb-6">
                If you've been affected by a natural disaster, we're here to help with mortgage assistance and recovery resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/contact">Contact Us for Assistance</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`tel:${SITE_PHONE.replace(/[^+\\d]/g, "")}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call {SITE_PHONE}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/help/hardship">Hardship Assistance</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
