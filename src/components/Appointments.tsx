import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Calendar, Clock, User, MapPin, Phone, Video, Plus, CheckCircle, XCircle } from 'lucide-react'

interface Appointment {
  id: string
  date: string
  time: string
  counsellor: string
  type: 'video' | 'phone' | 'in-person'
  status: 'scheduled' | 'completed' | 'cancelled'
  location?: string
  notes?: string
}

const mockCounsellors = [
  { id: '1', name: 'Dr. Sarah Johnson', specialization: 'Anxiety & Depression', rating: 4.9 },
  { id: '2', name: 'Dr. Michael Chen', specialization: 'Student Mental Health', rating: 4.8 },
  { id: '3', name: 'Dr. Emily Rodriguez', specialization: 'Crisis Intervention', rating: 4.9 },
  { id: '4', name: 'Dr. David Wilson', specialization: 'Cognitive Behavioral Therapy', rating: 4.7 },
]

export default function Appointments() {
  const { profile } = useAuth()
  const [showBooking, setShowBooking] = useState(false)
  const [selectedCounsellor, setSelectedCounsellor] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [appointmentType, setAppointmentType] = useState<'video' | 'phone' | 'in-person'>('video')
  const [notes, setNotes] = useState('')

  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      date: '2025-01-18',
      time: '10:00',
      counsellor: 'Dr. Sarah Johnson',
      type: 'video',
      status: 'scheduled',
      notes: 'Follow-up session for anxiety management'
    },
    {
      id: '2',
      date: '2025-01-15',
      time: '14:30',
      counsellor: 'Dr. Michael Chen',
      type: 'in-person',
      status: 'completed',
      location: 'Student Counseling Center, Room 203'
    },
    {
      id: '3',
      date: '2025-01-22',
      time: '11:00',
      counsellor: 'Dr. Emily Rodriguez',
      type: 'phone',
      status: 'scheduled'
    }
  ])

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ]

  const handleBookAppointment = () => {
    if (!selectedCounsellor || !selectedDate || !selectedTime) {
      alert('Please fill in all required fields')
      return
    }

    // Here you would typically make an API call to book the appointment
    alert('Appointment booked successfully!')
    setShowBooking(false)
    // Reset form
    setSelectedCounsellor('')
    setSelectedDate('')
    setSelectedTime('')
    setNotes('')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Clock className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'cancelled': return <XCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />
      case 'phone': return <Phone className="h-4 w-4" />
      case 'in-person': return <MapPin className="h-4 w-4" />
      default: return <Video className="h-4 w-4" />
    }
  }

  const upcomingAppointments = appointments.filter(apt => apt.status === 'scheduled')
  const pastAppointments = appointments.filter(apt => apt.status !== 'scheduled')

  if (showBooking) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Book New Appointment</h1>
            <button
              onClick={() => setShowBooking(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Counsellor Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select a Counsellor
              </label>
              <div className="grid gap-4">
                {mockCounsellors.map((counsellor) => (
                  <div
                    key={counsellor.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedCounsellor === counsellor.id
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedCounsellor(counsellor.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{counsellor.name}</h3>
                        <p className="text-sm text-gray-600">{counsellor.specialization}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">★ {counsellor.rating}</div>
                        <div className="text-xs text-gray-500">Rating</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Time
              </label>
              <div className="grid grid-cols-3 gap-2">
                {availableTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-3 text-sm rounded-md border ${
                      selectedTime === time
                        ? 'bg-teal-600 text-white border-teal-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Appointment Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Type
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['video', 'phone', 'in-person'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setAppointmentType(type as any)}
                    className={`flex items-center justify-center py-3 px-4 border rounded-lg ${
                      appointmentType === type
                        ? 'bg-teal-600 text-white border-teal-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {getTypeIcon(type)}
                    <span className="ml-2 capitalize">{type === 'in-person' ? 'In-Person' : type}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Any specific concerns or topics you'd like to discuss..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Privacy Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <strong>Privacy Guarantee:</strong> Your appointment details are completely confidential. 
                    Only you and your assigned counsellor have access to this information.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleBookAppointment}
                className="flex-1 bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Book Appointment
              </button>
              <button
                onClick={() => setShowBooking(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600">Manage your counselling sessions</p>
        </div>
        <button
          onClick={() => setShowBooking(true)}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Book New Appointment
        </button>
      </div>

      {/* Emergency Support */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <Phone className="h-5 w-5 text-red-600 mr-3" />
          <div>
            <h3 className="text-sm font-medium text-red-800">Need Immediate Help?</h3>
            <p className="text-sm text-red-700">Crisis Helpline: 1-800-273-8255 (Available 24/7)</p>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
        </div>
        {upcomingAppointments.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-teal-100 rounded-full p-3">
                      {getTypeIcon(appointment.type)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900">{appointment.counsellor}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {getStatusIcon(appointment.status)}
                          <span className="ml-1 capitalize">{appointment.status}</span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(appointment.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {appointment.time}
                        </span>
                        <span className="flex items-center capitalize">
                          {getTypeIcon(appointment.type)}
                          <span className="ml-1">{appointment.type === 'in-person' ? 'In-Person' : appointment.type}</span>
                        </span>
                      </div>
                      {appointment.notes && (
                        <p className="text-sm text-gray-600 mt-2">{appointment.notes}</p>
                      )}
                      {appointment.location && (
                        <p className="text-sm text-gray-600 mt-1 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {appointment.location}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                      Join Call
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-sm font-medium text-gray-900 mb-1">No upcoming appointments</h3>
            <p className="text-sm text-gray-500">Book your first session to get started</p>
          </div>
        )}
      </div>

      {/* Past Appointments */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Past Appointments</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {pastAppointments.map((appointment) => (
            <div key={appointment.id} className="p-6 opacity-75">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-100 rounded-full p-3">
                    {getTypeIcon(appointment.type)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{appointment.counsellor}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusIcon(appointment.status)}
                        <span className="ml-1 capitalize">{appointment.status}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(appointment.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {appointment.time}
                      </span>
                    </div>
                    {appointment.location && (
                      <p className="text-sm text-gray-600 mt-1 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {appointment.location}
                      </p>
                    )}
                  </div>
                </div>
                <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                  View Notes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}