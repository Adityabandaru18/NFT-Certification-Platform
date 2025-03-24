"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ArrowLeft, Share2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CertificateDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [endorsements, setEndorsements] = useState([
    {
      id: "end-001",
      name: "John Doe",
      avatar: "JD",
      date: "November 2, 2023",
      comment: "Great work on completing this certification!",
    },
    {
      id: "end-002",
      name: "Alice Smith",
      avatar: "AS",
      date: "November 5, 2023",
      comment: "Impressive skills demonstrated throughout the course.",
    },
  ]);
  const [newEndorsement, setNewEndorsement] = useState("");

  // Mock certificate data
  const certificate = {
    id: params.id,
    title: "Google course completion certificate",
    issuer: "Google",
    recipient: "0x1a2b3c4d5e6f7g8h9i0j",
    issueDate: "October 15, 2023",
    image: "/1.jpg",
    tokenId: "12345",
    contract: "0xabc...789",
    ipfsHash: "QmZ9...",
    description:
      "This certificate verifies that the recipient has successfully completed the Blockchain Developer course, demonstrating proficiency in smart contract development, blockchain architecture, and decentralized application design.",
  };

  const handleAddEndorsement = () => {
    if (!newEndorsement.trim()) return;

    const newEndorsementObj = {
      id: `end-${Date.now()}`,
      name: "You",
      avatar: "YO",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      comment: newEndorsement,
    };

    setEndorsements([...endorsements, newEndorsementObj]);
    setNewEndorsement("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container py-12 px-4 bg-grid-white/[0.02] bg-[size:60px_60px]">
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background"></div>
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm" asChild className="gap-2">
              <Link href="/dashboard/user">
                <ArrowLeft className="h-4 w-4" /> Back to Dashboard
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" /> Share Certificate
            </Button>
          </div>

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
                        src={certificate.image || "/placeholder.svg"}
                        alt={certificate.title}
                        className="w-full max-h-[500px] object-contain"
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

                    <p className="text-sm">{certificate.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Issuer</span>
                        <span className="font-medium">
                          {certificate.issuer}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Recipient</span>
                        <span className="font-medium">
                          {certificate.recipient.substring(0, 6)}...
                          {certificate.recipient.substring(
                            certificate.recipient.length - 4
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Token ID</span>
                        <span className="font-medium">
                          {certificate.tokenId}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Contract</span>
                        <span className="font-medium">
                          {certificate.contract}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">IPFS Hash</span>
                        <span className="font-medium">
                          {certificate.ipfsHash}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>

          <Card className="border-border/60 bg-card/60 backdrop-blur">
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-sm"></div>
            <div className="relative rounded-xl overflow-hidden">
              <CardHeader>
                <CardTitle>Endorsements</CardTitle>
                <CardDescription>
                  Endorsements from peers and professionals add credibility to
                  this certificate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {endorsements.map((endorsement) => (
                    <div
                      key={endorsement.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-card/30 border border-border/40"
                    >
                      <Avatar>
                        <AvatarFallback>{endorsement.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{endorsement.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Endorsed on {endorsement.date}
                        </div>
                        <div className="text-sm mt-1">
                          {endorsement.comment}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4 pt-4 border-t border-border/40">
                  <h3 className="text-lg font-medium">Add Your Endorsement</h3>
                  <Textarea
                    placeholder="Write your endorsement here..."
                    value={newEndorsement}
                    onChange={(e) => setNewEndorsement(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button
                    onClick={handleAddEndorsement}
                    disabled={!newEndorsement.trim()}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    Submit Endorsement
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
