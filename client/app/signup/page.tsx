"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Navbar } from "@/components/navbar"
import { CheckCircle, Loader2 } from "lucide-react"
import useStore from "../store";
import { useRouter } from "next/navigation";
import { contractProvider, contractSigner, initializeContract } from "../contractTemplate";

export default function SignUpPage() {
  const [username, setUsername] = useState<string>("");
  const [orgname, setOrgname] = useState<string>("");
  const [role, setRole] = useState<"user" | "organization">("organization");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {getWallet} = useStore();
  const navigate = useRouter();

  const handleCompleteRegistration = async () => {
    setIsLoading(true);
    
    try {
      await initializeContract(getWallet());
      const Role:number = role === "user"? 1: 2;
      contractSigner.signUp(role === "user"? username: orgname, Role);
      const walletAdd = getWallet();
      
      contractSigner.on("SignedUp", (walletAdd, username, Role) => {
        setIsLoading(false);
        navigate.push(`/dashboard/${role}`);
      });
      
      // Add a timeout to stop loading if the event doesn't fire
      setTimeout(() => {
        setIsLoading(false);
      }, 30000); // 30 seconds timeout
    } catch (error) {
      console.error("Registration error:", error);
      setIsLoading(false);
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
                Complete Your Profile
              </CardTitle>
              <CardDescription>
                Provide your details to complete registration
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                      <Input id="user-name" placeholder="johndoe" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="org-name">Organization/Event Name</Label>
                      <Input id="org-name" placeholder="Acme Corporation" value={orgname} onChange={(e) => setOrgname(e.target.value)}/>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                onClick={handleCompleteRegistration}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Complete Registration"
                )}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                  Log in
                </Link>
              </div>
            </CardFooter>
          </div>
        </Card>
      </main>
    </div>
  )
}