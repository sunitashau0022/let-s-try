'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import Image from 'next/image'

interface TokenResult {
  symbol: string
  name: string
  logo: string
  price: number
  volume24h: number
}

export default function TokenSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<TokenResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!searchTerm) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`https://api.dexscreener.com/latest/dex/search/?q=${searchTerm}`)
      if (!response.ok) {
        throw new Error('Failed to fetch token data')
      }
      const data = await response.json()
      
      // Process the data and extract relevant information
      const tokens: TokenResult[] = data.pairs.slice(0, 5).map((pair: any) => ({
        symbol: pair.baseToken.symbol,
        name: pair.baseToken.name,
        logo: `https://logo.chainbit.xyz/${pair.baseToken.address}`,
        price: parseFloat(pair.priceUsd),
        volume24h: parseFloat(pair.volume.h24),
      }))

      setSearchResults(tokens)
    } catch (err) {
      setError('An error occurred while fetching token data. Please try again.')
      console.error('Error fetching token data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mb-8">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search Token......"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="w-full px-4 py-2 bg-white text-black border-2 border-black rounded-lg focus:outline-none focus:border-red-600 transition-colors"
        />
        <Search
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black cursor-pointer"
          onClick={handleSearch}
        />
      </div>
      
      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((token, index) => (
            <div key={index} className="bg-white rounded-lg p-4 flex items-center space-x-4 shadow-md">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={token.logo}
                  alt={`${token.name} logo`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.svg?height=48&width=48'
                  }}
                />
              </div>
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-gray-900">{token.name} ({token.symbol})</h3>
                <p className="text-sm text-gray-600">Price: ${token.price.toFixed(4)}</p>
                <p className="text-sm text-gray-600">24h Volume: ${token.volume24h.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

