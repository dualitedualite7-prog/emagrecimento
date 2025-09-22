import React, { createContext, useContext, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

interface ProgressData {
  concluidos: string[]
  favoritos: string[]
}

interface ConteudoContextType {
  progress: ProgressData
  loading: boolean
  fetchProgress: (secao: string) => Promise<void>
  toggleItem: (secao: string, itemId: string, type: 'concluidos' | 'favoritos') => void
}

const ConteudoContext = createContext<ConteudoContextType | undefined>(undefined)

export function useConteudo() {
  const context = useContext(ConteudoContext)
  if (context === undefined) {
    throw new Error('useConteudo deve ser usado dentro de um ConteudoProvider')
  }
  return context
}

export function ConteudoProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [progress, setProgress] = useState<ProgressData>({ concluidos: [], favoritos: [] })
  const [loading, setLoading] = useState(true)
  const [dbRecordId, setDbRecordId] = useState<string | null>(null)

  const fetchProgress = useCallback(async (secao: string) => {
    if (!user) return
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('progress')
        .select('id, progresso')
        .eq('user_id', user.id)
        .eq('secao', secao)
        .single()

      if (data) {
        setProgress(data.progresso as ProgressData || { concluidos: [], favoritos: [] })
        setDbRecordId(data.id)
      } else {
        setProgress({ concluidos: [], favoritos: [] })
        setDbRecordId(null)
      }
      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        throw error
      }
    } catch (error) {
      console.error('Erro ao buscar progresso do conteúdo:', error)
    } finally {
      setLoading(false)
    }
  }, [user])

  const toggleItem = async (secao: string, itemId: string, type: 'concluidos' | 'favoritos') => {
    if (!user) return

    const newProgress = { ...progress }
    const list = newProgress[type]
    const itemIndex = list.indexOf(itemId)

    if (itemIndex > -1) {
      list.splice(itemIndex, 1)
    } else {
      list.push(itemId)
    }

    setProgress(newProgress) // Update UI immediately

    try {
      const { error } = await supabase
        .from('progress')
        .upsert({
          id: dbRecordId || undefined,
          user_id: user.id,
          secao: secao,
          progresso: newProgress,
          concluido: false // Pode ser atualizado com base em lógica futura
        }, { onConflict: 'user_id, secao' })

      if (error) throw error
      
      // Refetch to get the new ID if it was an insert
      if (!dbRecordId) {
        fetchProgress(secao)
      }
    } catch (error) {
      console.error('Erro ao salvar progresso:', error)
      toast.error('Não foi possível salvar seu progresso.')
      // Reverter a alteração no UI em caso de erro
      fetchProgress(secao)
    }
  }

  const value = {
    progress,
    loading,
    fetchProgress,
    toggleItem
  }

  return (
    <ConteudoContext.Provider value={value}>
      {children}
    </ConteudoContext.Provider>
  )
}
