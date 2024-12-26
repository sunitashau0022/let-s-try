'use client'

import { useState, useEffect } from 'react'
import { Share2, Twitter, Link, Send } from 'lucide-react'
import Image from 'next/image'

export default function Header() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <header className={`relative w-full bg-black text-white overflow-hidden transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Circuit Lines Pattern */}
      <div className="absolute left-0 top-0 h-full w-1/3">
        <div className="circuit-lines">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="h-px bg-gradient-to-r from-red-500/50 to-transparent"
              style={{
                transform: `translateY(${i * 25}px)`,
                width: `${Math.random() * 40 + 60}%`
              }}
            />
          ))}
        </div>
      </div>

      {/* Lightning Bolt Pattern */}
      <div className="absolute right-0 top-0 h-full w-1/3 overflow-hidden">
        <div className="absolute right-0 top-0 w-full h-full bg-gradient-to-bl from-gray-800/50 to-transparent transform rotate-12" />
      </div>

      {/* Header Content */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Top Bar with Logo and Social Links */}
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="relative w-12 h-12 transition-transform hover:scale-110 duration-300 mt-2 ml-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-12-26_12-03-12-removebg-preview-GpdVct9TLjPWJDUWawz8SVDps7Zlie.png"
              alt="CheapAI Logo"
              layout="fill"
              objectFit="contain"
              className="drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300"
            />
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a href="https://cheapai.gitbook.io/cheapai.fun/" className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-white">
              <Share2 className="w-5 h-5" />
            </a>
            <a href="https://twitter.com/cheapaifun" className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-white">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://cheapai.fun" className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-white">
              <Link className="w-5 h-5" />
            </a>
            <a href="mailto:contact@cheapai.fun" className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-white">
              <Send className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Main Header Content */}
        <div className="py-16 text-center relative">
          <h1 className="text-7xl font-bold tracking-tight mb-2">
            <span className="text-white">CHEAP</span>{' '}
            <span className="text-red-500">AI</span>
          </h1>
          <div className="w-32 h-0.5 bg-red-500/30 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            CheapAI: Zero fees on deployment, Create AI agents with automation using LiamaX—next-gen intelligence made simple
          </p>
        </div>
      </div>
    </header>
  )
}

