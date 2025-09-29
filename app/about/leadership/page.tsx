import { PageBanner } from "@/components/page-banner"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Award, Target, Heart, Building, Phone, Mail } from "lucide-react"

export default function LeadershipPage() {
  const leadership = [
    {
      name: "Pranay Reddy Aleti",
      title: "Founder & CEO",
      image: "/professional-man-suit.png",
      bio: "With over 15 years of experience in real estate and property management, Pranay founded OnDo Real Estate with a vision to revolutionize the industry through technology and exceptional service.",
      expertise: ["Real Estate Strategy", "Technology Innovation", "Team Leadership"],
      achievements: ["Utah Business 40 Under 40", "REALTOR® of the Year 2022", "Top 1% of Utah Agents"]
    },
    {
      name: "Sarah Johnson",
      title: "Chief Operating Officer",
      image: "/professional-woman-glasses.png",
      bio: "Sarah brings 12 years of operational excellence to OnDo Real Estate, overseeing day-to-day operations and ensuring our clients receive the highest level of service.",
      expertise: ["Operations Management", "Process Optimization", "Client Relations"],
      achievements: ["MBA from University of Utah", "Certified Property Manager", "15+ Years Industry Experience"]
    },
    {
      name: "Michael Chen",
      title: "Chief Technology Officer",
      image: "/professional-man-suit.png",
      bio: "Michael leads our technology initiatives, developing innovative solutions that streamline the real estate process for both clients and agents.",
      expertise: ["Software Development", "Data Analytics", "Digital Innovation"],
      achievements: ["Computer Science PhD", "Former Google Engineer", "Patent Holder"]
    },
    {
      name: "Emily Rodriguez",
      title: "Head of Property Management",
      image: "/professional-woman-smiling.png",
      bio: "Emily oversees our property management division, ensuring that property owners and tenants have exceptional experiences throughout their journey with us.",
      expertise: ["Property Management", "Tenant Relations", "Maintenance Coordination"],
      achievements: ["Certified Property Manager", "10+ Years Experience", "99% Tenant Satisfaction Rate"]
    }
  ]

  const values = [
    {
      title: "Integrity",
      description: "We conduct business with the highest ethical standards, always putting our clients' interests first.",
      icon: <Award className="h-6 w-6" />
    },
    {
      title: "Innovation",
      description: "We embrace technology and new ideas to provide better service and outcomes for our clients.",
      icon: <Target className="h-6 w-6" />
    },
    {
      title: "Excellence",
      description: "We strive for excellence in everything we do, from client service to property management.",
      icon: <Building className="h-6 w-6" />
    },
    {
      title: "Community",
      description: "We're committed to giving back to the Utah communities we serve and call home.",
      icon: <Heart className="h-6 w-6" />
    }
  ]

  return (
    <main className="min-h-screen">
      <SEO
        title="Leadership Team | OnDo Real Estate"
        description="Meet the experienced leadership team at OnDo Real Estate. Learn about our founders, executives, and their commitment to excellence in Utah real estate."
        pathname="/about/leadership"
        image={`${SITE_URL}/professional-man-suit.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "About", url: `${SITE_URL}/about` },
          { name: "Leadership", url: `${SITE_URL}/about/leadership` },
        ])}
      />
      <PageBanner
        title="Leadership Team"
        subtitle="Meet the experienced professionals leading OnDo Real Estate"
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 dark:text-foreground">Our Leadership</h2>
              <p className="text-lg text-muted-foreground dark:text-muted-foreground">
                Our leadership team brings decades of combined experience in real estate, property management, and customer service to deliver exceptional results for our clients.
              </p>
            </div>

            <div className="space-y-12 mb-16">
              {leadership.map((leader, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="h-64 md:h-full bg-muted dark:bg-card flex items-center justify-center">
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-32 h-32 rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="md:w-2/3 p-8">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-2xl dark:text-foreground">{leader.name}</CardTitle>
                        <CardDescription className="text-lg text-primary font-medium">{leader.title}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <p className="text-muted-foreground dark:text-muted-foreground mb-6">{leader.bio}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-2 dark:text-foreground">Areas of Expertise</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground dark:text-muted-foreground">
                              {leader.expertise.map((area, idx) => (
                                <li key={idx}>• {area}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-2 dark:text-foreground">Key Achievements</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground dark:text-muted-foreground">
                              {leader.achievements.map((achievement, idx) => (
                                <li key={idx}>• {achievement}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-center dark:text-foreground">Our Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <Card key={index} className="text-center">
                    <CardHeader>
                      <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 text-primary">
                        {value.icon}
                      </div>
                      <CardTitle className="dark:text-foreground">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{value.description}</CardDescription>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="bg-muted dark:bg-muted rounded-lg p-8 mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center dark:text-foreground">Our Commitment to You</h3>
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-lg text-muted-foreground dark:text-muted-foreground mb-6">
                  Our leadership team is committed to providing exceptional service and results for every client. 
                  We believe in transparency, communication, and going above and beyond to exceed expectations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/contact">Meet Our Team</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/about/team">View All Team Members</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6 dark:text-foreground">Ready to Work with Us?</h3>
              <p className="text-lg text-muted-foreground dark:text-muted-foreground mb-6">
                Our leadership team is here to help you achieve your real estate goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <Link href="/contact">Get Started Today</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="tel:+15551234567">
                    <Phone className="h-4 w-4 mr-2" />
                    Call (555) 123-4567
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
