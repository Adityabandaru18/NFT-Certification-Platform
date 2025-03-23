import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Shield, Award, CheckCircle, ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col gap-4">

                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                  NFT-Based 
                  </span>{" "}
                  Digital Certificates
                </h1>
                <p className="text-xl text-muted-foreground">
                Transform traditional certificates into secure NFTs that can't be forged, 
                with instant verification and endorsements that grow your credential's value over time.                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                    <Link href="/signup">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/validate">Validate Certificate</Link>
                  </Button>
                </div>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl"></div>
                <div className="relative aspect-square w-full max-w-md rounded-xl border border-border/40 bg-card/30 p-2 backdrop-blur">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl"></div>
                  <div className="relative h-full w-full rounded-lg border border-border/40 bg-card p-4 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
                        <span className="font-semibold">BlockCert</span>
                      </div>
                      <div className="px-2 py-1 rounded-md bg-green-500/10 text-green-500 text-xs font-medium">
                        Verified
                      </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <Award className="h-24 w-24 mx-auto mb-4 text-purple-500" />
                        <h3 className="text-xl font-bold">Blockchain Developer</h3>
                        <p className="text-muted-foreground mt-1">Certificate of Excellence</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border/40 flex justify-between items-center">
                      <div className="text-xs text-muted-foreground">
                        Issued to: <span className="font-medium text-foreground">0x1a2...9i0j</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Token ID: <span className="font-medium text-foreground">#12345</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-background/80">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Choose BlockCert?</h2>
              <p className="mt-4 text-xl text-muted-foreground">
                Our platform offers secure, transparent, and verifiable certificates
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/30 p-6 transition-all hover:shadow-md hover:shadow-purple-500/5">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
                    <Shield className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Secure & Immutable</h3>
                  <p className="text-muted-foreground">
                    Certificates are stored on the blockchain, making them tamper-proof and permanently verifiable.
                  </p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/30 p-6 transition-all hover:shadow-md hover:shadow-blue-500/5">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                    <Award className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Issue & Manage</h3>
                  <p className="text-muted-foreground">
                    Organizations can easily issue, track, and manage certificates through an intuitive dashboard.
                  </p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-xl border border-border/40 bg-card/30 p-6 transition-all hover:shadow-md hover:shadow-green-500/5">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
                <div className="relative">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">Instant Verification</h3>
                  <p className="text-muted-foreground">
                    Validate any certificate instantly using our Etherscan-like verification interface.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="relative overflow-hidden rounded-xl border border-border/40 bg-card/30 p-8 md:p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Get Started?</h2>
                <p className="mt-4 max-w-[600px] text-xl text-muted-foreground">
                  Join organizations and individuals already using BlockCert for secure, verifiable credentials.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                    <Link href="/signup">Create Account</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/about">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

