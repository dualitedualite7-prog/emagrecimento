import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Layout from '../components/Layout'
import { conteudoCategorias } from '../data/conteudoData'

export default function Conteudo() {
  return (
    <Layout>
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-dark dark:text-light mb-2">
            Biblioteca do Conhecimento
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Explore guias, dicas e ferramentas para sua jornada de bem-estar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Object.values(conteudoCategorias).map((categoria, index) => {
            const Icon = categoria.icon
            return (
              <motion.div
                key={categoria.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.03 }}
                className="h-full"
              >
                <Link 
                  to={`/conteudo/${categoria.slug}`} 
                  className={`block bg-white dark:bg-dark-800 rounded-2xl shadow-md dark:shadow-none p-6 h-full hover:shadow-xl dark:hover:bg-dark-700 transition-all border-b-4 ${categoria.borderColor}`}
                >
                  <div className={`w-14 h-14 ${categoria.bgColor} dark:bg-opacity-20 rounded-xl flex items-center justify-center mb-5`}>
                    <Icon className={`w-8 h-8 ${categoria.iconColor} dark:${categoria.iconColor.replace('600', '400')}`} />
                  </div>
                  <h3 className="text-xl font-bold text-dark dark:text-light mb-2">{categoria.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{categoria.description}</p>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}
