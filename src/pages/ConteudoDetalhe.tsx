import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle, Circle, Star, Lock } from 'lucide-react'
import Layout from '../components/Layout'
import { conteudoCategorias } from '../data/conteudoData'
import { useConteudo } from '../contexts/ConteudoContext'
import { useAuth } from '../contexts/AuthContext'
import { usePremium } from '../contexts/PremiumContext'

export default function ConteudoDetalhe() {
  const { slug } = useParams<{ slug: string }>()
  const { profile } = useAuth()
  const { progress, loading, fetchProgress, toggleItem } = useConteudo()
  const { openModal } = usePremium()
  
  const categoria = Object.values(conteudoCategorias).find(c => c.slug === slug)
  const [activeTab, setActiveTab] = useState(categoria?.content.tabs[0].name || '')

  useEffect(() => {
    if (slug) {
      fetchProgress(`conteudo-${slug}`)
    }
  }, [slug, fetchProgress])

  if (!categoria) {
    return (
      <Layout>
        <div className="p-6 text-center">Conteúdo não encontrado.</div>
      </Layout>
    )
  }

  const Icon = categoria.icon
  const isPremiumUser = profile?.plano === 'premium'

  const handleToggle = (itemId: string, type: 'concluidos' | 'favoritos', isPremium: boolean) => {
    if (isPremium && !isPremiumUser) {
      openModal()
      return
    }
    if (slug) {
      toggleItem(`conteudo-${slug}`, itemId, type)
    }
  }

  return (
    <Layout>
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/conteudo" className="inline-flex items-center text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 group">
            <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
            Voltar para a Biblioteca
          </Link>
          <div className="flex items-start sm:items-center gap-4 sm:gap-6 mb-8">
            <div className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 ${categoria.bgColor} dark:bg-opacity-20 rounded-2xl flex items-center justify-center`}>
              <Icon className={`w-8 h-8 sm:w-10 sm:h-10 ${categoria.iconColor} dark:${categoria.iconColor.replace('600', '400')}`} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-dark dark:text-light">{categoria.title}</h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">{categoria.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Abas de Navegação */}
        <div className="border-b border-slate-200 dark:border-dark-700 mb-8">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            {categoria.content.tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`relative whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.name
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-dark-600'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Conteúdo das Abas */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {loading ? (
              <div className="text-center p-8 text-slate-500 dark:text-slate-400">Carregando progresso...</div>
            ) : (
              <div className="space-y-4">
                {categoria.content.tabs.find(t => t.name === activeTab)?.items.map((item, index) => {
                  const isConcluido = progress.concluidos.includes(item.id)
                  const isFavorito = progress.favoritos.includes(item.id)
                  const isLocked = item.isPremium && !isPremiumUser

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`bg-white dark:bg-dark-800 rounded-xl shadow-sm dark:shadow-none p-5 transition-all ${isConcluido && !isLocked ? 'bg-green-50/50 dark:bg-primary-900/20' : ''} ${isLocked ? 'cursor-pointer' : ''}`}
                      onClick={() => isLocked && openModal()}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 flex items-start">
                          <button onClick={() => handleToggle(item.id, 'concluidos', item.isPremium)} className="mr-4 mt-1" disabled={isLocked}>
                            {isLocked ? (
                              <Lock className="w-6 h-6 text-yellow-500" />
                            ) : isConcluido ? (
                              <CheckCircle className="w-6 h-6 text-primary-500" />
                            ) : (
                              <Circle className="w-6 h-6 text-slate-300 dark:text-dark-600 hover:text-primary-400" />
                            )}
                          </button>
                          <div>
                            <h3 className={`font-semibold text-dark dark:text-light ${isConcluido && !isLocked ? 'line-through text-slate-500 dark:text-slate-400' : ''} ${isLocked ? 'text-slate-500 dark:text-slate-400' : ''}`}>
                              {item.title}
                            </h3>
                            {item.content && <p className={`text-slate-600 dark:text-slate-400 text-sm mt-1 ${isLocked ? 'blur-sm select-none' : ''}`}>{isLocked ? 'Conteúdo premium exclusivo para assinantes.' : item.content}</p>}
                          </div>
                        </div>
                        <button onClick={() => handleToggle(item.id, 'favoritos', item.isPremium)} className="p-1" disabled={isLocked}>
                          <Star className={`w-5 h-5 transition-colors ${isFavorito && !isLocked ? 'text-yellow-500 fill-current' : 'text-slate-300 dark:text-dark-600 hover:text-yellow-400'}`} />
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Layout>
  )
}
