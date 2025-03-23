"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard-layout"
import { CertificateCard } from "@/components/certificate-card"
import { Search, Filter, AlertCircle, ThumbsUp, MessageSquare, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// Dummy user accounts for demonstration
const dummyUsers = [
  { id: "user-001", name: "John Doe", avatar: "JD", walletAddress: "0x1a2b3c4d5e6f7g8h9i0j" },
  { id: "user-002", name: "Alice Smith", avatar: "AS", walletAddress: "0x2b3c4d5e6f7g8h9i0j1a" },
  { id: "user-003", name: "Robert Johnson", avatar: "RJ", walletAddress: "0x3c4d5e6f7g8h9i0j1a2b" },
  { id: "user-004", name: "Emma Wilson", avatar: "EW", walletAddress: "0x4d5e6f7g8h9i0j1a2b3c" },
  { id: "user-005", name: "Michael Brown", avatar: "MB", walletAddress: "0x5e6f7g8h9i0j1a2b3c4d" },
  { id: "user-006", name: "Sarah Lee", avatar: "SL", walletAddress: "0x6f7g8h9i0j1a2b3c4d5e" },
  { id: "user-007", name: "David Clark", avatar: "DC", walletAddress: "0x7g8h9i0j1a2b3c4d5e6f" },
  { id: "user-008", name: "Jennifer White", avatar: "JW", walletAddress: "0x8h9i0j1a2b3c4d5e6f7g" },
  { id: "user-009", name: "You", avatar: "YO", walletAddress: "0x9i0j1a2b3c4d5e6f7g8h" },
]

// Mock data for certificates
const certificates = [
  {
    id: "cert-001",
    title: "Blockchain Developer Certification",
    issuer: "Blockchain Academy",
    issueDate: "2023-10-15",
    image: "/1.jpg",
    tokenId: "12345",
    endorsements: [
      {
        id: "end-001",
        userId: "user-001",
        name: "John Doe",
        avatar: "JD",
        date: "November 2, 2023",
        comment: "Great work on completing this certification!",
      },
      {
        id: "end-002",
        userId: "user-002",
        name: "Alice Smith",
        avatar: "AS",
        date: "November 5, 2023",
        comment: "Impressive skills demonstrated throughout the course.",
      },
      {
        id: "end-003",
        userId: "user-003",
        name: "Robert Johnson",
        avatar: "RJ",
        date: "November 10, 2023",
        comment: "This certification shows your dedication to blockchain technology.",
      },
    ],
  },
  {
    id: "cert-002",
    title: "Smart Contract Auditor",
    issuer: "Security Guild",
    issueDate: "2023-09-22",
    image: "/2.jpg",
    tokenId: "12346",
    endorsements: [
      {
        id: "end-004",
        userId: "user-004",
        name: "Emma Wilson",
        avatar: "EW",
        date: "September 25, 2023",
        comment: "Your attention to detail in smart contract auditing is impressive.",
      },
      {
        id: "end-005",
        userId: "user-005",
        name: "Michael Brown",
        avatar: "MB",
        date: "October 3, 2023",
        comment: "I've worked with this person and can vouch for their auditing skills.",
      },
    ],
  },
]

// Wallet search results with different endorsement scenarios
const walletSearchResults = {
  "0x1a2b3c4d5e6f7g8h9i0j": [
    {
      id: "cert-003",
      title: "Web3 Product Manager",
      issuer: "Product School",
      issueDate: "2023-11-05",
      image: "/3.jpg",
      tokenId: "12347",
      recipient: "0x1a2b3c4d5e6f7g8h9i0j",
      endorsements: [
        {
          id: "end-006",
          userId: "user-006",
          name: "Sarah Lee",
          avatar: "SL",
          date: "November 15, 2023",
          comment: "John has excellent product management skills in the Web3 space.",
        },
        {
          id: "end-007",
          userId: "user-007",
          name: "David Clark",
          avatar: "DC",
          date: "November 20, 2023",
          comment: "I've collaborated with John on several Web3 projects. Highly recommended!",
        },
      ],
    },
    {
      id: "cert-004",
      title: "DeFi Fundamentals",
      issuer: "DeFi Alliance",
      issueDate: "2023-08-30",
      image: "/4.jpg",
      tokenId: "12348",
      recipient: "0x1a2b3c4d5e6f7g8h9i0j",
      endorsements: [],
    },
  ],
  "0x2b3c4d5e6f7g8h9i0j1a": [
    {
      id: "cert-005",
      title: "NFT Creation Masterclass",
      issuer: "Digital Art Academy",
      issueDate: "2023-10-10",
      image: "/5.jpg",
      tokenId: "12349",
      recipient: "0x2b3c4d5e6f7g8h9i0j1a",
      endorsements: [
        {
          id: "end-008",
          userId: "user-008",
          name: "Jennifer White",
          avatar: "JW",
          date: "October 15, 2023",
          comment: "Alice's NFT creations are truly innovative and unique.",
        },
      ],
    },
  ],
  "0x3c4d5e6f7g8h9i0j1a2b": [
    {
      id: "cert-006",
      title: "Blockchain Architecture",
      issuer: "Tech Institute",
      issueDate: "2023-07-15",
      image: "/1.jpg",
      tokenId: "12350",
      recipient: "0x3c4d5e6f7g8h9i0j1a2b",
      endorsements: [
        {
          id: "end-009",
          userId: "user-001",
          name: "John Doe",
          avatar: "JD",
          date: "July 20, 2023",
          comment: "Robert has a deep understanding of blockchain architecture.",
        },
        {
          id: "end-010",
          userId: "user-002",
          name: "Alice Smith",
          avatar: "AS",
          date: "July 25, 2023",
          comment: "Excellent technical skills and knowledge of blockchain systems.",
        },
        {
          id: "end-011",
          userId: "user-004",
          name: "Emma Wilson",
          avatar: "EW",
          date: "August 1, 2023",
          comment: "Robert helped me understand complex blockchain concepts.",
        },
        {
          id: "end-012",
          userId: "user-005",
          name: "Michael Brown",
          avatar: "MB",
          date: "August 5, 2023",
          comment: "One of the best blockchain architects I've worked with.",
        },
      ],
    },
  ],
}

export default function UserDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [walletSearch, setWalletSearch] = useState("")
  const [searchResults, setSearchResults] = useState<any[] | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [endorsementText, setEndorsementText] = useState("")
  const [endorsingCertId, setEndorsingCertId] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const filteredCertificates = certificates.filter(
    (cert) =>
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.tokenId.includes(searchQuery),
  )

  const handleWalletSearch = () => {
    if (!walletSearch) return

    setIsSearching(true)
    setSuccessMessage(null)

    // Simulate API call with our dummy data
    setTimeout(() => {
      // Check if we have dummy data for this wallet
      if (walletSearchResults[walletSearch]) {
        setSearchResults(walletSearchResults[walletSearch])
      } else if (walletSearch.startsWith("0x")) {
        // Fallback for any wallet address starting with 0x
        setSearchResults([
          {
            id: "cert-generic",
            title: "Generic Blockchain Certificate",
            issuer: "Blockchain Foundation",
            issueDate: "2023-12-01",
            image: "/placeholder.svg?height=400&width=300",
            tokenId: "99999",
            recipient: walletSearch,
            endorsements: [],
          },
        ])
      } else {
        setSearchResults([])
      }
      setIsSearching(false)
    }, 1000)
  }

  const handleEndorsement = (certId: string) => {
    if (!endorsementText.trim()) return

    // Find the certificate to endorse
    const updatedResults = searchResults?.map((cert) => {
      if (cert.id === certId) {
        // Add the new endorsement
        const newEndorsement = {
          id: `end-${Date.now()}`,
          userId: "user-009", // Current user
          name: "You",
          avatar: "YO",
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          comment: endorsementText,
        }

        return {
          ...cert,
          endorsements: [...cert.endorsements, newEndorsement],
        }
      }
      return cert
    })

    setSearchResults(updatedResults || null)
    setEndorsementText("")
    setEndorsingCertId(null)

    // Show success message
    setSuccessMessage("Your endorsement has been added successfully!")
    setTimeout(() => setSuccessMessage(null), 3000)
  }

  const handleQuickEndorse = (certId: string) => {
    // Find the certificate to endorse
    const updatedResults = searchResults?.map((cert) => {
      if (cert.id === certId) {
        // Add a quick endorsement
        const newEndorsement = {
          id: `end-${Date.now()}`,
          userId: "user-009", // Current user
          name: "You",
          avatar: "YO",
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          comment: "I endorse this certificate.",
        }

        return {
          ...cert,
          endorsements: [...cert.endorsements, newEndorsement],
        }
      }
      return cert
    })

    setSearchResults(updatedResults || null)

    // Show success message
    setSuccessMessage("Certificate endorsed successfully!")
    setTimeout(() => setSuccessMessage(null), 3000)
  }

  // Function to get user name from wallet address
  const getUserNameFromWallet = (wallet: string) => {
    const user = dummyUsers.find((u) => u.walletAddress === wallet)
    if (user) return user.name

    // If not found, return shortened wallet address
    return `${wallet.substring(0, 6)}...${wallet.substring(wallet.length - 4)}`
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
          <p className="text-muted-foreground">View your certificates and search for others</p>
        </div>

        {successMessage && (
          <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="my-certificates" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
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
                      <Link href={`/certificate/${certificate.id}`}>View Details</Link>
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
                      className="bg-gradient-to-r from-purple-500 to-blue-500"
                    >
                      {isSearching ? "Searching..." : "Search"}
                    </Button>
                  </div>
                  {/* <div className="mt-4 text-sm text-muted-foreground">
                    <p>Try searching these demo wallet addresses:</p>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>
                        <code className="bg-muted px-1 py-0.5 rounded">0x1a2b3c4d5e6f7g8h9i0j</code> - John Doe (2
                        certificates, 1 without endorsements)
                      </li>
                      <li>
                        <code className="bg-muted px-1 py-0.5 rounded">0x2b3c4d5e6f7g8h9i0j1a</code> - Alice Smith (1
                        certificate with 1 endorsement)
                      </li>
                      <li>
                        <code className="bg-muted px-1 py-0.5 rounded">0x3c4d5e6f7g8h9i0j1a2b</code> - Robert Johnson (1
                        certificate with many endorsements)
                      </li>
                    </ul>
                  </div> */}
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
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Certificates for {getUserNameFromWallet(walletSearch)}</h3>
                  <Badge variant="outline" className="px-2 py-1">
                    {searchResults.length} Certificate{searchResults.length !== 1 ? "s" : ""}
                  </Badge>
                </div>

                <div className="space-y-4">
                  {searchResults.map((certificate) => (
                    <Card key={certificate.id} className="overflow-hidden transition-all group">
                      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 transition-opacity group-hover:opacity-100 blur-sm"></div>
                      <div className="relative rounded-xl overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/4 aspect-square md:aspect-auto">
                              <img
                                src={certificate.image || "/placeholder.svg"}
                                alt={certificate.title}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="p-4 md:w-3/4 flex flex-col">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="font-semibold text-lg">{certificate.title}</h3>
                                  <Badge className="bg-gradient-to-r from-purple-500 to-blue-500">NFT</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">Issued by: {certificate.issuer}</p>
                                <p className="text-sm text-muted-foreground">
                                  Issued on:{" "}
                                  {new Date(certificate.issueDate).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </p>
                                <p className="text-sm text-muted-foreground">Token ID: {certificate.tokenId}</p>

                                {certificate.endorsements.length > 0 && (
                                  <div className="mt-3">
                                    <p className="text-sm font-medium">Endorsements:</p>
                                    <div className="flex items-center mt-1">
                                      <TooltipProvider>
                                        <div className="flex -space-x-2">
                                          {certificate.endorsements.slice(0, 3).map((endorsement: any) => (
                                            <Tooltip key={endorsement.id}>
                                              <TooltipTrigger asChild>
                                                <Avatar className="h-6 w-6 border-2 border-background">
                                                  <AvatarFallback className="text-[10px]">
                                                    {endorsement.avatar}
                                                  </AvatarFallback>
                                                </Avatar>
                                              </TooltipTrigger>
                                              <TooltipContent>
                                                <p className="font-medium">{endorsement.name}</p>
                                                <p className="text-xs text-muted-foreground">{endorsement.date}</p>
                                              </TooltipContent>
                                            </Tooltip>
                                          ))}
                                        </div>
                                      </TooltipProvider>
                                      <span className="ml-2 text-sm text-muted-foreground">
                                        {certificate.endorsements.length} endorsement
                                        {certificate.endorsements.length !== 1 ? "s" : ""}
                                      </span>

                                      {certificate.endorsements.length > 3 && (
                                        <Dialog>
                                          <DialogTrigger asChild>
                                            <Button variant="link" size="sm" className="ml-1 h-auto p-0">
                                              View all
                                            </Button>
                                          </DialogTrigger>
                                          <DialogContent>
                                            <DialogHeader>
                                              <DialogTitle>All Endorsements</DialogTitle>
                                              <DialogDescription>
                                                {certificate.endorsements.length} endorsements for "{certificate.title}"
                                              </DialogDescription>
                                            </DialogHeader>
                                            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                                              {certificate.endorsements.map((endorsement: any) => (
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
                                                    <div className="text-sm mt-1">{endorsement.comment}</div>
                                                  </div>
                                                </div>
                                              ))}
                                            </div>
                                          </DialogContent>
                                        </Dialog>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/40">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="gap-1"
                                  onClick={() => handleQuickEndorse(certificate.id)}
                                >
                                  <ThumbsUp className="h-4 w-4" />
                                  <span>Quick Endorse</span>
                                </Button>

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="gap-1">
                                      <MessageSquare className="h-4 w-4" />
                                      <span>Add Comment</span>
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Endorse Certificate</DialogTitle>
                                      <DialogDescription>
                                        Add your endorsement for "{certificate.title}"
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                      <Textarea
                                        placeholder="Write your endorsement here..."
                                        value={endorsingCertId === certificate.id ? endorsementText : ""}
                                        onChange={(e) => {
                                          setEndorsementText(e.target.value)
                                          setEndorsingCertId(certificate.id)
                                        }}
                                        className="min-h-[100px]"
                                      />
                                    </div>
                                    <DialogFooter>
                                      <Button
                                        onClick={() => handleEndorsement(certificate.id)}
                                        disabled={!endorsementText.trim()}
                                        className="bg-gradient-to-r from-purple-500 to-blue-500"
                                      >
                                        Submit Endorsement
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>

                                <Button variant="outline" size="sm" asChild className="ml-auto">
                                  <Link href={`/certificate/${certificate.id}`}>View Details</Link>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
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

