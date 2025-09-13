import React, { useState } from 'react'
import { Phone, MessageCircle, MapPin, Clock, AlertTriangle, Heart, Shield } from 'lucide-react'

interface CrisisResource {
  name: string
  type: 'hotline' | 'text' | 'chat' | 'local'
  contact: string
  description: string
  availability: string
  language: string[]
}

export default function CrisisSupport() {
  const [selectedLanguage, setSelectedLanguage] = useState('English')

  const crisisResources: CrisisResource[] = [
    {
      name: 'National Suicide Prevention Lifeline',
      type: 'hotline',
      contact: '988',
      description: 'Free and confidential emotional support for people in suicidal crisis',
      availability: '24/7',
      language: ['English', 'Spanish']
    },
    {
      name: 'Crisis Text Line',
      type: 'text',
      contact: 'Text HOME to 741741',
      description: 'Free, 24/7 support for those in crisis via text message',
      availability: '24/7',
      language: ['English']
    },
    {
      name: 'SAMHSA National Helpline',
      type: 'hotline',
      contact: '1-800-662-4357',
      description: 'Treatment referral and information service for mental health',
      availability: '24/7',
      language: ['English', 'Spanish']
    },
    {
      name: 'Campus Counseling Center',
      type: 'local',
      contact: '(555) 123-4567',
      description: 'On-campus mental health services and emergency support',
      availability: 'Mon-Fri 8AM-5PM, Emergency 24/7',
      language: ['English', 'Hindi']
    },
    {
      name: 'Vandrevala Foundation Helpline',
      type: 'hotline',
      contact: '1860-2662-345',
      description: 'Mental health support and crisis intervention in India',
      availability: '24/7',
      language: ['English', 'Hindi', 'Tamil', 'Telugu']
    },
    {
      name: 'iCall Psychosocial Helpline',
      type: 'hotline',
      contact: '9152987821',
      description: 'Psychosocial support and crisis intervention',
      availability: 'Mon-Sat 8AM-10PM',
      language: ['English', 'Hindi', 'Marathi']
    }
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hotline': return <Phone className="h-5 w-5" />
      case 'text': return <MessageCircle className="h-5 w-5" />
      case 'chat': return <MessageCircle className="h-5 w-5" />
      case 'local': return <MapPin className="h-5 w-5" />
      default: return <Phone className="h-5 w-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hotline': return 'bg-red-100 text-red-800'
      case 'text': return 'bg-blue-100 text-blue-800'
      case 'chat': return 'bg-green-100 text-green-800'
      case 'local': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredResources = crisisResources.filter(resource => 
    resource.language.includes(selectedLanguage)
  )

  return (
    <div className="space-y-8">
      {/* Emergency Banner */}
      <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
        <div className="flex items-center">
          <AlertTriangle className="h-8 w-8 text-red-400 mr-4" />
          <div>
            <h1 className="text-2xl font-bold text-red-800 mb-2">Crisis Support Resources</h1>
            <p className="text-red-700 mb-4">
              If you're having thoughts of self-harm or suicide, please reach out for help immediately. 
              You are not alone, and support is available 24/7.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:988"
                className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors flex items-center font-medium"
              >
                <Phone className="h-5 w-5 mr-2" />
                Call 988 Now
              </a>
              <a
                href="sms:741741&body=HOME"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors flex items-center font-medium"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Text HOME to 741741
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Language Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Available Support Resources</h2>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="English">English</option>
            <option value="Hindi">हिंदी (Hindi)</option>
            <option value="Spanish">Español</option>
            <option value="Tamil">தமிழ் (Tamil)</option>
            <option value="Telugu">తెలుగు (Telugu)</option>
            <option value="Marathi">मराठी (Marathi)</option>
          </select>
        </div>
      </div>

      {/* Crisis Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((resource, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(resource.type)}`}>
                  {getTypeIcon(resource.type)}
                  <span className="ml-2 capitalize">{resource.type}</span>
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {resource.availability}
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.name}</h3>
            <p className="text-gray-600 mb-4">{resource.description}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Contact:</span>
                <span className="text-lg font-bold text-gray-900">{resource.contact}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Languages:</span>
                <div className="flex flex-wrap gap-1">
                  {resource.language.map(lang => (
                    <span key={lang} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                {resource.type === 'hotline' && (
                  <a
                    href={`tel:${resource.contact.replace(/[^\d]/g, '')}`}
                    className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center font-medium"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </a>
                )}
                {resource.type === 'text' && (
                  <a
                    href={`sms:${resource.contact.match(/\d+/)?.[0]}&body=${resource.contact.match(/\b[A-Z]+\b/)?.[0] || ''}`}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center font-medium"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Text
                  </a>
                )}
                {resource.type === 'local' && (
                  <a
                    href={`tel:${resource.contact.replace(/[^\d]/g, '')}`}
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center font-medium"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Contact Campus
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Planning */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center mb-6">
          <Shield className="h-6 w-6 text-green-600 mr-3" />
          <h2 className="text-lg font-semibold text-gray-900">Safety Planning</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Warning Signs to Watch For:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Thoughts of death or suicide
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Feeling hopeless or trapped
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Severe anxiety or panic attacks
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Withdrawal from friends and activities
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Dramatic mood changes
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-3">Immediate Coping Strategies:</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Call a crisis hotline or trusted person
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Remove access to harmful means
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Go to a safe, public place
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Use grounding techniques (5-4-3-2-1)
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Engage in physical activity
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Support Message */}
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
        <div className="flex items-start">
          <Heart className="h-6 w-6 text-teal-600 mr-3 mt-1" />
          <div>
            <h3 className="text-lg font-medium text-teal-800 mb-2">You Are Not Alone</h3>
            <p className="text-teal-700 mb-4">
              Mental health struggles are real, but they are treatable. Reaching out for help is a sign of strength, 
              not weakness. Every person deserves support, understanding, and hope for recovery.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors">
                Find Local Support
              </button>
              <button className="border border-teal-600 text-teal-600 px-4 py-2 rounded-md hover:bg-teal-50 transition-colors">
                Learn More About Mental Health
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}