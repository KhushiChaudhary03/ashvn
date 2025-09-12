import React, { useState } from 'react'
import { Play, Download, BookOpen, Headphones, Video, Globe, Search, Filter, Star } from 'lucide-react'

interface Resource {
  id: string
  title: string
  description: string
  type: 'video' | 'audio' | 'article' | 'guide'
  category: string
  duration?: string
  language: string
  rating: number
  thumbnail?: string
  url?: string
  downloadUrl?: string
}

const mockResources: Resource[] = [
  {
    id: '1',
    title: 'Breathing Exercises for Anxiety',
    description: 'Learn 4-7-8 breathing technique to manage anxiety and panic attacks',
    type: 'video',
    category: 'Anxiety Management',
    duration: '8 minutes',
    language: 'English',
    rating: 4.8,
    thumbnail: 'https://images.pexels.com/photos/3820296/pexels-photo-3820296.jpeg?auto=compress&cs=tinysrgb&w=300',
    url: '#'
  },
  {
    id: '2',
    title: 'गुदर्ती श्वास तकनीक (Guided Breathing in Hindi)',
    description: 'चिंता और तनाव को कम करने के लिए निर्देशित श्वास तकनीक',
    type: 'audio',
    category: 'तनाव प्रबंधन',
    duration: '12 minutes',
    language: 'हिंदी',
    rating: 4.7,
    downloadUrl: '#'
  },
  {
    id: '3',
    title: 'Understanding Depression: A Student Guide',
    description: 'Comprehensive guide about recognizing and managing depression symptoms',
    type: 'guide',
    category: 'Mental Health Education',
    language: 'English',
    rating: 4.9,
    url: '#'
  },
  {
    id: '4',
    title: 'Mindfulness Meditation for Students',
    description: '10-minute guided meditation specifically designed for college students',
    type: 'audio',
    category: 'Mindfulness',
    duration: '10 minutes',
    language: 'English',
    rating: 4.6,
    downloadUrl: '#'
  },
  {
    id: '5',
    title: 'स्वस्थ नींद की आदतें (Healthy Sleep Habits)',
    description: 'छात्रों के लिए बेहतर नींद और आराम की तकनीकें',
    type: 'article',
    category: 'नींद स्वास्थ्य',
    language: 'हिंदी',
    rating: 4.5,
    url: '#'
  },
  {
    id: '6',
    title: 'Cognitive Behavioral Techniques',
    description: 'Learn CBT strategies to challenge negative thought patterns',
    type: 'video',
    category: 'Therapy Techniques',
    duration: '15 minutes',
    language: 'English',
    rating: 4.8,
    thumbnail: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300',
    url: '#'
  },
  {
    id: '7',
    title: 'Progressive Muscle Relaxation',
    description: 'Full body relaxation technique for stress relief',
    type: 'audio',
    category: 'Relaxation',
    duration: '20 minutes',
    language: 'English',
    rating: 4.7,
    downloadUrl: '#'
  },
  {
    id: '8',
    title: 'Time Management for Mental Wellness',
    description: 'Balancing academics and mental health through effective time management',
    type: 'guide',
    category: 'Student Life',
    language: 'English',
    rating: 4.4,
    url: '#'
  }
]

const categories = [
  'All', 'Anxiety Management', 'तनाव प्रबंधन', 'Mental Health Education', 
  'Mindfulness', 'नींद स्वास्थ्य', 'Therapy Techniques', 'Relaxation', 'Student Life'
]

const languages = ['All', 'English', 'हिंदी']

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [selectedType, setSelectedType] = useState('All')

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory
    const matchesLanguage = selectedLanguage === 'All' || resource.language === selectedLanguage
    const matchesType = selectedType === 'All' || resource.type === selectedType

    return matchesSearch && matchesCategory && matchesLanguage && matchesType
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-5 w-5" />
      case 'audio': return <Headphones className="h-5 w-5" />
      case 'article': return <BookOpen className="h-5 w-5" />
      case 'guide': return <BookOpen className="h-5 w-5" />
      default: return <BookOpen className="h-5 w-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-purple-100 text-purple-800'
      case 'audio': return 'bg-green-100 text-green-800'
      case 'article': return 'bg-blue-100 text-blue-800'
      case 'guide': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Mental Health Resources</h1>
        <p className="text-gray-600">Access evidence-based mental health resources in multiple languages</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
              >
                {languages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="All">All Types</option>
                <option value="video">Videos</option>
                <option value="audio">Audio</option>
                <option value="article">Articles</option>
                <option value="guide">Guides</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('All')
                  setSelectedLanguage('All')
                  setSelectedType('All')
                }}
                className="w-full px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Found {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Thumbnail for videos */}
            {resource.thumbnail && (
              <div className="aspect-video relative">
                <img
                  src={resource.thumbnail}
                  alt={resource.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <div className="bg-white bg-opacity-90 rounded-full p-3">
                    <Play className="h-6 w-6 text-gray-700" />
                  </div>
                </div>
              </div>
            )}

            <div className="p-6">
              {/* Resource Type and Language */}
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                  {getTypeIcon(resource.type)}
                  <span className="ml-1 capitalize">{resource.type}</span>
                </span>
                <div className="flex items-center text-xs text-gray-500">
                  <Globe className="h-3 w-3 mr-1" />
                  {resource.language}
                </div>
              </div>

              {/* Title and Description */}
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{resource.description}</p>

              {/* Metadata */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <span className="bg-gray-100 px-2 py-1 rounded">{resource.category}</span>
                {resource.duration && <span>{resource.duration}</span>}
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{resource.rating}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {resource.url && (
                  <button className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors text-sm flex items-center justify-center">
                    {resource.type === 'video' ? (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Watch
                      </>
                    ) : (
                      <>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Read
                      </>
                    )}
                  </button>
                )}
                {resource.downloadUrl && (
                  <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <BookOpen className="h-6 w-6 text-teal-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-teal-800 mb-2">Need help finding resources?</h3>
            <p className="text-sm text-teal-700 mb-3">
              Our AI assistant can recommend personalized resources based on your current needs and preferences.
            </p>
            <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors text-sm">
              Get Personalized Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}