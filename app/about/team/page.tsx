import { PageBanner } from "@/components/page-banner"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, Linkedin, Award, GraduationCap, MapPin } from "lucide-react"

export default function TeamPage() {
  const leadership = [
    {
      name: "Pranay Reddy Aleti",
      title: "Founder & CEO",
      image: "/founder-image.png",
      bio: "Pranay founded OnDo Real Estate with a vision to revolutionize property management in Utah. With over 10 years of experience in real estate and technology, he leads our strategic direction and company culture.",
      credentials: ["Utah Real Estate License", "MBA - University of Utah", "Certified Property Manager"],
      email: "pranay@ondorealestate.com",
      phone: "(801) 555-0100",
      linkedin: "https://linkedin.com/in/pranay-aleti"
    }
  ]

  const teamMembers = [
    {
      name: "Sarah Johnson",
      title: "VP of Property Management",
      image: "/professional-woman-smiling.png",
      bio: "Sarah oversees our property management operations and ensures exceptional service delivery across all properties.",
      credentials: ["Utah Real Estate License", "Certified Property Manager", "10+ years experience"],
      department: "Property Management"
    },
    {
      name: "Michael Chen",
      title: "Head of Leasing",
      image: "/professional-man-suit.png",
      bio: "Michael leads our leasing team and has helped thousands of families find their perfect home in Utah.",
      credentials: ["Utah Real Estate License", "Sales Excellence Award 2023", "8+ years experience"],
      department: "Leasing"
    },
    {
      name: "Jennifer Martinez",
      title: "Maintenance Director",
      image: "/professional-woman-glasses.png",
      bio: "Jennifer ensures all our properties are well-maintained and coordinates with our network of trusted vendors.",
      credentials: ["HVAC Certification", "Project Management Certified", "12+ years experience"],
      department: "Maintenance"
    },
    {
      name: "David Thompson",
      title: "Financial Controller",
      image: "/placeholder-user.jpg",
      bio: "David manages our financial operations and provides detailed reporting to property owners.",
      credentials: ["CPA License", "MBA Finance", "15+ years experience"],
      department: "Finance"
    },
    {
      name: "Lisa Park",
      title: "Customer Success Manager",
      image: "/placeholder-user.jpg",
      bio: "Lisa ensures both property owners and tenants have exceptional experiences with our services.",
      credentials: ["Customer Service Excellence", "Utah Real Estate License", "6+ years experience"],
      department: "Customer Success"
    },
    {
      name: "Robert Wilson",
      title: "Technology Director",
      image: "/placeholder-user.jpg",
      bio: "Robert leads our technology initiatives and ensures our systems provide the best user experience.",
      credentials: ["Computer Science Degree", "AWS Certified", "10+ years experience"],
      department: "Technology"
    }
  ]

  const stats = [
    { number: "25+", label: "Team Members" },
    { number: "500+", label: "Properties Managed" },
    { number: "98%", label: "Tenant Satisfaction" },
    { number: "5", label: "Years in Business" }
  ]

  return (
    <main className="min-h-screen">
      <SEO
        title="Our Team | OnDo Real Estate"
        description="Meet the experienced professionals at OnDo Real Estate who are dedicated to providing exceptional property management services across Utah."
        pathname="/about/team"
        image={`${SITE_URL}/modern-office-building.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "About", url: `${SITE_URL}/about` },
          { name: "Team", url: `${SITE_URL}/about/team` },
        ])}
      />
      <PageBanner
        title="Meet Our Team"
        subtitle="Experienced professionals dedicated to your success"
        backgroundImage="/modern-office-building.png"
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">
              Our leadership team brings decades of combined experience in real estate, property management, and customer service.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {leadership.map((leader, index) => (
              <Card key={index} className="mb-12">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="text-center lg:text-left">
                      <div className="relative h-64 w-64 mx-auto lg:mx-0 mb-6 rounded-full overflow-hidden border-4 border-primary">
                        <Image
                          src={leader.image}
                          alt={leader.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex justify-center lg:justify-start gap-4">
                        <a href={`mailto:${leader.email}`} className="text-gray-600 hover:text-primary">
                          <Mail className="h-5 w-5" />
                        </a>
                        <a href={`tel:${leader.phone}`} className="text-gray-600 hover:text-primary">
                          <Phone className="h-5 w-5" />
                        </a>
                        <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                          <Linkedin className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <h3 className="text-2xl font-bold mb-2">{leader.name}</h3>
                      <p className="text-lg text-primary mb-4">{leader.title}</p>
                      <p className="text-gray-600 mb-6">{leader.bio}</p>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Credentials:</h4>
                        <div className="flex flex-wrap gap-2">
                          {leader.credentials.map((cred, credIndex) => (
                            <Badge key={credIndex} variant="secondary">
                              <GraduationCap className="h-3 w-3 mr-1" />
                              {cred}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="relative h-32 w-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-primary">{member.title}</CardDescription>
                    <Badge variant="outline">{member.department}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Credentials:</h4>
                      <div className="space-y-1">
                        {member.credentials.map((cred, credIndex) => (
                          <div key={credIndex} className="text-xs text-gray-600 flex items-center">
                            <Award className="h-3 w-3 mr-1 text-yellow-500" />
                            {cred}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">By the Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
            <p className="text-xl mb-8">
              We're always looking for talented individuals who share our passion for excellence in property management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/about/careers">View Open Positions</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
