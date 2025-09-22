import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis de ambiente do Supabase não encontradas')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos TypeScript para o banco de dados
export interface Profile {
  id: string
  email: string
  nome: string
  plano: 'gratuito' | 'premium'
  peso_inicial?: number
  peso_atual?: number
  peso_meta?: number
  altura?: number
  idade?: number
  sexo?: 'masculino' | 'feminino' | 'outro'
  nivel_atividade?: 'sedentario' | 'leve' | 'moderado' | 'intenso'
  objetivo?: 'perder_peso' | 'manter_peso' | 'ganhar_massa'
  created_at: string
  updated_at: string
}

export interface Progress {
  id: string
  user_id: string
  secao: string
  progresso: Record<string, any>
  concluido: boolean
  created_at: string
  updated_at: string
}

export interface RegistroDiario {
  id: string
  user_id: string
  data: string
  peso?: number
  agua_litros?: number
  exercicio_minutos?: number
  sono_horas?: number
  humor?: number
  energia?: number
  observacoes?: string
  created_at: string
}
