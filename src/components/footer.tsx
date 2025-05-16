import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Play, Apple, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function Footer() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    {
      id: 'company',
      title: 'Company',
      links: [
        { href: '#', text: 'About Us' },
        { href: '#', text: 'Careers' },
        { href: '#', text: 'Blog' },
        { href: '#', text: 'FAQs' },
        { href: '#', text: 'Finance' },
        { href: '#', text: 'Contact Us' }
      ]
    },
    {
      id: 'quickLinks',
      title: 'Quick Links',
      links: [
        { href: '#', text: 'Get in Touch' },
        { href: '#', text: 'Help Center' },
        { href: '#', text: 'Live Chat' },
        { href: '#', text: 'How it works' }
      ]
    },
    {
      id: 'brands',
      title: 'Our Brands',
      links: [
        { href: '#', text: 'Aston Martin' },
        { href: '#', text: 'Audi' },
        { href: '#', text: 'BMW' },
        { href: '#', text: 'Rolls Royce' },
        { href: '#', text: 'Ferrari' },
        { href: '#', text: 'Bugatti' },
        { href: '#', text: 'Lamborghini' },
        { href: '#', text: 'Jaguar' }
      ]
    },
    {
      id: 'vehicles',
      title: 'Vehicles Type',
      links: [
        { href: '#', text: 'Pickup' },
        { href: '#', text: 'SUV' },
        { href: '#', text: 'Truck' },
        { href: '#', text: 'Sedan' },
        { href: '#', text: 'Coupe' },
        { href: '#', text: 'Sport Coupe' },
        { href: '#', text: 'Convertible' },
        { href: '#', text: 'Wagon' }
      ]
    }
  ];

  return (
    <footer className="bg-[#0F172A] text-white py-4 px-12 md:px-[100px] z-0" style={{ marginTop: "-80px" }}>
      <div className="container mx-auto px-4 md:py-12 py-1" style={{paddingTop: "150px"}}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-xl font-bold mb-4">Dealer Name</h2>
            <p className="text-gray-400 mb-4">Become a proud customer, shopping, shipping, test & more!</p>
          </div>
          <div className="relative flex items-center justify-end gap-4">
            <Input type="email" placeholder="Your email address" className="py-6 px-6 bg-[#1E293B] border-none text-white rounded-full" />
            <Button className="bg-blue-500 hover:bg-blue-600 px-6 rounded-full absolute right-1">Sign Up</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 py-8 border-t border-[#334155]">
          {sections.map((section) => (
            <div key={section.id}>
              <button 
                onClick={() => toggleSection(section.id)}
                className="w-full mb-4 text-left flex justify-between items-center"
              >
                <h3 className="font-bold">{section.title}</h3>
                <ChevronDown 
                  className={`h-5 w-5 transition-transform md:hidden ${openSections[section.id] ? 'rotate-180' : ''}`}
                />
              </button>
              <ul className={`space-y-2 ${!openSections[section.id] ? 'hidden md:block' : ''}`}>
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-gray-400 hover:text-white">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-bold mb-4">Our Mobile App</h3>
            <div className="flex flex-col gap-4 mb-6 text-white">
              <div className="flex gap-2 justify-center items-center rounded-[16px] bg-white bg-opacity-[7%] px-4 py-3">
                <Apple className="w-8 h-8" />
                <p>Download on the App Store</p>
              </div>
              <div className="flex gap-2 justify-center items-center rounded-[16px] bg-white bg-opacity-[7%] px-4 py-3">
                <Image src="/images/play.svg" alt="Google Play" width={25} height={30} />
                <p>Get in on Google Play</p>  
              </div>
            </div>
            <h3 className="font-bold mb-4">Connect With Us</h3>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-[7%] hover:rounded-full px-3 pt-3 pb-1">
                <Facebook className="h-4 w-4 text-white" fill="white" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-[7%] hover:rounded-full p-3">
                <Twitter className="h-4 w-4 text-white" fill="white" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-[7%] hover:rounded-full p-3">
                <Instagram className="h-4 w-4 text-white" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-[7%] hover:rounded-full p-3">
                <Linkedin className="h-4 w-4 text-white" fill="white" />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-4 md:pt-8 border-t border-[#334155]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">© 2025 Dealerz.com. All rights reserved.</div>
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
