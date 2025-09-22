import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Apple, 
  Coffee, 
  Utensils, 
  Clock, 
  CheckCircle, 
  Circle,
  Star,
  Lightbulb,
  Lock
} from 'lucide-react'
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import { usePremium } from '../contexts/PremiumContext'

export default function Alimentacao() {
  const { profile } = useAuth()
  const { openModal } = usePremium()
  const [refeicoesConcluidas, setRefeicoesConcluidas] = useState<string[]>([])

  const isPremiumUser = profile?.plano === 'premium'

  const toggleRefeicao = (id: string, isPremium: boolean) => {
    if (isPremium && !isPremiumUser) {
      openModal()
      return
    }
    setRefeicoesConcluidas(prev => 
      prev.includes(id) 
        ? prev.filter(r => r !== id)
        : [...prev, id]
    )
  }

  const planosAlimentacao = {
    cafe: {
      titulo: "Café da Manhã",
      icon: Coffee,
      horario: "6h - 9h",
      opcoes: [
        {
          id: "cafe1",
          nome: "Opção Nutritiva",
          descricao: "2 fatias de pão integral + 1 ovo mexido + 1 copo de leite",
          calorias: "320 kcal",
          isPremium: false
        },
        {
          id: "cafe2", 
          nome: "Opção Leve",
          descricao: "1 tigela de aveia + frutas vermelhas + 1 colher de mel",
          calorias: "280 kcal",
          isPremium: false
        },
        {
          id: "cafe3",
          nome: "Opção Proteica (Premium)",
          descricao: "Vitamina de banana + whey protein + aveia",
          calorias: "350 kcal",
          isPremium: true
        }
      ]
    },
    almoco: {
      titulo: "Almoço",
      icon: Utensils,
      horario: "12h - 14h",
      opcoes: [
        {
          id: "almoco1",
          nome: "Prato Equilibrado",
          descricao: "Peito de frango grelhado + arroz integral + feijão + salada verde",
          calorias: "450 kcal",
          isPremium: false
        },
        {
          id: "almoco2",
          nome: "Opção Vegetariana",
          descricao: "Quinoa + legumes refogados + grão de bico + azeite",
          calorias: "420 kcal",
          isPremium: false
        },
        {
          id: "almoco3",
          nome: "Peixe Assado (Premium)",
          descricao: "Salmão grelhado + batata doce + brócolis + salada",
          calorias: "480 kcal",
          isPremium: true
        }
      ]
    },
    lanche: {
      titulo: "Lanche da Tarde",
      icon: Apple,
      horario: "15h - 17h",
      opcoes: [
        {
          id: "lanche1",
          nome: "Frutas & Nuts",
          descricao: "1 maçã + 1 punhado de castanhas",
          calorias: "200 kcal",
          isPremium: false
        },
        {
          id: "lanche2",
          nome: "Iogurte Natural",
          descricao: "1 pote de iogurte natural + granola",
          calorias: "180 kcal",
          isPremium: false
        },
        {
          id: "lanche3",
          nome: "Vitamina Verde (Premium)",
          descricao: "Suco verde detox com couve e frutas",
          calorias: "150 kcal",
          isPremium: true
        }
      ]
    },
    jantar: {
      titulo: "Jantar",
      icon: Utensils,
      horario: "18h - 20h",
      opcoes: [
        {
          id: "jantar1",
          nome: "Jantar Leve",
          descricao: "Sopa de legumes + 2 torradas integrais",
          calorias: "300 kcal",
          isPremium: false
        },
        {
          id: "jantar2",
          nome: "Proteína Magra",
          descricao: "Peixe grelhado + purê de mandioquinha + salada",
          calorias: "380 kcal",
          isPremium: false
        },
        {
          id: "jantar3",
          nome: "Vegetariano (Premium)",
          descricao: "Omelete de vegetais + salada de folhas verdes",
          calorias: "320 kcal",
          isPremium: true
        }
      ]
    }
  }

  const dicasImportantes = [
    "Beba água antes das refeições para auxiliar na digestão",
    "Mastigue devagar e saboreie cada garfada",
    "Evite distrações como TV ou celular durante as refeições",
    "Prefira sempre alimentos naturais aos processados",
    "Mantenha horários regulares para suas refeições"
  ]

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🍎 Alimentação Saudável
          </h1>
          <p className="text-gray-600 text-lg">
            Seu plano alimentar personalizado para uma vida mais saudável
          </p>
        </motion.div>

        {/* Progresso do Dia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Progresso de Hoje</h2>
            <span className="text-sm text-gray-500">
              {refeicoesConcluidas.length} de {Object.values(planosAlimentacao).flatMap(r => r.opcoes).length} refeições
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              className="bg-green-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(refeicoesConcluidas.length / Object.values(planosAlimentacao).flatMap(r => r.opcoes).length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Planos de Refeição */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {Object.entries(planosAlimentacao).map(([key, refeicao], index) => {
            const Icon = refeicao.icon
            
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-green-100 rounded-lg mr-4">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{refeicao.titulo}</h3>
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{refeicao.horario}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {refeicao.opcoes.map((opcao) => {
                    const isConcluida = refeicoesConcluidas.includes(opcao.id)
                    const isLocked = opcao.isPremium && !isPremiumUser
                    
                    return (
                      <div
                        key={opcao.id}
                        className={`border-2 rounded-lg p-4 transition-all ${
                          isConcluida && !isLocked
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200'
                        } ${isLocked ? 'cursor-pointer hover:border-yellow-400' : 'cursor-pointer hover:border-green-300'}`}
                        onClick={() => toggleRefeicao(opcao.id, opcao.isPremium)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              {isLocked ? (
                                <Lock className="w-5 h-5 text-yellow-500 mr-2" />
                              ) : isConcluida ? (
                                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400 mr-2" />
                              )}
                              <h4 className={`font-medium ${isLocked ? 'text-gray-500' : 'text-gray-900'}`}>{opcao.nome}</h4>
                            </div>
                            <p className={`text-sm mb-2 ${isLocked ? 'text-gray-400 blur-sm select-none' : 'text-gray-600'}`}>
                              {isLocked ? 'Opção exclusiva para assinantes Premium.' : opcao.descricao}
                            </p>
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                              {opcao.calorias}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Dicas Importantes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center mb-4">
            <Lightbulb className="w-6 h-6 text-yellow-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-900">Dicas para o Sucesso</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dicasImportantes.map((dica, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-start"
              >
                <Star className="w-5 h-5 text-yellow-500 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{dica}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}
