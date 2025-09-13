import React, { useState } from 'react'
import { Heart, TrendingUp, Calendar, Smile, Frown, Meh } from 'lucide-react'

interface MoodEntry {
  date: string
  mood: number
  notes?: string
  activities: string[]
}

export default function MoodTracker() {
  const [currentMood, setCurrentMood] = useState(5)
  const [notes, setNotes] = useState('')
  const [selectedActivities, setSelectedActivities] = useState<string[]>([])
  const [showHistory, setShowHistory] = useState(false)

  const moodHistory: MoodEntry[] = [
    { date: '2025-01-15', mood: 7, notes: 'Good day, felt productive', activities: ['exercise', 'study'] },
    { date: '2025-01-14', mood: 5, notes: 'Average day', activities: ['study'] },
    { date: '2025-01-13', mood: 3, notes: 'Felt anxious about exams', activities: ['meditation'] },
    { date: '2025-01-12', mood: 8, notes: 'Great day with friends', activities: ['social', 'exercise'] },
    { date: '2025-01-11', mood: 6, notes: 'Productive study session', activities: ['study', 'meditation'] },
  ]

  const activities = [
    'exercise', 'meditation', 'study', 'social', 'sleep', 'work', 'hobbies', 'therapy'
  ]

  const getMoodIcon = (mood: number) => {
    if (mood >= 7) return <Smile className="h-5 w-5 text-green-500" />
    if (mood >= 4) return <Meh className="h-5 w-5 text-yellow-500" />
    return <Frown className="h-5 w-5 text-red-500" />
  }

  const getMoodColor = (mood: number) => {
    if (mood >= 7) return 'text-green-600'
    if (mood >= 4) return 'text-yellow-600'
    return 'text-red-600'
  }

  const handleActivityToggle = (activity: string) => {
    setSelectedActivities(prev => 
      prev.includes(activity) 
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    )
  }

  const handleSubmit = () => {
    // Here you would typically save to database
    alert('Mood entry saved!')
    setNotes('')
    setSelectedActivities([])
  }

  const averageMood = moodHistory.reduce((sum, entry) => sum + entry.mood, 0) / moodHistory.length

  if (showHistory) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp className="h-6 w-6 text-teal-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Mood History</h2>
          </div>
          <button
            onClick={() => setShowHistory(false)}
            className="text-teal-600 hover:text-teal-700 font-medium"
          >
            Back to Tracker
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{averageMood.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Average Mood</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{moodHistory.length}</div>
              <div className="text-sm text-gray-600">Entries</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">7</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
          </div>

          <div className="space-y-4">
            {moodHistory.map((entry, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="font-medium text-gray-900">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {getMoodIcon(entry.mood)}
                    <span className={`ml-2 font-bold ${getMoodColor(entry.mood)}`}>
                      {entry.mood}/10
                    </span>
                  </div>
                </div>
                {entry.notes && (
                  <p className="text-sm text-gray-600 mb-2">{entry.notes}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {entry.activities.map(activity => (
                    <span key={activity} className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Heart className="h-6 w-6 text-teal-600 mr-3" />
          <h2 className="text-xl font-semibold text-gray-900">Daily Mood Tracker</h2>
        </div>
        <button
          onClick={() => setShowHistory(true)}
          className="text-teal-600 hover:text-teal-700 font-medium"
        >
          View History
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-6">
          {/* Mood Scale */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              How are you feeling today? (1 = Very Bad, 10 = Excellent)
            </label>
            <div className="space-y-4">
              <input
                type="range"
                min="1"
                max="10"
                value={currentMood}
                onChange={(e) => setCurrentMood(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Very Bad</span>
                <span>Poor</span>
                <span>Fair</span>
                <span>Good</span>
                <span>Excellent</span>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {getMoodIcon(currentMood)}
                  <span className={`ml-2 text-2xl font-bold ${getMoodColor(currentMood)}`}>
                    {currentMood}/10
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Activities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What activities did you do today?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {activities.map(activity => (
                <button
                  key={activity}
                  onClick={() => handleActivityToggle(activity)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedActivities.includes(activity)
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {activity}
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="How was your day? Any thoughts or feelings you'd like to record?"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 font-medium"
          >
            Save Today's Mood
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">{averageMood.toFixed(1)}</div>
            <div className="text-sm text-gray-600">7-Day Average</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">7</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">
              {Math.max(...moodHistory.map(e => e.mood))}
            </div>
            <div className="text-sm text-gray-600">Best This Week</div>
          </div>
        </div>
      </div>
    </div>
  )
}