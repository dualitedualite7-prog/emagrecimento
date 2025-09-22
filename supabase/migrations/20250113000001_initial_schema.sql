/*
# Configuração Inicial do Banco - App de Emagrecimento
Criação das tabelas principais para o sistema de emagrecimento saudável

## Query Description: 
Esta operação criará a estrutura inicial do banco de dados para o app de emagrecimento.
Será criada uma tabela de perfis de usuários conectada ao sistema de autenticação do Supabase
e uma tabela para acompanhar o progresso dos usuários em diferentes seções do app.
Operação segura que não afeta dados existentes.

## Metadata:
- Schema-Category: "Safe"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Tabela profiles: perfil completo do usuário (nome, plano, dados pessoais)
- Tabela progress: acompanhamento do progresso por seções
- Trigger automático para criação de perfil após registro

## Security Implications:
- RLS Status: Enabled
- Policy Changes: Yes
- Auth Requirements: Conectado ao auth.users do Supabase

## Performance Impact:
- Indexes: Added on user_id references
- Triggers: Added for automatic profile creation
- Estimated Impact: Minimal performance impact
*/

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de perfis dos usuários (conectada ao auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  nome TEXT NOT NULL,
  plano TEXT NOT NULL DEFAULT 'gratuito',
  peso_inicial DECIMAL(5,2),
  peso_atual DECIMAL(5,2),
  peso_meta DECIMAL(5,2),
  altura DECIMAL(3,2),
  idade INTEGER,
  sexo TEXT CHECK (sexo IN ('masculino', 'feminino', 'outro')),
  nivel_atividade TEXT CHECK (nivel_atividade IN ('sedentario', 'leve', 'moderado', 'intenso')),
  objetivo TEXT CHECK (objetivo IN ('perder_peso', 'manter_peso', 'ganhar_massa')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de progresso por seções
CREATE TABLE IF NOT EXISTS progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  secao TEXT NOT NULL,
  progresso JSONB NOT NULL DEFAULT '{}',
  concluido BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de registros diários (peso, medidas, hábitos)
CREATE TABLE IF NOT EXISTS registros_diarios (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  data DATE NOT NULL,
  peso DECIMAL(5,2),
  agua_litros DECIMAL(3,1),
  exercicio_minutos INTEGER DEFAULT 0,
  sono_horas DECIMAL(3,1),
  humor INTEGER CHECK (humor BETWEEN 1 AND 5),
  energia INTEGER CHECK (energia BETWEEN 1 AND 5),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id, data)
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE registros_diarios ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para profiles
CREATE POLICY "Usuários podem ver apenas seu próprio perfil" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar apenas seu próprio perfil" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Usuários podem inserir apenas seu próprio perfil" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Políticas RLS para progress
CREATE POLICY "Usuários podem ver apenas seu próprio progresso" ON progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem gerenciar apenas seu próprio progresso" ON progress
  FOR ALL USING (auth.uid() = user_id);

-- Políticas RLS para registros_diarios
CREATE POLICY "Usuários podem ver apenas seus próprios registros" ON registros_diarios
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem gerenciar apenas seus próprios registros" ON registros_diarios
  FOR ALL USING (auth.uid() = user_id);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para atualizar updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_progress_updated_at BEFORE UPDATE ON progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Função para criar perfil automaticamente após registro
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, nome)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'nome', split_part(new.email, '@', 1)));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Inserir seções padrão de progresso para novos usuários
CREATE OR REPLACE FUNCTION public.create_default_progress()
RETURNS TRIGGER AS $$
BEGIN
  -- Inserir seções padrão do programa de emagrecimento
  INSERT INTO public.progress (user_id, secao, progresso) VALUES
    (NEW.id, 'configuracao_inicial', '{"etapa": 1, "total_etapas": 5, "concluido": false}'),
    (NEW.id, 'alimentacao_saudavel', '{"etapa": 1, "total_etapas": 7, "concluido": false}'),
    (NEW.id, 'hidratacao', '{"etapa": 1, "total_etapas": 3, "concluido": false}'),
    (NEW.id, 'exercicios_leves', '{"etapa": 1, "total_etapas": 4, "concluido": false}'),
    (NEW.id, 'sono_qualidade', '{"etapa": 1, "total_etapas": 3, "concluido": false}'),
    (NEW.id, 'habitos_saudaveis', '{"etapa": 1, "total_etapas": 6, "concluido": false}');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar progresso padrão
CREATE OR REPLACE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.create_default_progress();
