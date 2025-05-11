import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-xl font-bold mb-4">Dealer Name</h2>
            <p className="text-gray-400 mb-4">Become a proud customer, shopping, shipping, test & more!</p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4">
            <Input type="email" placeholder="Your email address" className="bg-[#1E293B] border-[#334155] text-white" />
            <Button className="bg-primary hover:bg-primary/90">Sign Up</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-t border-[#334155]">
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Finance
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Get in Touch
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Live Chat
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  How it works
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Our Brands</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Aston Martin
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Audi
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  BMW
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Rolls Royce
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Ferrari
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Bugatti
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Lamborghini
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Jaguar
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Vehicles Type</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Pickup
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  SUV
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Truck
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Sedan
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Coupe
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Sport Coupe
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Convertible
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Wagon
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#334155]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-bold mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="text-gray-400 text-sm">© 2023 Dealerz.com. All rights reserved.</div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Terms & Conditions
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm">
                Privacy Notice
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
