import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import StudentDashboard from './dashboards/StudentDashboard'
import CounsellorDashboard from './dashboards/CounsellorDashboard'
import AdminDashboard from './dashboards/AdminDashboard'

export default function Dashboard() {
  const { profile } = useAuth()

  if (profile?.role === 'student') {
    return <StudentDashboard />
  } else if (profile?.role === 'counsellor') {
    return <CounsellorDashboard />
  } else if (profile?.role === 'admin') {
    return <AdminDashboard />
  }

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Ashvaan</h1>
      <p className="text-gray-600">Loading your personalized dashboard...</p>
    </div>
  )
}