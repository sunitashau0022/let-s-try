'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface WalletContextType {
  publicKey: string | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  isConnecting: boolean
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  const connectWallet = async () => {
    setIsConnecting(true)
    try {
      if ('solana' in window) {
        const provider = (window as any).solana
        if (provider.isPhantom) {
          await provider.connect()
          const publicKey = provider.publicKey.toString()
          setPublicKey(publicKey)
        } else {
          console.warn('Phantom wallet not found')
        }
      } else {
        console.warn('Solana object not found')
      }
    } catch (error) {
      console.error('Error connecting to Phantom wallet:', error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    if ('solana' in window) {
      const provider = (window as any).solana
      if (provider.isPhantom) {
        provider.disconnect()
      }
    }
    setPublicKey(null)
  }

  useEffect(() => {
    const checkConnection = async () => {
      if ('solana' in window) {
        const provider = (window as any).solana
        if (provider.isPhantom) {
          try {
            const response = await provider.connect({ onlyIfTrusted: true })
            setPublicKey(response.publicKey.toString())
          } catch (error) {
            // User has not previously connected, do nothing
          }
        }
      }
    }
    checkConnection()
  }, [])

  return (
    <WalletContext.Provider value={{ publicKey, connectWallet, disconnectWallet, isConnecting }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

