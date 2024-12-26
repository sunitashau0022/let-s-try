'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface UserToken {
  name: string
  logo: string
}

interface UserDeployedTokensProps {
  tokens: UserToken[]
}

export default function UserDeployedTokens({ tokens }: UserDeployedTokensProps) {
  if (tokens.length === 0) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl font-bold mb-6 text-black text-center"
      >
        Your AI Tokens
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tokens.map((token, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative overflow-hidden rounded-xl border-4 border-black shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="relative z-10 p-6 bg-white">
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-full border-2 border-red-500 overflow-hidden">
                  <Image
                    src={token.logo}
                    alt={`${token.name} logo`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-black">{token.name}</h3>
                  <p className="text-sm text-gray-600">AI Token</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                Your AI token has been successfully deployed!
              </p>
              <button className="w-full text-center py-2 px-4 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold rounded-lg hover:from-red-700 hover:to-red-900 transition-colors duration-300">
                Manage Token
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

