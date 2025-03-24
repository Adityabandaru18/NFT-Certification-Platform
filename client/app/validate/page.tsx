"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/navbar";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  AnonymousProvider
} from "../contractTemplate";

export default function ValidatePage() {

  const [walletAddress, setWalletAddress] = useState("0x1a2b3c4d5e6f7g8h9i0j");
  const [tokenId, setTokenId] = useState("12345");
  const [ipfsHash, setIpfsHash] = useState("QmZ9...");
  const [validationResult, setValidationResult] = useState<
    "valid" | "invalid" | "pending"
  >("pending");
  const [isValidating, setIsValidating] = useState(false);
  const [endorsements, setEndorsements] = useState([
    {
      id: "end-001",
      walletAddress: "",
    },
  ]);
  const [issuerName, setissuerName] = useState("");
  const [certificate, setCertificate] = useState({
    title: "Blockchain Developer Certification",
    issuer: "Blockchain Academy",
    issueDate: "October 15, 2023",
  });

  const handleValidate = async () => {
    setIsValidating(true);
    const contractProvider = await AnonymousProvider();
  
    try {
      const contractVerified = await contractProvider.verifyCertificate(walletAddress, ipfsHash, tokenId);
      setCertificate({
        title: contractVerified.title,
        issuer: contractVerified.issuer,
        issueDate: contractVerified.issueDate
      });
      console.log("hii");
      console.log(contractVerified);
      console.log(contractVerified[2]);
      const issuerName = await contractProvider.getUserDetails(contractVerified[2]);
      console.log(issuerName);
      const fetchedEndorsements = await contractProvider.getEndorsers(tokenId);
  
      setissuerName(issuerName);
      setEndorsements(fetchedEndorsements);
      
      setValidationResult("valid");
    } catch (error) {
      console.error("Validation error:", error);
      setValidationResult("invalid");
    } finally {
      setIsValidating(false);
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-12 px-4 bg-grid-white/[0.02] bg-[size:60px_60px]">
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background"></div>
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Certificate Validation
            </h1>
            <p className="text-muted-foreground">
              Verify the authenticity of any NFT certificate on the blockchain
            </p>
          </div>

          <Card className="border-border/60 bg-card/60 backdrop-blur">
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-sm"></div>
            <div className="relative rounded-xl overflow-hidden">
              <CardHeader>
                <CardTitle>Validate Certificate</CardTitle>
                <CardDescription>
                  Enter at least one of the following details to validate a
                  certificate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="wallet-address">Wallet Address</Label>
                  <Input
                    id="wallet-address"
                    placeholder="0x..."
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="token-id">NFT Token ID</Label>
                  <Input
                    id="token-id"
                    placeholder="e.g. 12345"
                    value={tokenId}
                    onChange={(e) => setTokenId(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ipfs-hash">IPFS Hash</Label>
                  <Input
                    id="ipfs-hash"
                    placeholder="Qm..."
                    value={ipfsHash}
                    onChange={(e) => setIpfsHash(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleValidate}
                  disabled={
                    (!walletAddress && !tokenId && !ipfsHash) || isValidating
                  }
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                >
                  {isValidating ? "Validating..." : "Validate Certificate"}
                </Button>
              </CardContent>
            </div>
          </Card>

          {validationResult === "valid" && (
            <div className="space-y-6">
              <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Valid Certificate</AlertTitle>
                <AlertDescription>
                  This certificate has been verified on the blockchain and is
                  authentic.
                </AlertDescription>
              </Alert>

              <Card className="border-border/60 bg-card/60 backdrop-blur">
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-sm"></div>
                <div className="relative rounded-xl overflow-hidden">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-1/3">
                        <div className="rounded-lg overflow-hidden border border-border/60 bg-card/30">
                          <img
                            src={`https://harlequin-giant-goose-484.mypinata.cloud/ipfs/${ipfsHash}`}
                            alt="Certificate"
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3 space-y-4">
                        <div>
                          <Badge className="mb-2 bg-gradient-to-r from-purple-500 to-blue-500">
                            Verified
                          </Badge>
                          <h2 className="text-2xl font-bold">
                            {certificate.title}
                          </h2>
                          <p className="text-muted-foreground">
                            Issued on {certificate.issueDate}
                          </p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Issuer
                            </span>
                            <span className="font-medium">{issuerName}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Issuer Wallet Address
                            </span>
                            <span className="font-medium">
                              {certificate.issuer}
                            </span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-border/40">
                          <h3 className="text-lg font-semibold mb-2">
                            Endorsements
                          </h3>
                          <div className="space-y-3">
                            {endorsements.length > 0 ? (
                              endorsements.map((walletAddress, index) => (
                                <div
                                  className="flex items-start gap-3"
                                  key={index}
                                >
                                  <div className="font-normal">
                                    {walletAddress}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-muted-foreground">
                                No endorsements yet.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          )}

          {validationResult === "invalid" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Invalid Certificate</AlertTitle>
              <AlertDescription>
                We couldn't verify this certificate on the blockchain. Please
                check the details and try again.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </main>
    </div>
  );
}
