import { Gift, Trophy, Users, Sparkles, Share2 } from "lucide-react"
import { PageBanner } from "@/components/page-banner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SEO from "@/components/seo"
import { generateBreadcrumbJsonLd } from "@/lib/seo"
import { SITE_URL } from "@/lib/site"
import { SweepstakesContent } from "./sweepstakes-content"

export default function SweepstakesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title="Enter Our Sweepstakes | Ondo Real Estate"
        description="Enter Ondo Real Estate's exclusive sweepstakes for a chance to win amazing prizes! Share your referral code for bonus entries."
        pathname="/sweepstakes"
        image={`${SITE_URL}/modern-office-building.png`}
        jsonLd={generateBreadcrumbJsonLd([
          { name: "Home", url: SITE_URL },
          { name: "Sweepstakes", url: `${SITE_URL}/sweepstakes` },
        ])}
      />

      <PageBanner
        title="Win Big with Ondo!"
        subtitle="Enter our exclusive sweepstakes and share your referral code for bonus entries"
      />

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Main Entry Form */}
              <div className="lg:col-span-2">
                <SweepstakesContent />

                {/* Terms and Conditions */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Official Rules</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <strong>Eligibility:</strong> Must be 18 years or older and a legal resident of the United States.
                    </p>
                    <p>
                      <strong>How to Enter:</strong> Complete the entry form above. Each referral you make gets you one bonus entry.
                    </p>
                    <p>
                      <strong>Prize:</strong> Winner will be contacted via email and phone. Prizes vary and are subject to availability.
                    </p>
                    <p>
                      <strong>Drawing:</strong> Winners will be selected randomly from all entries. Each referral you make increases your chances.
                    </p>
                    <p>
                      <strong>Terms:</strong> No purchase necessary. Void where prohibited. By entering, you agree to receive promotional emails from Ondo Real Estate.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Prize Information */}
                <Card className="border-primary bg-gradient-to-br from-primary/5 to-primary/10">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Trophy className="h-6 w-6 text-primary" />
                      <CardTitle>Amazing Prizes</CardTitle>
                    </div>
                    <CardDescription>Win incredible rewards and experiences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Grand Prize</h4>
                        <p className="text-sm text-muted-foreground">
                          $5,000 cash or premium property management service
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Second Prize</h4>
                        <p className="text-sm text-muted-foreground">
                          $2,500 towards your first month's rent or mortgage
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Consolation Prizes</h4>
                        <p className="text-sm text-muted-foreground">
                          20 winners receive premium service discounts
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Referral Bonus */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Users className="h-6 w-6 text-primary" />
                      <CardTitle>Referral Bonus</CardTitle>
                    </div>
                    <CardDescription>Share and earn</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <Share2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">How It Works</h4>
                        <p className="text-muted-foreground">
                          After entering, you'll receive a unique referral code. Share it with friends and family - each person who enters using your code gives you a bonus entry!
                        </p>
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">
                        <strong className="text-primary">Pro Tip:</strong> The more people you refer, the more chances you have to win!
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Entry Tips */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Gift className="h-6 w-6 text-primary" />
                      <CardTitle>Tips to Win</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-bold">1.</span>
                      <span className="text-muted-foreground">Enter with a valid email and phone</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-bold">2.</span>
                      <span className="text-muted-foreground">Share your referral code on social media</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-bold">3.</span>
                      <span className="text-muted-foreground">Each referral = One bonus entry</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary font-bold">4.</span>
                      <span className="text-muted-foreground">Check your email for winner announcements</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-primary py-20">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Ready to Win?
              </h2>
              <p className="text-xl text-foreground mb-8 opacity-90">
                Join the Ondo community and enter for a chance to win amazing prizes. Share your referral code to increase your odds!
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

