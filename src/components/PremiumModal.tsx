import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, X } from 'lucide-react'
import { usePremium } from '../contexts/PremiumContext'
import { Link } from 'react-router-dom'

export default function PremiumModal() {
  const { isModalOpen, closeModal } = usePremium()

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white rounded-2xl shadow-xl p-8 sm:p-10 max-w-md w-full text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-10 h-10 text-yellow-300" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Recurso Premium</h2>
            <p className="text-primary-100 text-base sm:text-lg mb-6">
              Este recurso exclusivo faz parte do nosso plano Premium.
            </p>
            <p className="text-primary-100 text-base sm:text-lg mb-8">
              Assine por apenas <strong className="text-yellow-300">$20/mês</strong> para desbloquear este e muitos outros benefícios!
            </p>

            <Link to="/premium" onClick={closeModal}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-600 font-bold px-8 py-3 rounded-lg shadow-lg text-lg w-full"
              >
                Conheça o Premium
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
