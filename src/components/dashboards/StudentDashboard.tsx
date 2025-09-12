import React, { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { 
  MessageCircle, 
  Calendar, 
  BookOpen, 
  Heart, 
  AlertCircle, 
  TrendingUp,
  Brain,
  Phone
} from 'lucide-react'

export default function StudentDashboard() {
  const { profile } = useAuth()
  const [moodScore, setMoodScore] = useState(7)
  const [upcomingAppointments, setUpcomingAppointments] = useState(1)
  const [unreadMessages, setUnreadMessages] = useState(3)

  const quickActions = [
    {
      name: 'AI Mental Health Assistant',
      description: 'Get immediate support and coping strategies',
      icon: MessageCircle,
      href: '/chat',
      color: 'bg-teal-500',
    },
    {
      name: 'Book Counselling Session',
      description: 'Schedule a confidential session with a counsellor',
      icon: Calendar,
      href: '/appointments',
      color: 'bg-blue-500',
    },
    {
      name: 'Mental Health Resources',
      description: 'Explore wellness guides and educational content',
      icon: BookOpen,
      href: '/resources',
      color: 'bg-purple-500',
    },
    {
      name: 'Peer Support Forum',
      description: 'Connect anonymously with other students',
      icon: Heart,
      href: '/forum',
      color: 'bg-pink-500',
    },
  ]

  const wellnessTools = [
    { name: 'PHQ-9 Assessment', description: 'Depression screening questionnaire', status: 'Due' },
    { name: 'GAD-7 Assessment', description: 'Anxiety screening questionnaire', status: 'Completed' },
    { name: 'Breathing Exercise', description: '5-minute guided breathing', status: 'Available' },
    { name: 'Mindfulness Session', description: '10-minute meditation', status: 'Available' },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {profile?.full_name?.split(' ')[0]}!</h1>
        <p className="text-teal-100">Your mental wellness journey continues today.</p>
        <div className="mt-4 flex items-center space-x-4">
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <div className="text-sm text-teal-100">Current Mood</div>
            <div className="text-xl font-bold">{moodScore}/10</div>
          </div>
          <div className="bg-white/20 rounded-lg px-4 py-2">
            <div className="text-sm text-teal-100">Streak</div>
            <div className="text-xl font-bold">7 days</div>
          </div>
        </div>
      </div>

      {/* Emergency Support Banner */}
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-800">Crisis Support Available 24/7</h3>
            <p className="text-sm text-red-700">If you're experiencing thoughts of self-harm, please reach out immediately.</p>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            Emergency Help
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action) => (
          <a
            key={action.name}
            href={action.href}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group"
          >
            <div className={`${action.color} rounded-lg p-3 w-fit mb-4 group-hover:scale-110 transition-transform`}>
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{action.name}</h3>
            <p className="text-sm text-gray-600">{action.description}</p>
          </a>
        ))}
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingAppointments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <MessageCircle className="h-8 w-8 text-teal-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Unread Messages</p>
              <p className="text-2xl font-bold text-gray-900">{unreadMessages}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Wellness Score</p>
              <p className="text-2xl font-bold text-gray-900">Good</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wellness Tools */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <Brain className="h-6 w-6 text-purple-500 mr-3" />
            <h2 className="text-lg font-semibold text-gray-900">Wellness Tools</h2>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {wellnessTools.map((tool, index) => (
            <div key={index} className="p-6 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{tool.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  tool.status === 'Due' 
                    ? 'bg-red-100 text-red-800'
                    : tool.status === 'Completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {tool.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}