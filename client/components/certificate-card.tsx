import type React from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "./ui/button"

interface Endorsement {
  id: string
  name: string
  avatar: string
}

interface Certificate {
  id: string
  title: string
  issuer?: string
  recipient?: string
  issueDate: string
  image: string
  tokenId: string
  endorsements?: Endorsement[]
}

interface CertificateCardProps {
  certificate: Certificate
  actions?: React.ReactNode
}

export function CertificateCard({ certificate, actions }: CertificateCardProps) {
  const { title, issuer, recipient, issueDate, image, endorsements = [] } = certificate

  const formattedDate = new Date(issueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md group h-full">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 transition-opacity group-hover:opacity-100"></div>
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
          <Badge className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-blue-500">NFT</Badge>
        </div>
      </div>
      <CardContent className="p-4 relative">
        <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
        {issuer && <p className="text-sm text-muted-foreground mt-1">Issued by: {issuer}</p>}
        {recipient && (
          <p className="text-sm text-muted-foreground mt-1">
            Recipient: {recipient.substring(0, 6)}...{recipient.substring(recipient.length - 4)}
          </p>
        )}
        <p className="text-sm text-muted-foreground mt-1">Issued: {formattedDate}</p>

        
          
        <Button className="mt-4">View Endorsements</Button>
        
        
      </CardContent>
    </Card>
  )
}

