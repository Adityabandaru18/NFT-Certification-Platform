"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { DashboardLayout } from "@/components/dashboard-layout";
import { CertificateCard } from "@/components/certificate-card";
import { Filter, Upload } from "lucide-react";
import useStore from "@/app/store";
import { contractSigner, initializeContract } from "../../contractTemplate";

interface Certificate {
  title: string;
  recipient: string;
  issuer: string;
  tokenId: string;
  cid?: string; // Pinata CID (optional)
}


export default function OrganizationDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const {getWallet} = useStore();
  const [newCertificate, setNewCertificate] = useState({
    title: "",
    recipient: "",
    file: null as File | null,
  });
  const [uploading, setUploading] = useState(false);

  const uploadToPinata = async () => {
    if (!newCertificate.file) {
      alert("Please upload an image.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", newCertificate.file);

      const pinataMetadata = JSON.stringify({ name: newCertificate.title });
      formData.append("pinataMetadata", pinataMetadata);

      const pinataOptions = JSON.stringify({ cidVersion: 1 });
      formData.append("pinataOptions", pinataOptions);

      const pinataResponse = await fetch(process.env.NEXT_PUBLIC_PINATA_UPLOAD_URL!, {
        method: "POST",
        headers: {
          "pinata_api_key": process.env.NEXT_PUBLIC_PINATA_API_KEY ?? "",
          "pinata_secret_api_key": process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY ?? "",
        },
        body: formData,
      });
      
      console.log(pinataResponse);
      const pinataData = await pinataResponse.json();
      console.log(pinataData);
      if (!pinataData.IpfsHash) throw new Error("Pinata upload failed.");
      const cid = pinataData.IpfsHash;
      let tokenId = '';
      await initializeContract(getWallet());
      try {
        tokenId = await contractSigner.mintCertificate(newCertificate.recipient, newCertificate.title, cid);
      }
      catch(e) {
        return ;
      }
      const newCert: Certificate = {
        title: newCertificate.title,
        recipient: newCertificate.recipient,
        tokenId,
        issuer: getWallet(),
        cid
      };
      alert("Certificate successfully uploaded to Pinata!");

    } catch (error) {
      console.error("Error uploading to Pinata:", error);
      alert("Failed to upload certificate.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Organization Dashboard</h1>
        <p className="text-muted-foreground">Manage and issue NFT certificates</p>

        <Tabs defaultValue="issue">
          
          <TabsContent value="issue">
            <Card>
              <CardHeader>
                <CardTitle>Issue New Certificate</CardTitle>
                <CardDescription>Mint a new NFT certificate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>Certificate Title</Label>
                  <Input
                    placeholder="e.g. Blockchain Developer"
                    onChange={(e) => setNewCertificate({ ...newCertificate, title: e.target.value })}
                  />

                  <Label>Recipient Wallet Address</Label>
                  <Input
                    placeholder="0x..."
                    onChange={(e) => setNewCertificate({ ...newCertificate, recipient: e.target.value })}
                  />

                  <Label>Certificate Image</Label>
                  <div className="border-dashed border-2 p-4 flex items-center">
                    <Upload className="mr-2" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewCertificate({ ...newCertificate, file: e.target.files?.[0] || null })}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={uploadToPinata} disabled={uploading} className="w-full">
                  {uploading ? "Uploading..." : "Mint Certificate"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
