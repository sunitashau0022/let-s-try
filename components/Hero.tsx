'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useWallet } from '../contexts/WalletContext'
import DeployAIModal from './DeployAIModal'

interface HeroProps {
  onDeploy: (name: string, logo: string) => void
}

export default function Hero({ onDeploy }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { publicKey, connectWallet, disconnectWallet, isConnecting } = useWallet()
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleDeployClick = () => {
    if (publicKey) {
      setIsModalOpen(true)
    } else {
      connectWallet()
    }
  }

  const handleDeploy = (name: string, logo: string) => {
    onDeploy(name, logo)
    setIsModalOpen(false)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className={`space-y-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'}`}>
          <div className="space-y-2">
            <h2 className="text-5xl font-bold text-gray-900"><span className="text-red-500">DEPLOY</span> YOUR</h2>
            <h2 className="text-5xl font-bold text-gray-900">AI AGENTS WITH</h2>
            <h2 className="text-5xl font-bold text-gray-900">ZERO FEES</h2>
          </div>
          <p className="text-xl text-gray-600">POWERED By LiamaX</p>
          <div className="flex gap-4">
            {publicKey ? (
              <button
                onClick={disconnectWallet}
                className="px-6 py-3 bg-red-500 text-white rounded-lg font-bold relative group overflow-hidden"
              >
                <span className="relative z-10">Disconnect Wallet</span>
                <div className="absolute inset-0 bg-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300"></div>
              </button>
            ) : (
              <button
                onClick={connectWallet}
                disabled={isConnecting}
                className="px-6 py-3 bg-red-500 text-white rounded-lg font-bold relative group overflow-hidden disabled:opacity-50"
              >
                <span className="relative z-10">
                  {isConnecting ? 'Connecting...' : 'Connect Phantom Wallet'}
                </span>
                <div className="absolute inset-0 bg-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300"></div>
              </button>
            )}
            <button
              onClick={handleDeployClick}
              disabled={!publicKey}
              className="px-6 py-3 bg-transparent border-2 border-red-500 text-red-500 rounded-lg font-bold relative group overflow-hidden disabled:opacity-50"
            >
              <span className="relative z-10">Deploy Now</span>
              <div className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
          {publicKey && (
            <p className="text-sm text-gray-500">Connected: {publicKey.slice(0, 4)}...{publicKey.slice(-4)}</p>
          )}
          {!publicKey && (
            <p className="text-sm text-gray-500">NOTE - This Function Will Be Available After Connecting Your Wallet</p>
          )}
        </div>
        <div className={`relative h-[400px] transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-5'}`} style={{ transitionDelay: '200ms' }}>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wrroiGcKUPmDcsKmCs0Vbiff4wHW2H.png"
            alt="AI Assistant Illustration"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <DeployAIModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDeploy={handleDeploy}
      />
    </div>
  )
}

