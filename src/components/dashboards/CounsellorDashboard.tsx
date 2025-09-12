import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { 
  Calendar, 
  Users, 
  MessageCircle, 
  AlertTriangle,
  Clock,
  CheckCircle,
  TrendingUp
} from 'lucide-react'

export default function CounsellorDashboard() {
  const { profile } = useAuth()

  const todaysAppointments = [
    { id: 1, time: '10:00 AM', student: 'Anonymous Student #1234', type: 'Initial Consultation', priority: 'Medium' },
    { id: 2, time: '11:30 AM', student: 'Anonymous Student #5678', type: 'Follow-up Session', priority: 'High' },
    { id: 3, time: '2:00 PM', student: 'Anonymous Student #9012', type: 'Crisis Support', priority: 'Critical' },
    { id: 4, time: '3:30 PM', student: 'Anonymous Student #3456', type: 'Group Therapy', priority: 'Low' },
  ]

  const stats = [
    { name: 'Today\'s Appointments', value: '4', icon: Calendar, color: 'text-blue-600' },
    { name: 'Active Students', value: '23', icon: Users, color: 'text-green-600' },
    { name: 'Pending Messages', value: '7', icon: MessageCircle, color: 'text-purple-600' },
    { name: 'High Priority Cases', value: '2', icon: AlertTriangle, color: 'text-red-600' },
  ]

  const recentAlerts = [
    { student: 'Student #1234', risk: 'High', assessment: 'PHQ-9 Score: 18', time: '2 hours ago' },
    { student: 'Student #5678', risk: 'Medium', assessment: 'GAD-7 Score: 12', time: '4 hours ago' },
    { student: 'Student #9012', risk: 'Critical', assessment: 'Crisis Intervention Needed', time: '1 day ago' },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'high': return 'bg-orange-100 text-orange-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-green-100 text-green-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Good morning, Dr. {profile?.full_name?.split(' ')[0]}!</h1>
        <p className="text-blue-100">You have 4 appointments scheduled today.</p>
        <div className="mt-4 flex items-center space-x-4">
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <div className="text-sm text-blue-100">This Week</div>
            <div className="text-xl font-bold">18 Sessions</div>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <div className="text-sm text-blue-100">Satisfaction Rate</div>
            <div className="text-xl font-bold">94%</div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <stat.icon className={`h-8 w-8 ${stat.color} mr-3`} />
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-6 w-6 text-blue-500 mr-3" />
                <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {todaysAppointments.map((appointment) => (
              <div key={appointment.id} className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="font-medium text-gray-900">{appointment.time}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(appointment.priority)}`}>
                    {appointment.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{appointment.student}</p>
                <p className="text-sm font-medium text-gray-900">{appointment.type}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Alerts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
                <h2 className="text-lg font-semibold text-gray-900">Risk Alerts</h2>
              </div>
              <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                View All
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentAlerts.map((alert, index) => (
              <div key={index} className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{alert.student}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(alert.risk)}`}>
                    {alert.risk} Risk
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{alert.assessment}</p>
                <p className="text-xs text-gray-500">{alert.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-left hover:shadow-md transition-shadow">
          <MessageCircle className="h-8 w-8 text-teal-500 mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Message Students</h3>
          <p className="text-sm text-gray-600">Send secure messages to your students</p>
        </button>

        <button className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-left hover:shadow-md transition-shadow">
          <TrendingUp className="h-8 w-8 text-green-500 mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Progress Reports</h3>
          <p className="text-sm text-gray-600">View student progress and assessments</p>
        </button>

        <button className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-left hover:shadow-md transition-shadow">
          <CheckCircle className="h-8 w-8 text-blue-500 mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">Session Notes</h3>
          <p className="text-sm text-gray-600">Add and review session documentation</p>
        </button>
      </div>
    </div>
  )
}