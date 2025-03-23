"use client";
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Wallet, CheckCircle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { contractSigner, initializeContract } from "../contractTemplate"

declare global {
  interface Window {
    ethereum?: import("ethers").Eip1193Provider;
  }
}

const WaitingModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
      
      <div className="bg-card rounded-lg p-8 shadow-lg z-10 max-w-md w-full text-center">
        <div className="text-6xl mb-4">⏳</div>
        
        <h2 className="text-2xl font-bold mb-2">Verification Pending</h2>
        
        <p className="mb-6 text-muted-foreground">
          Please wait until an administrator approves your verification request.
        </p>
        
        <div className="flex justify-center mb-4">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          This process usually takes 1-2 business days. Thank you for your patience.
        </p>
      </div>
    </div>
  );
};

export default function LoginPage() {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [currentSelected, setCurrentSelected] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [showWaitingModal, setShowWaitingModal] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useRouter();
  // const { addWallet } = useStore();

  useEffect(() => {
    checkConnected();
  }, []);

  // Check if wallet is already connected
  const checkConnected = async () => {
    if (window.ethereum) {
      try {
        const accs = await window.ethereum.request({ method: 'eth_accounts' });
        if (accs && accs.length > 0) {
          setAccounts(accs);
          setCurrentSelected(accs[0]);
          setWalletConnected(true);
        }
      } catch (error) {
        setError("Connection Error!");
        setTimeout(() => setError(""), 2000);
        console.log("Error checking connection:", error);
      }
    } else {
      setError("Please install MetaMask!");
      setTimeout(() => setError(""), 2000);
    }
  };

  // Connect wallet method
  const connectWallet = async (): Promise<void> => {
    if (window.ethereum) {
      try {
        setIsLoading(true);
        const accounts: string[] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccounts(accounts);
        setCurrentSelected(accounts[0]);
        setWalletConnected(true);
      } catch (error: unknown) {
        setError("User refused to connect!");
        setTimeout(() => setError(""), 2000);
        console.error("Error connecting to MetaMask:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("MetaMask is not installed. Please install MetaMask and try again.");
    }
  };

  // Handle account selection
  const handleAccountSelect = (value: string) => {
    setCurrentSelected(value);
  };

  // Handle MetaMask connection
  const handleConnectMetaMask = async () => {
    await connectWallet();
  };

  // Handle connection with role checking
  const handleProceed = async () => {
    setIsLoading(true);
    let new_role = 0;
    
    if (accounts.includes(currentSelected)) {
      try {
        await initializeContract(currentSelected);
        // addWallet(currentSelected);

        const Role = await contractSigner.getRole();
        console.log(Role);
        new_role = Number(Role);
        console.log("Role: ", new_role);
      } catch (error) {
        console.error("Error connecting with selected account:", error);
      }
    } else {
      console.log("connecting...")
      await connectWallet();
    }
    
    setIsLoading(false);
    console.log("User Role: ", new_role);

    // Navigate based on role
    if (new_role == 0) {
      navigate.push("/signup");  // Stranger
    } else if (new_role == 1) {
      navigate.push("/user");
    } else if (new_role == 2) {
      setShowWaitingModal(true);  // VerifierPending
    } else if (new_role == 3) {
      navigate.push("/verifier");  // VerifierAccepted
    } else if (new_role == 4) {
      navigate.push("/admin");
    }
  };

  // Auto-close waiting modal after 5 seconds
  useEffect(() => {
    let timer: number;
    
    if (showWaitingModal) {
      timer = window.setTimeout(() => {
        setShowWaitingModal(false);
        navigate.push('/');
      }, 5000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showWaitingModal, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-grid-white/[0.02] bg-[size:60px_60px]">
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background"></div>
        <Card className="w-full max-w-md border-border/60 bg-card/60 backdrop-blur relative z-10">
          <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-sm"></div>
          <div className="relative rounded-xl overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <svg className="w-12 h-12" viewBox="0 0 318.6 318.6">
                  <path style={{ fill: "#E2761B" }} d="M274.1 35.5l-99.5 73.9L193 65.8z" />
                  <path style={{ fill: "#E4761B" }} d="M44.4 35.5l98.7 74.6-17.5-44.3zm193.9 171.3l-26.5 40.6 56.7 15.6 16.3-55.3zm-204.4.9L50.1 263l56.7-15.6-26.5-40.6z" />
                </svg>
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                Login to Your Account
              </CardTitle>
              <CardDescription className="text-center">
                Connect your wallet to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {!walletConnected ? (
                  <div className="flex flex-col gap-4">
                    <Button
                      onClick={handleConnectMetaMask}
                      className="flex items-center justify-center gap-2 h-14 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Wallet className="h-5 w-5" />
                      )}
                      <span>{isLoading ? "Connecting..." : "Connect MetaMask"}</span>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Success message */}
                    <div className="flex items-center justify-center gap-2 p-2 bg-green-500/10 text-green-500 rounded-md">
                      <CheckCircle className="h-4 w-4" />
                      <span>Wallet connected successfully!</span>
                    </div>
                    
                    {/* Account selection */}
                    <div className="space-y-2">
                      <Label htmlFor="account">Select Account</Label>
                      <Select value={currentSelected} onValueChange={handleAccountSelect}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select an account" />
                        </SelectTrigger>
                        <SelectContent>
                          {accounts.map((account, index) => (
                            <SelectItem key={index} value={account}>
                              {account}
                            </SelectItem>
                          ))}
                          {accounts.length === 0 && (
                            <SelectItem value="new">New Account</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {/* Proceed button */}
                    <Button
                      onClick={handleProceed}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 h-12"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <span>Proceed</span>
                      )}
                    </Button>
                  </div>
                )}

                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
                  Sign up
                </Link>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                By connecting your wallet, you agree to our{" "}
                <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                  Privacy Policy
                </Link>
                .
              </div>
            </CardFooter>
          </div>
        </Card>
      </main>
      <WaitingModal isOpen={showWaitingModal} />
    </div>
  )
}