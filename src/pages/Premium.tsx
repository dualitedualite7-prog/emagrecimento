import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, CheckCircle } from 'lucide-react'
import Layout from '../components/Layout'
import { supabase } from '../lib/supabase'
import { loadStripe } from '@stripe/stripe-js'
import toast from 'react-hot-toast'
import { useAuth } from '../contexts/AuthContext'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

export default function Premium() {
  const { profile } = useAuth()
  const [loading, setLoading] = useState(false)

  const premiumFeatures = [
    "Planos de refeição 100% personalizados",
    "Receitas exclusivas e fáceis de fazer",
    "Acompanhamento com nutricionistas parceiros",
    "Relatórios de progresso avançados",
    "Acesso a grupos de apoio exclusivos"
  ]

  const handleCheckout = async () => {
    if (profile?.plano === 'premium') {
      toast.success('Você já é um assinante Premium! ✨')
      return
    }

    setLoading(true)
    const priceId = import.meta.env.VITE_STRIPE_PRICE_ID

    if (!priceId) {
      toast.error('ID do plano não configurado.')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.functions.invoke('stripe-checkout', {
        body: { priceId },
      })

      if (error) throw error

      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe.js não carregou.')

      await stripe.redirectToCheckout({ sessionId: data.sessionId })
    } catch (error) {
      console.error('Erro ao iniciar checkout:', error)
      toast.error('Não foi possível iniciar o pagamento. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white rounded-2xl shadow-xl p-8 sm:p-12"
        >
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Star className="w-10 h-10 text-yellow-300" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {profile?.plano === 'premium' ? 'Você é Premium! ✨' : 'Torne-se Premium'}
          </h1>
          <p className="text-primary-100 text-lg mb-8">
            {profile?.plano === 'premium' 
              ? 'Aproveite todos os benefícios exclusivos e continue sua jornada.'
              : 'Desbloqueie todo o potencial do EmagreçaSaúde e acelere seus resultados.'
            }
          </p>
          
          <div className="text-left space-y-4 mb-10 max-w-md mx-auto">
            {premiumFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center"
              >
                <CheckCircle className="w-6 h-6 text-yellow-300 mr-3 flex-shrink-0" />
                <span className="text-base">{feature}</span>
              </motion.div>
            ))}
          </div>

          <motion.button
            onClick={handleCheckout}
            disabled={loading || profile?.plano === 'premium'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-primary-600 font-bold px-10 py-4 rounded-lg shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Aguarde...' : (profile?.plano === 'premium' ? 'Assinatura Ativa' : 'Fazer Upgrade Agora')}
          </motion.button>
        </motion.div>
      </div>
    </Layout>
  )
}
