"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard-layout"
import { CertificateCard } from "@/components/certificate-card"
import { Search, Filter, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data for certificates
const certificates = [
  {
    id: "cert-001",
    title: "Blockchain Developer Certification",
    issuer: "Blockchain Academy",
    issueDate: "2023-10-15",
    image: "/placeholder.svg?height=400&width=300",
    tokenId: "12345",
    endorsements: [
      { id: "end-001", name: "John Doe", avatar: "JD" },
      { id: "end-002", name: "Alice Smith", avatar: "AS" },
      { id: "end-003", name: "Robert Johnson", avatar: "RJ" },
    ],
  },
  {
    id: "cert-002",
    title: "Smart Contract Auditor",
    issuer: "Security Guild",
    issueDate: "2023-09-22",
    image: "/placeholder.svg?height=400&width=300",
    tokenId: "12346",
    endorsements: [
      { id: "end-004", name: "Emma Wilson", avatar: "EW" },
      { id: "end-005", name: "Michael Brown", avatar: "MB" },
    ],
  },
]

export default function UserDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [walletSearch, setWalletSearch] = useState("")
  const [searchResults, setSearchResults] = useState<any[] | null>(null)
  const [isSearching, setIsSearching] = useState(false)

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.tokenId.includes(searchQuery),
  )

  const handleWalletSearch = () => {
    if (!walletSearch) return

    setIsSearching(true)

    setTimeout(() => {
      if (walletSearch.startsWith("0x")) {
        setSearchResults([
          {
            id: "cert-003",
            title: "Web3 Product Manager",
            issuer: "Product School",
            issueDate: "2023-11-05",
            image: "/placeholder.svg?height=400&width=300",
            tokenId: "12347",
            endorsements: [],
          },
          {
            id: "cert-004",
            title: "DeFi Fundamentals",
            issuer: "DeFi Alliance",
            issueDate: "2023-08-30",
            image: "/placeholder.svg?height=400&width=300",
            tokenId: "12348",
            endorsements: [{ id: "end-006", name: "Sarah Lee", avatar: "SL" }],
          },
        ])
      } else {
        setSearchResults([])
      }
      setIsSearching(false)
    }, 1000)
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
          <p className="text-muted-foreground">View your certificates and search for others</p>
        </div>

        <Tabs defaultValue="my-certificates" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-5">
            <TabsTrigger value="my-certificates">My Certificates</TabsTrigger>
            <TabsTrigger value="search">Search by Wallet</TabsTrigger>
          </TabsList>

          <TabsContent value="my-certificates" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="relative w-full md:w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search certificates..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCertificates.map((certificate) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  actions={
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/user/certificate/${certificate.id}`}>View Details</Link>
                    </Button>
                  }
                />
              ))}
            </div>

            {filteredCertificates.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No certificates found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We couldn't find any certificates matching your search.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <Card className="border-border/60 bg-card/60 backdrop-blur">
              <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-sm"></div>
              <div className="relative rounded-xl overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Enter wallet address (0x...)"
                        value={walletSearch}
                        onChange={(e) => setWalletSearch(e.target.value)}
                      />
                    </div>
                    <Button
                      onClick={handleWalletSearch}
                      disabled={!walletSearch || isSearching}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    >
                      {isSearching ? "Searching..." : "Search"}
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>

            {searchResults === null ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-muted p-3">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Search for certificates</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Enter a wallet address to find associated certificates
                </p>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Search Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map((certificate) => (
                    <CertificateCard
                      key={certificate.id}
                      certificate={certificate}
                      actions={
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/certificate/${certificate.id}`}>View Details</Link>
                        </Button>
                      }
                    />
                  ))}
                </div>
              </div>
            ) : (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>No certificates found</AlertTitle>
                <AlertDescription>No certificates were found for the wallet address {walletSearch}.</AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

