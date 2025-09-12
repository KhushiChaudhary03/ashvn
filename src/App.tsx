import React from 'react'
import { AuthProvider } from './contexts/AuthContext'
import AuthGuard from './components/AuthGuard'
import Router from './components/Router'

function App() {
  return (
    <AuthProvider>
      <AuthGuard>
        <Router />
      </AuthGuard>
    </AuthProvider>
  )
}

export default App