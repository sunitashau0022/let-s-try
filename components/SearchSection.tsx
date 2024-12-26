'use client'

import { motion } from 'framer-motion'
import TokenSearch from './TokenSearch'
import { tokens } from '../config/siteConfig'
import TokenCard from './TokenCard'

export default function SearchSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <TokenSearch />
      
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl font-bold mb-6 text-black text-center"
      >
        Trending Tokens To Buy
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tokens.map((token, index) => (
          <TokenCard key={token.symbol} token={token} index={index} />
        ))}
      </div>
    </motion.div>
  )
}

