"use client"

import Link from "next/link"
import { Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-bold text-xl">
            LOGO
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1">
              <Link href="#" className="text-sm font-medium">
                Home
              </Link>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1">
              <Link href="#" className="text-sm font-medium">
                Inventory
              </Link>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1">
              <Link href="#" className="text-sm font-medium">
                Blog
              </Link>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1">
              <Link href="#" className="text-sm font-medium">
                Shop
              </Link>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1">
              <Link href="#" className="text-sm font-medium">
                Pages
              </Link>
              <ChevronDown className="h-4 w-4" />
            </div>
            <Link href="#" className="text-sm font-medium">
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center relative">
            <Input type="search" placeholder="Search Cars by Audi ID" className="w-64 pr-8 rounded-full" />
            <Search className="h-4 w-4 absolute right-3 text-muted-foreground" />
          </div>
          <Button>Get In</Button>
        </div>
      </div>
    </header>
  )
}
