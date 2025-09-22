import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Edit, Save, X } from 'lucide-react'
import Layout from '../components/Layout'
import { useAuth } from '../contexts/AuthContext'
import toast from 'react-hot-toast'
import { Profile } from '../lib/supabase'

export default function Perfil() {
  const { profile, updateProfile, loading: authLoading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<Profile>>({})

  useEffect(() => {
    if (profile) {
      setFormData({
        nome: profile.nome,
        email: profile.email,
        idade: profile.idade,
        altura: profile.altura,
        peso_atual: profile.peso_atual,
        peso_meta: profile.peso_meta,
        nivel_atividade: profile.nivel_atividade,
      })
    }
  }, [profile])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    const updates = {
      ...formData,
      idade: formData.idade ? parseInt(String(formData.idade)) : undefined,
      altura: formData.altura ? parseFloat(String(formData.altura)) : undefined,
      peso_atual: formData.peso_atual ? parseFloat(String(formData.peso_atual)) : undefined,
      peso_meta: formData.peso_meta ? parseFloat(String(formData.peso_meta)) : undefined,
    }
    await updateProfile(updates)
    setIsEditing(false)
  }

  const renderField = (label: string, value: any) => (
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-lg text-dark font-medium">{value || 'Não definido'}</p>
    </div>
  )

  const renderEditableField = (label: string, name: keyof Profile, type = 'text', options?: string[]) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      {type === 'select' ? (
        <select
          name={name}
          value={formData[name] as string || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          {options?.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name] || ''}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      )}
    </div>
  )

  if (authLoading) {
    return <Layout><div className="p-6">Carregando perfil...</div></Layout>
  }

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg"
        >
          <div className="p-6 sm:p-8 border-b border-slate-200">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <User className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-dark">{profile?.nome}</h1>
                  <p className="text-slate-600">{profile?.email}</p>
                </div>
              </div>
              <div>
                {isEditing ? (
                  <div className="flex space-x-2">
                    <button onClick={handleSave} className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                      <Save className="w-4 h-4 mr-2" /> Salvar
                    </button>
                    <button onClick={() => setIsEditing(false)} className="flex items-center bg-slate-200 text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-300">
                      <X className="w-4 h-4 mr-2" /> Cancelar
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="flex items-center bg-secondary-100 text-secondary-800 px-4 py-2 rounded-lg hover:bg-secondary-200">
                    <Edit className="w-4 h-4 mr-2" /> Editar Perfil
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-dark mb-6">Minhas Informações</h2>
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {renderEditableField('Nome', 'nome')}
                {renderEditableField('Idade', 'idade', 'number')}
                {renderEditableField('Altura (cm)', 'altura', 'number')}
                {renderEditableField('Peso Atual (kg)', 'peso_atual', 'number')}
                {renderEditableField('Peso Meta (kg)', 'peso_meta', 'number')}
                {renderEditableField('Nível de Atividade', 'nivel_atividade', 'select', ['sedentario', 'leve', 'moderado', 'intenso'])}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {renderField('Nome', profile?.nome)}
                {renderField('Email', profile?.email)}
                {renderField('Idade', profile?.idade ? `${profile.idade} anos` : null)}
                {renderField('Altura', profile?.altura ? `${profile.altura} cm` : null)}
                {renderField('Peso Atual', profile?.peso_atual ? `${profile.peso_atual} kg` : null)}
                {renderField('Peso Meta', profile?.peso_meta ? `${profile.peso_meta} kg` : null)}
                {renderField('Nível de Atividade', profile?.nivel_atividade)}
                {renderField('Plano', profile?.plano)}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </Layout>
  )
}
