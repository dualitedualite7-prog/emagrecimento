import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './contexts/AuthContext'
import { ConteudoProvider } from './contexts/ConteudoContext'
import { PremiumProvider } from './contexts/PremiumContext'
import { ThemeProvider } from './contexts/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Dashboard from './pages/Dashboard'
import ConfiguracaoInicial from './pages/ConfiguracaoInicial'
import RegistroDiario from './pages/RegistroDiario'
import Alimentacao from './pages/Alimentacao'
import Conteudo from './pages/Conteudo'
import ConteudoDetalhe from './pages/ConteudoDetalhe'
import Premium from './pages/Premium'
import Perfil from './pages/Perfil'
import PremiumModal from './components/PremiumModal'
import PagamentoSucesso from './pages/PagamentoSucesso'
import PagamentoCancelado from './pages/PagamentoCancelado'

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <ConteudoProvider>
            <PremiumProvider>
              <div className="App">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/cadastro" element={<Cadastro />} />
                  
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/configuracao-inicial" element={<ProtectedRoute><ConfiguracaoInicial /></ProtectedRoute>} />
                  <Route path="/registro" element={<ProtectedRoute><RegistroDiario /></ProtectedRoute>} />
                  <Route path="/alimentacao" element={<ProtectedRoute><Alimentacao /></ProtectedRoute>} />
                  <Route path="/conteudo" element={<ProtectedRoute><Conteudo /></ProtectedRoute>} />
                  <Route path="/conteudo/:slug" element={<ProtectedRoute><ConteudoDetalhe /></ProtectedRoute>} />
                  <Route path="/premium" element={<ProtectedRoute><Premium /></ProtectedRoute>} />
                  <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
                  <Route path="/pagamento/sucesso" element={<ProtectedRoute><PagamentoSucesso /></ProtectedRoute>} />
                  <Route path="/pagamento/cancelado" element={<ProtectedRoute><PagamentoCancelado /></ProtectedRoute>} />

                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
                <Toaster 
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#fff',
                      color: '#333',
                      fontFamily: 'Inter, sans-serif',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    },
                    success: {
                      iconTheme: {
                        primary: '#16a34a',
                        secondary: '#fff',
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fff',
                      },
                    },
                    className: 'dark:bg-dark-800 dark:text-slate-200'
                  }}
                />
                <PremiumModal />
              </div>
            </PremiumProvider>
          </ConteudoProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App
