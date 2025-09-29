import { PageBanner } from "@/components/page-banner"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, ArrowRight, Home, TrendingUp, DollarSign, MapPin } from "lucide-react"

export default function BlogPage() {
  const featuredPost = {
    title: "Utah Real Estate Market Update: December 2024",
    excerpt: "The Utah real estate market continues to show strong growth with median home prices increasing 8% year-over-year. Here's what buyers and sellers need to know.",
    author: "Pranay Reddy Aleti",
    date: "December 15, 2024",
    readTime: "5 min read",
    category: "Market Updates",
    image: "/modern-office-building.png",
    slug: "utah-real-estate-market-update-december-2024"
  }

  const blogPosts = [
    {
      title: "First-Time Home Buyer Guide: Everything You Need to Know",
      excerpt: "Complete guide to buying your first home in Utah, from pre-approval to closing day.",
      author: "Sarah Johnson",
      date: "December 10, 2024",
      readTime: "8 min read",
      category: "Buying Guide",
      image: "/suburban-house-garden.png",
      slug: "first-time-home-buyer-guide"
    },
    {
      title: "Property Management Tips for Utah Landlords",
      excerpt: "Essential tips for managing rental properties in Utah's competitive market.",
      author: "Michael Chen",
      date: "December 5, 2024",
      readTime: "6 min read",
      category: "Property Management",
      image: "/property-manager-meeting.png",
      slug: "property-management-tips-utah-landlords"
    },
    {
      title: "Mortgage Rate Trends: What to Expect in 2025",
      excerpt: "Analysis of current mortgage rate trends and predictions for the coming year.",
      author: "Jennifer Martinez",
      date: "November 28, 2024",
      readTime: "4 min read",
      category: "Mortgage",
      image: "/modern-townhouse-garage.png",
      slug: "mortgage-rate-trends-2025"
    },
    {
      title: "Why Utah is the Best Place to Invest in Real Estate",
      excerpt: "Discover why Utah's real estate market offers excellent investment opportunities.",
      author: "David Thompson",
      date: "November 20, 2024",
      readTime: "7 min read",
      category: "Investment",
      image: "/city-map-with-pin.png",
      slug: "why-utah-best-real-estate-investment"
    },
    {
      title: "Home Staging Tips That Actually Work",
      excerpt: "Professional staging tips to help your home sell faster and for more money.",
      author: "Lisa Park",
      date: "November 15, 2024",
      readTime: "5 min read",
      category: "Selling",
      image: "/modern-apartment-balcony.png",
      slug: "home-staging-tips-that-work"
    },
    {
      title: "Understanding Property Taxes in Utah",
      excerpt: "Complete breakdown of Utah property taxes and how they affect your investment.",
      author: "Robert Wilson",
      date: "November 8, 2024",
      readTime: "6 min read",
      category: "Taxes",
      image: "/placeholder.jpg",
      slug: "understanding-property-taxes-utah"
    }
  ]

  const categories = [
    { name: "Market Updates", count: 12, icon: <TrendingUp className="h-4 w-4" /> },
    { name: "Buying Guide", count: 8, icon: <Home className="h-4 w-4" /> },
    { name: "Property Management", count: 15, icon: <User className="h-4 w-4" /> },
    { name: "Mortgage", count: 6, icon: <DollarSign className="h-4 w-4" /> },
    { name: "Investment", count: 9, icon: <TrendingUp className="h-4 w-4" /> },
    { name: "Selling", count: 7, icon: <Home className="h-4 w-4" /> }
  ]

  return (
    <main className="min-h-screen">
      <SEO
        title="Real Estate Blog | OnDo Real Estate"
        description="Stay updated with the latest Utah real estate news, market insights, and expert advice from OnDo Real Estate professionals."
        pathname="/blog"
        image={`${SITE_URL}/modern-office-building.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
        ])}
      />
      <PageBanner
        title="Real Estate Blog"
        subtitle="Expert insights, market updates, and helpful tips for Utah real estate"
        backgroundImage="/modern-office-building.png"
      />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Featured Post */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold mb-8">Featured Article</h2>
              <Card className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-full">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="secondary">{featuredPost.category}</Badge>
                      <span className="text-sm text-muted-foreground">{featuredPost.readTime}</span>
                    </div>
                    <CardTitle className="text-2xl mb-4">{featuredPost.title}</CardTitle>
                    <CardDescription className="text-lg mb-6">{featuredPost.excerpt}</CardDescription>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {featuredPost.date}
                      </div>
                    </div>
                    <Button asChild>
                      <Link href={`/blog/${featuredPost.slug}`}>
                        Read More
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Blog Posts */}
              <div className="lg:col-span-3">
                <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogPosts.map((post, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">{post.category}</Badge>
                          <span className="text-xs text-muted-foreground">{post.readTime}</span>
                        </div>
                        <CardTitle className="text-lg mb-2 line-clamp-2">{post.title}</CardTitle>
                        <CardDescription className="mb-4 line-clamp-2">{post.excerpt}</CardDescription>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {post.date}
                          </div>
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/blog/${post.slug}`}>
                            Read More
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {categories.map((category, index) => (
                        <Link key={index} href={`/blog/category/${category.name.toLowerCase().replace(' ', '-')}`}>
                          <div className="flex items-center justify-between p-2 rounded hover:bg-muted cursor-pointer">
                            <div className="flex items-center gap-2">
                              {category.icon}
                              <span className="text-sm">{category.name}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">{category.count}</Badge>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Stay Updated</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get the latest real estate insights delivered to your inbox.
                    </p>
                    <Button asChild className="w-full">
                      <Link href="/contact">Subscribe to Newsletter</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Make Your Real Estate Move?</h2>
            <p className="text-xl mb-8">
              Our expert team is here to help you navigate Utah's real estate market with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Get Expert Advice</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-card hover:text-primary">
                <Link href="/properties">Browse Properties</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
