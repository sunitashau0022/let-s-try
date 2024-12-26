'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface TokenCardProps {
  token: {
    name: string
    symbol: string
    mcap: string
    price: string
    image: string
    buyLink: string
  }
  index: number
}

export default function TokenCard({ token, index }: TokenCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative overflow-hidden rounded-xl border-4 border-black shadow-lg hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative z-10 p-6 bg-white"
        initial={false}
        animate={isHovered ? { y: -10 } : { y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center mb-4">
          <motion.div
            initial={false}
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={token.image}
              alt={`${token.name} logo`}
              width={60}
              height={60}
              className="rounded-full border-2 border-red-500"
            />
          </motion.div>
          <div className="ml-4">
            <h3 className="text-xl font-bold text-black">{token.name}</h3>
            <p className="text-sm text-gray-600">{token.symbol}</p>
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-red-600">MCAP:</span> {token.mcap}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-red-600">Price:</span> {token.price}
          </p>
        </div>
        <motion.a
          href={token.buyLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-2 px-4 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold rounded-lg hover:from-red-700 hover:to-red-900 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          BUY NOW
        </motion.a>
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-800 to-black"
        initial={false}
        animate={isHovered ? { opacity: 0.1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

