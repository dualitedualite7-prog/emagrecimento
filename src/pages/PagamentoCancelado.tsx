import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { XCircle } from 'lucide-react'
import Layout from '../components/Layout'

export default function PagamentoCancelado() {
  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto text-center flex items-center justify-center h-[calc(100vh-10rem)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 sm:p-12"
        >
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-dark mb-4">
            Pagamento Cancelado
          </h1>
          <p className="text-slate-600 text-lg mb-8">
            Sua transação foi cancelada. Não se preocupe, você pode tentar novamente a qualquer momento.
          </p>
          
          <Link to="/premium">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-secondary-600 text-white font-bold px-10 py-4 rounded-lg shadow-lg text-lg"
            >
              Ver Planos
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  )
}
