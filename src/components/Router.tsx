import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Layout from './Layout'
import Dashboard from './Dashboard'
import ChatBot from './ChatBot'
import Appointments from './Appointments'
import Resources from './Resources'
import Forum from './Forum'
import Profile from './Profile'
import Analytics from './Analytics'
import Settings from './Settings'

export default function Router() {
  const { profile } = useAuth()

  const getDefaultRoute = () => {
    if (!profile) return '/'
    return '/'
  }

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          
          {/* Student routes */}
          {profile?.role === 'student' && (
            <>
              <Route path="/chat" element={<ChatBot />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/profile" element={<Profile />} />
            </>
          )}

          {/* Counsellor routes */}
          {profile?.role === 'counsellor' && (
            <>
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/students" element={<div>Students Management</div>} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/profile" element={<Profile />} />
            </>
          )}

          {/* Admin routes */}
          {profile?.role === 'admin' && (
            <>
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/users" element={<div>User Management</div>} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/settings" element={<Settings />} />
            </>
          )}

          {/* Redirect unknown routes */}
          <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}