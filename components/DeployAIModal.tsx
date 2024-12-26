'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface DeployAIModalProps {
  isOpen: boolean
  onClose: () => void
  onDeploy: (name: string, logo: string) => void
}

export default function DeployAIModal({ isOpen, onClose, onDeploy }: DeployAIModalProps) {
  const [name, setName] = useState('')
  const [logo, setLogo] = useState('')
  const [previewLogo, setPreviewLogo] = useState('')

  const handleDeploy = () => {
    if (name && logo) {
      onDeploy(name, logo)
      onClose()
      setName('')
      setLogo('')
      setPreviewLogo('')
    }
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setLogo(url)
    setPreviewLogo(url)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-black">Deploy Your AI Token</h2>
            <input
              type="text"
              placeholder="AI Token Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="text"
              placeholder="Logo URL"
              value={logo}
              onChange={handleLogoChange}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {previewLogo && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Logo Preview:</p>
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-red-500">
                  <Image
                    src={previewLogo}
                    alt="Logo preview"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeploy}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors ml-2"
              >
                Deploy
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

