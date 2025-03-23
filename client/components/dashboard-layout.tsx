"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {  Settings, LogOut, User, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
      <div className="flex">

        <div className="flex-1">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/40 bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Link href="/" className="flex items-center space-x-2 ml-10">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"></div>
            <span className="font-bold text-xl">BlockCert</span>
          </Link>

            <div className="flex flex-1 items-center justify-end gap-4">
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 flex items-center gap-2 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-flex text-sm font-medium">John Doe</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/logout">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="container py-6 md:py-8 px-4 md:px-6">{children}</main>
        </div>
      </div>
  )
}

