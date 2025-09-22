import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Scale, 
  Droplets, 
  Activity, 
  Moon, 
  Smile, 
  Battery, 
  Calendar,
  Save,
  TrendingUp
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase, RegistroDiario as RegistroType } from '../lib/supabase'
import toast from 'react-hot-toast'

export default function RegistroDiario() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    peso: '',
    agua_litros: '',
    exercicio_minutos: '',
    sono_horas: '',
    humor: 5,
    energia: 5,
    observacoes: ''
  })
  const [loading, setLoading] = useState(false)
  const [registroExistente, setRegistroExistente] = useState<RegistroType | null>(null)
  const [historico, setHistorico] = useState<RegistroType[]>([])

  const hoje = new Date().toISOString().split('T')[0]

  useEffect(() => {
    if (user) {
      carregarRegistroHoje()
      carregarHistorico()
    }
  }, [user])

  const carregarRegistroHoje = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('registros_diarios')
        .select('*')
        .eq('user_id', user.id)
        .eq('data', hoje)
        .single()

      if (data) {
        setRegistroExistente(data)
        setFormData({
          peso: data.peso?.toString() || '',
          agua_litros: data.agua_litros?.toString() || '',
          exercicio_minutos: data.exercicio_minutos?.toString() || '',
          sono_horas: data.sono_horas?.toString() || '',
          humor: data.humor || 5,
          energia: data.energia || 5,
          observacoes: data.observacoes || ''
        })
      }
    } catch (error) {
      console.error('Erro ao carregar registro:', error)
    }
  }

  const carregarHistorico = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('registros_diarios')
        .select('*')
        .eq('user_id', user.id)
        .order('data', { ascending: false })
        .limit(7)

      if (data) {
        setHistorico(data)
      }
    } catch (error) {
      console.error('Erro ao carregar histórico:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSliderChange = (name: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)

    try {
      const dadosRegistro = {
        user_id: user.id,
        data: hoje,
        peso: formData.peso ? parseFloat(formData.peso) : null,
        agua_litros: formData.agua_litros ? parseFloat(formData.agua_litros) : null,
        exercicio_minutos: formData.exercicio_minutos ? parseInt(formData.exercicio_minutos) : null,
        sono_horas: formData.sono_horas ? parseFloat(formData.sono_horas) : null,
        humor: formData.humor,
        energia: formData.energia,
        observacoes: formData.observacoes || null
      }

      let error
      if (registroExistente) {
        ({ error } = await supabase
          .from('registros_diarios')
          .update(dadosRegistro)
          .eq('id', registroExistente.id))
      } else {
        ({ error } = await supabase
          .from('registros_diarios')
          .insert([dadosRegistro]))
      }

      if (error) throw error

      toast.success('Registro salvo com sucesso! 🎉')
      carregarRegistroHoje()
      carregarHistorico()
    } catch (error) {
      console.error('Erro ao salvar registro:', error)
      toast.error('Erro ao salvar registro')
    } finally {
      setLoading(false)
    }
  }

  const getHumorEmoji = (valor: number) => {
    const emojis = ['😢', '😕', '😐', '🙂', '😊']
    return emojis[valor - 1] || '😐'
  }

  const getEnergiaEmoji = (valor: number) => {
    const emojis = ['🔋⚪⚪⚪⚪', '🔋🔋⚪⚪⚪', '🔋🔋🔋⚪⚪', '🔋🔋🔋🔋⚪', '🔋🔋🔋🔋🔋']
    return emojis[valor - 1] || '🔋🔋🔋⚪⚪'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Calendar className="w-6 h-6 text-green-600 mr-3" />
            <h1 className="text-xl font-bold text-gray-900">Registro Diário</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário Principal */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Como foi seu dia hoje?
                </h2>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {new Date().toLocaleDateString('pt-BR')}
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Medições Físicas */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Scale className="w-5 h-5 mr-2 text-green-600" />
                    Medições
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Peso (kg)
                      </label>
                      <input
                        type="number"
                        name="peso"
                        value={formData.peso}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="70.5"
                        step="0.1"
                      />
                    </div>
                  </div>
                </div>

                {/* Hábitos Diários */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Droplets className="w-5 h-5 mr-2 text-blue-600" />
                    Hábitos Saudáveis
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Água (litros)
                      </label>
                      <input
                        type="number"
                        name="agua_litros"
                        value={formData.agua_litros}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="2.5"
                        step="0.1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Exercício (minutos)
                      </label>
                      <input
                        type="number"
                        name="exercicio_minutos"
                        value={formData.exercicio_minutos}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="30"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sono (horas)
                      </label>
                      <input
                        type="number"
                        name="sono_horas"
                        value={formData.sono_horas}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="8"
                        step="0.5"
                      />
                    </div>
                  </div>
                </div>

                {/* Estado Emocional */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Smile className="w-5 h-5 mr-2 text-yellow-600" />
                    Como você se sente?
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Humor {getHumorEmoji(formData.humor)}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={formData.humor}
                        onChange={(e) => handleSliderChange('humor', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Muito triste</span>
                        <span>Muito feliz</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Energia {getEnergiaEmoji(formData.energia)}
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={formData.energia}
                        onChange={(e) => handleSliderChange('energia', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Sem energia</span>
                        <span>Muita energia</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observações (opcional)
                  </label>
                  <textarea
                    name="observacoes"
                    value={formData.observacoes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Como foi seu dia? Alguma dificuldade ou conquista?"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white font-semibold rounded-lg transition-colors"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {loading ? 'Salvando...' : 'Salvar Registro'}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Histórico Rápido */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Últimos 7 dias
              </h3>

              <div className="space-y-3">
                {historico.map((registro, index) => (
                  <div
                    key={registro.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(registro.data).toLocaleDateString('pt-BR')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {registro.peso ? `${registro.peso}kg` : 'Sem peso'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {registro.humor && (
                        <span className="text-lg">{getHumorEmoji(registro.humor)}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {historico.length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  Nenhum registro encontrado
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
