import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Target, 
  TrendingUp, 
  Calendar,
  Trophy,
  Droplets,
  Activity,
  Moon,
  Apple,
  Settings,
  ArrowRight,
  Plus
} from 'lucide-react'
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { supabase, Progress, RegistroDiario as RegistroType } from '../lib/supabase'

export default function Dashboard() {
  const { user, profile } = useAuth()
  const [progressData, setProgressData] = useState<Progress[]>([])
  const [registroHoje, setRegistroHoje] = useState<RegistroType | null>(null)
  const [loading, setLoading] = useState(true)

  const hoje = new Date().toISOString().split('T')[0]

  useEffect(() => {
    if (user) {
      Promise.all([
        fetchProgress(),
        fetchRegistroHoje()
      ]).finally(() => setLoading(false))
    }
  }, [user])

  const fetchProgress = async () => {
    if (!user) return
    const { data } = await supabase.from('progress').select('*').eq('user_id', user.id).order('created_at')
    setProgressData(data || [])
  }

  const fetchRegistroHoje = async () => {
    if (!user) return
    const { data } = await supabase.from('registros_diarios').select('*').eq('user_id', user.id).eq('data', hoje).single()
    if (data) setRegistroHoje(data)
  }

  const getProgressPercentage = (progress: Progress) => {
    if (!progress.progresso || typeof progress.progresso !== 'object' || !('concluidos' in progress.progresso)) return 0;
    const { concluidos } = progress.progresso as { concluidos: string[] };
    const totalItems = 5; // Assuming 5 items per section for now. This should be dynamic.
    return concluidos ? Math.round((concluidos.length / totalItems) * 100) : 0;
  }

  const progressoGeral = progressData.length > 0 
    ? Math.round(progressData.reduce((acc, p) => acc + getProgressPercentage(p), 0) / progressData.length)
    : 0

  const secoes = [
    { id: 'alimentacao', nome: 'Alimentação', descricao: 'Planos de refeição saudáveis', icon: Apple, href: '/alimentacao', cor: 'primary' },
    { id: 'hidratacao', nome: 'Hidratação', descricao: 'Acompanhe sua ingestão de água', icon: Droplets, href: '/hidratacao', cor: 'secondary' },
    { id: 'exercicios', nome: 'Exercícios', descricao: 'Atividades físicas leves', icon: Activity, href: '/exercicios', cor: 'purple' },
    { id: 'sono', nome: 'Sono', descricao: 'Melhore a qualidade do seu sono', icon: Moon, href: '/sono', cor: 'indigo' }
  ]

  const precisaConfiguracaoInicial = !profile?.peso_inicial || !profile?.peso_meta

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <motion.div className="w-16 h-16 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 dark:border-t-primary-400 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {precisaConfiguracaoInicial && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">👋 Bem-vindo(a), {profile?.nome?.split(' ')[0]}!</h2>
                <p className="text-primary-100 mb-4 text-sm sm:text-base">Para personalizar sua experiência, vamos configurar seus dados iniciais.</p>
                <Link to="/configuracao-inicial" className="inline-flex items-center bg-white text-primary-600 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-sm sm:text-base">
                  <Settings className="w-5 h-5 mr-2" />
                  Começar Configuração
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
              <div className="hidden md:block text-6xl sm:text-8xl opacity-20">🎯</div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {[
            { icon: Target, label: "Peso Atual", value: profile?.peso_atual ? `${profile.peso_atual}kg` : '--', color: 'primary' },
            { icon: TrendingUp, label: "Meta", value: profile?.peso_meta ? `${profile.peso_meta}kg` : '--', color: 'secondary' },
            { icon: Calendar, label: "Progresso Geral", value: `${progressoGeral}%`, color: 'purple' },
            { icon: Trophy, label: "Registro Hoje", value: registroHoje ? '✅' : '❌', color: 'yellow' }
          ].map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + index * 0.1 }} className="bg-white dark:bg-dark-800 rounded-xl shadow-md dark:shadow-none p-4 sm:p-6">
              <div className="flex items-center">
                <div className={`p-3 bg-${item.color}-100 dark:bg-${item.color}-500/20 rounded-lg`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-600 dark:text-${item.color}-400`} />
                </div>
                <div className="ml-4">
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
                  <p className="text-lg sm:text-2xl font-bold text-dark dark:text-light">{item.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white dark:bg-dark-800 rounded-2xl shadow-md dark:shadow-none p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-dark dark:text-light mb-1">Registro de Hoje</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">{registroHoje ? 'Parabéns! Você já registrou seus dados hoje 🎉' : 'Que tal registrar como foi seu dia?'}</p>
            </div>
            <Link to="/registro" className="flex-shrink-0 w-full sm:w-auto flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              <Plus className="w-5 h-5 mr-2" />
              {registroHoje ? 'Ver Registro' : 'Registrar Dia'}
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-8">
          <h2 className="text-2xl font-bold text-dark dark:text-light mb-6">Seu Programa</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {secoes.map((secao, index) => {
              const Icon = secao.icon
              const cores = { primary: 'from-primary-400 to-primary-600', secondary: 'from-secondary-400 to-secondary-600', purple: 'from-purple-400 to-purple-600', indigo: 'from-indigo-400 to-indigo-600' }
              return (
                <motion.div key={secao.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + index * 0.1 }} whileHover={{ y: -5, scale: 1.03 }} className="h-full">
                  <Link to={secao.href} className="block bg-white dark:bg-dark-800 rounded-xl shadow-md dark:shadow-none p-6 h-full hover:shadow-xl dark:hover:bg-dark-700 transition-all">
                    <div className={`w-12 h-12 bg-gradient-to-r ${cores[secao.cor as keyof typeof cores]} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-dark dark:text-light mb-2">{secao.nome}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{secao.descricao}</p>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-dark-800 dark:to-dark-800/50 rounded-2xl shadow-md dark:shadow-none p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-dark dark:text-light mb-4">💪 Motivação do Dia</h3>
          <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 mb-4">"Cada dia é uma nova oportunidade para cuidar melhor de você mesmo."</p>
          <p className="text-primary-600 dark:text-primary-400 font-semibold">Você consegue! Continue assim! 🌟</p>
        </motion.div>
      </div>
    </Layout>
  )
}
