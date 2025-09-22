import React, { createContext, useContext, useState, useCallback } from 'react'

interface PremiumContextType {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined)

export function usePremium() {
  const context = useContext(PremiumContext)
  if (context === undefined) {
    throw new Error('usePremium deve ser usado dentro de um PremiumProvider')
  }
  return context
}

export function PremiumProvider({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const value = {
    isModalOpen,
    openModal,
    closeModal
  }

  return (
    <PremiumContext.Provider value={value}>
      {children}
    </PremiumContext.Provider>
  )
}
