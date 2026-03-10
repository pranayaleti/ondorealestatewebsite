import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { PageBanner } from "@/components/page-banner"
import SEO from "@/components/seo"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SITE_URL } from "@/lib/site"
import Link from "next/link"

// Blog post data for slugs that don't have their own static page directory.
// Slugs with a dedicated app/blog/[slug]/page.tsx are resolved statically by
// Next.js before this dynamic route is reached, so we only list what's missing.
const POSTS: Record<string, {
  title: string
  description: string
  author: string
  published: string
  modified: string
  category: string
  image: string
  excerpt: string
}> = {
  "first-time-home-buyer-guide": {
    title: "First-Time Home Buyer Guide: Everything You Need to Know",
    description: "Complete guide to buying your first home in Utah, from pre-approval to closing day.",
    author: "Sarah Johnson",
    published: "2024-12-10",
    modified: "2024-12-10",
    category: "Buying Guide",
    image: "/suburban-house-garden.png",
    excerpt: "Buying your first home is one of the biggest financial decisions you'll make. This guide walks you through every stage of the process—from getting pre-approved to handing over the keys—so you can move forward with confidence.",
  },
  "property-management-tips-utah-landlords": {
    title: "Property Management Tips for Utah Landlords",
    description: "Essential tips for managing rental properties in Utah's competitive market.",
    author: "Michael Chen",
    published: "2024-12-05",
    modified: "2024-12-05",
    category: "Property Management",
    image: "/property-manager-meeting.png",
    excerpt: "Utah's rental market moves fast. Whether you own a single-family rental in Lehi or a multi-unit building in Salt Lake City, these proven tactics help you reduce vacancy, protect your asset, and keep tenants happy.",
  },
  "mortgage-rate-trends-2025": {
    title: "Mortgage Rate Trends: What to Expect in 2025",
    description: "Analysis of current mortgage rate trends and predictions for the coming year.",
    author: "Jennifer Martinez",
    published: "2024-11-28",
    modified: "2024-11-28",
    category: "Mortgage",
    image: "/modern-townhouse-garage.png",
    excerpt: "After a volatile 2023–2024, buyers and refinancers are watching rates carefully. Here's what the data, Fed signals, and Utah-specific demand suggest for the 2025 mortgage market.",
  },
  "home-staging-tips-that-work": {
    title: "Home Staging Tips That Actually Work",
    description: "Professional staging tips to help your home sell faster and for more money.",
    author: "Lisa Park",
    published: "2024-11-15",
    modified: "2024-11-15",
    category: "Selling",
    image: "/modern-apartment-balcony.png",
    excerpt: "Staged homes sell up to 73% faster and often for more money. These are the moves that actually matter—from decluttering and lighting to the small details buyers notice on first walk-through.",
  },
  "understanding-property-taxes-utah": {
    title: "Understanding Property Taxes in Utah",
    description: "Complete breakdown of Utah property taxes and how they affect your investment.",
    author: "Robert Wilson",
    published: "2024-11-08",
    modified: "2024-11-08",
    category: "Taxes",
    image: "/placeholder.jpg",
    excerpt: "Utah property taxes are calculated differently than most states. Understanding assessment ratios, Truth in Taxation notices, and exemptions is essential for accurate underwriting—especially after a sale.",
  },
}

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return Object.keys(POSTS).map((slug) => ({ slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params
  const post = POSTS[slug]
  if (!post) return {}

  const canonical = `${SITE_URL}/blog/${slug}/`
  return {
    title: `${post.title} | Ondo Real Estate`,
    description: post.description,
    alternates: { canonical },
    openGraph: {
      title: `${post.title} | Ondo Real Estate`,
      description: post.description,
      type: "article",
      publishedTime: post.published,
      modifiedTime: post.modified,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Ondo Real Estate`,
      description: post.description,
    },
  }
}

export default async function BlogPostPage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params
  const post = POSTS[slug]
  if (!post) notFound()

  const pathname = `/blog/${slug}`

  return (
    <main className="min-h-screen">
      <SEO
        title={post.title}
        description={post.description}
        pathname={pathname}
        image={`${SITE_URL}${post.image}`}
        publishedTime={post.published}
        modifiedTime={post.modified}
        author={post.author}
        section={post.category}
        tags={[post.category]}
      />

      <PageBanner
        title={post.title}
        subtitle={post.description}
        backgroundImage={post.image}
      />

      <article className="bg-background py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="flex flex-wrap gap-3 mb-8">
            <Badge variant="secondary">{post.category}</Badge>
          </div>

          <div className="not-prose mb-6">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary/10"
            >
              <Link href="/blog">← Back to blog</Link>
            </Button>
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            <p className="lead text-xl text-foreground/70 mb-6">{post.excerpt}</p>

            <p>
              This article is coming soon. In the meantime, our team is happy to answer any
              questions you have.{" "}
              <Link href="/contact" className="text-primary underline">
                Contact us
              </Link>{" "}
              or{" "}
              <Link href="/blog" className="text-primary underline">
                browse the blog
              </Link>{" "}
              for more insights.
            </p>
          </div>
        </div>
      </article>
    </main>
  )
}
