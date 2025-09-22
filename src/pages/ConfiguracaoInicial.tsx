import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Scale, Target, Activity, ArrowRight, ArrowLeft } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

export default function ConfiguracaoInicial() {
  const { updateProfile } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    peso_inicial: '',
    peso_atual: '',
    peso_meta: '',
    altura: '',
    idade: '',
    sexo: 'feminino' as 'masculino' | 'feminino' | 'outro',
    nivel_atividade: 'sedentario' as 'sedentario' | 'leve' | 'moderado' | 'intenso',
    objetivo: 'perder_peso' as 'perder_peso' | 'manter_peso' | 'ganhar_massa'
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const updates = {
      peso_inicial: parseFloat(formData.peso_inicial),
      peso_atual: parseFloat(formData.peso_atual),
      peso_meta: parseFloat(formData.peso_meta),
      altura: parseFloat(formData.altura),
      idade: parseInt(formData.idade),
      sexo: formData.sexo,
      nivel_atividade: formData.nivel_atividade,
      objetivo: formData.objetivo
    }

    await updateProfile(updates)
    toast.success('Configuração inicial concluída! Vamos começar sua jornada! 🎉')
    navigate('/dashboard')
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <User className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Vamos nos conhecer melhor</h2>
              <p className="text-gray-600">Essas informações nos ajudam a personalizar seu plano</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Idade</label>
                <input
                  type="number"
                  name="idade"
                  value={formData.idade}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="30"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Altura (cm)</label>
                <input
                  type="number"
                  name="altura"
                  value={formData.altura}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="170"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sexo</label>
                <select
                  name="sexo"
                  value={formData.sexo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="feminino">Feminino</option>
                  <option value="masculino">Masculino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <Scale className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Seus objetivos de peso</h2>
              <p className="text-gray-600">Defina onde você está e onde quer chegar</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Peso Inicial (kg)</label>
                <input
                  type="number"
                  name="peso_inicial"
                  value={formData.peso_inicial}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="75"
                  step="0.1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Peso Atual (kg)</label>
                <input
                  type="number"
                  name="peso_atual"
                  value={formData.peso_atual}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="73"
                  step="0.1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Peso Meta (kg)</label>
                <input
                  type="number"
                  name="peso_meta"
                  value={formData.peso_meta}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="65"
                  step="0.1"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Seu objetivo principal</label>
              <select
                name="objetivo"
                value={formData.objetivo}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="perder_peso">Perder peso de forma saudável</option>
                <option value="manter_peso">Manter o peso atual</option>
                <option value="ganhar_massa">Ganhar massa muscular</option>
              </select>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <Activity className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Seu nível de atividade</h2>
              <p className="text-gray-600">Isso nos ajuda a calcular suas necessidades</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Como é sua rotina de exercícios?</label>
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="nivel_atividade"
                    value="sedentario"
                    checked={formData.nivel_atividade === 'sedentario'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Sedentário</div>
                    <div className="text-sm text-gray-500">Pouco ou nenhum exercício</div>
                  </div>
                </label>

                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="nivel_atividade"
                    value="leve"
                    checked={formData.nivel_atividade === 'leve'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Atividade Leve</div>
                    <div className="text-sm text-gray-500">Exercício leve 1-3 dias por semana</div>
                  </div>
                </label>

                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="nivel_atividade"
                    value="moderado"
                    checked={formData.nivel_atividade === 'moderado'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Atividade Moderada</div>
                    <div className="text-sm text-gray-500">Exercício moderado 3-5 dias por semana</div>
                  </div>
                </label>

                <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="nivel_atividade"
                    value="intenso"
                    checked={formData.nivel_atividade === 'intenso'}
                    onChange={handleChange}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Atividade Intensa</div>
                    <div className="text-sm text-gray-500">Exercício intenso 6-7 dias por semana</div>
                  </div>
                </label>
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Passo {step} de 3</span>
            <span className="text-sm text-gray-600">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-green-500 h-2 rounded-full"
              initial={{ width: "33%" }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <form onSubmit={handleSubmit}>
            {renderStep()}

            <div className="flex justify-between items-center mt-8">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Voltar
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Próximo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Finalizar Configuração
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
