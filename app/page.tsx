'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import SearchSection from '@/components/SearchSection'
import UserDeployedTokens from '@/components/UserDeployedTokens'
import { WalletProvider } from '@/contexts/WalletContext'

export default function Home() {
  const [userTokens, setUserTokens] = useState<Array<{ name: string; logo: string }>>([])

  const handleDeploy = (name: string, logo: string) => {
    setUserTokens([...userTokens, { name, logo }])
  }

  return (
    <WalletProvider>
      <main className="min-h-screen bg-gray-100 text-gray-900">
        <Header />
        <Hero onDeploy={handleDeploy} />
        <SearchSection />
        <UserDeployedTokens tokens={userTokens} />
      </main>
    </WalletProvider>
  )
}

