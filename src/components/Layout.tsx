import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  BookOpen, 
  Star,
  User, 
  Menu,
  X,
  LogOut,
  Sun,
  Moon,
  Laptop
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'

interface LayoutProps {
  children: React.ReactNode
}

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center bg-slate-100 dark:bg-dark-800 rounded-full p-1">
      <button onClick={() => setTheme('light')} className={`p-1.5 rounded-full ${theme === 'light' ? 'bg-white dark:bg-dark-700' : ''}`}>
        <Sun className="w-4 h-4 text-slate-700 dark:text-slate-300" />
      </button>
      <button onClick={() => setTheme('dark')} className={`p-1.5 rounded-full ${theme === 'dark' ? 'bg-white dark:bg-dark-700' : ''}`}>
        <Moon className="w-4 h-4 text-slate-700 dark:text-slate-300" />
      </button>
       <button onClick={() => setTheme('system')} className={`p-1.5 rounded-full ${theme === 'system' ? 'bg-white dark:bg-dark-700' : ''}`}>
        <Laptop className="w-4 h-4 text-slate-700 dark:text-slate-300" />
      </button>
    </div>
  )
}

export default function Layout({ children }: LayoutProps) {
  const { profile, signOut } = useAuth()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Conteúdo', href: '/conteudo', icon: BookOpen },
    { name: 'Premium', href: '/premium', icon: Star },
  ]

  return (
    <div className="min-h-screen bg-light dark:bg-dark-900 font-sans">
      {/* Navbar Fixa */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-dark-900/80 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-dark-700 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center space-x-2">
              <span className="text-2xl">🌱</span>
              <h1 className="text-xl font-bold text-dark dark:text-light">EmagreçaSaúde</h1>
            </Link>

            {/* Navegação Desktop */}
            <nav className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => {
                const isActive = location.pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                        layoutId="underline"
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Ícones da Direita */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <ThemeToggle />
              <Link
                to="/perfil"
                className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-800 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                title="Meu Perfil"
              >
                <User className="w-5 h-5" />
              </Link>
              <button
                onClick={signOut}
                className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-800 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                title="Sair"
              >
                <LogOut className="w-5 h-5" />
              </button>
              {/* Botão Menu Mobile */}
              <div className="md:hidden">
                <button 
                  onClick={() => setMobileMenuOpen(true)}
                  className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-800"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Menu Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute top-0 right-0 h-full w-64 bg-white dark:bg-dark-800 shadow-lg p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-4">
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center px-4 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-700 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Link>
                  )
                })}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conteúdo Principal */}
      <main className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
