"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Navbar } from "@/components/navbar"
import { Wallet, ArrowLeft, CheckCircle } from "lucide-react"

export default function SignUpPage() {
  const [step, setStep] = useState<"wallet" | "details">("details")
  const [walletConnected, setWalletConnected] = useState(false)
  const [role, setRole] = useState<"user" | "organization">("organization")

  const handleConnectWallet = () => {
    setWalletConnected(true)

    setTimeout(() => {
      setStep("details")
    }, 1000)
  }

  const handleCompleteRegistration = () => {
    if (typeof window !== "undefined") {
      window.location.href = "/login"
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-grid-white/[0.02] bg-[size:60px_60px]">
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background"></div>
        <Card className="w-full max-w-md border-border/60 bg-card/60 backdrop-blur relative z-10">
          <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-sm"></div>
          <div className="relative rounded-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {step === "wallet" ? "Connect Your Wallet" : "Complete Your Profile"}
              </CardTitle>
              <CardDescription>
                {step === "wallet"
                  ? "Connect your wallet to create an account"
                  : "Provide your details to complete registration"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === "wallet" ? (
                <div className="space-y-4">
                  <div className="flex flex-col gap-4">
                    <Button
                      onClick={handleConnectWallet}
                      className="flex items-center justify-center gap-2 h-14 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    >
                      <Wallet className="h-5 w-5" />
                      <span>Connect MetaMask</span>
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center gap-2 h-14 border-border/60">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 2L3 7L12 12L21 7L12 2Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 17L12 22L21 17"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 12L12 17L21 12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Connect WalletConnect</span>
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center gap-2 h-14 border-border/60">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                        <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M12 9L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <span>Connect Coinbase Wallet</span>
                    </Button>
                  </div>

                  {walletConnected && (
                    <div className="flex items-center justify-center gap-2 p-2 bg-green-500/10 text-green-500 rounded-md">
                      <CheckCircle className="h-4 w-4" />
                      <span>Wallet connected successfully!</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <RadioGroup defaultValue="user" value={role} onValueChange={(value) => setRole(value as "user" | "organization")}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="user" id="user" />
                        <Label htmlFor="user">User (Receive Certificates)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="organization" id="organization" />
                        <Label htmlFor="organization">Organization (Issue Certificates)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {role === "user" ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="user-name">Username</Label>
                        <Input id="user-name" placeholder="johndoe" />
                      </div>
                    
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="org-name">Organization/Event Name</Label>
                        <Input id="org-name" placeholder="Acme Corporation" />
                      </div>
                      
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              {step === "wallet" ? (
                <>
                  <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                      Log in
                    </Link>
                  </div>

                </>
              ) : (
                <>
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    onClick={handleCompleteRegistration}
                  >
                    Complete Registration
                  </Button>
                  <Button
                    variant="ghost"
                    className="flex items-center justify-center gap-2"
                    onClick={handleCompleteRegistration}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Wallet Connection</span>
                  </Button>
                </>
              )}
            </CardFooter>
          </div>
        </Card>
      </main>
    </div>
  )
}