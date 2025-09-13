import React, { useState } from 'react'
import { Play, Download, BookOpen, Headphones, Video, Globe, Search, Star, X } from 'lucide-react'

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
    url: 'https://www.youtube.com/embed/YFtHjV7HbYc'
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
    url: '/audio/breathing-hindi.mp3',
    downloadUrl: '/downloads/breathing-hindi.mp3'
  },
  {
    id: '3',
    title: 'Understanding Depression: A Student Guide',
    description: 'Comprehensive guide about recognizing and managing depression symptoms',
    type: 'guide',
    category: 'Mental Health Education',
    language: 'English',
    rating: 4.9,
    url: 'https://www.verywellmind.com/what-is-depression-5088162'
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
    url: '/audio/mindfulness.mp3',
    downloadUrl: '/downloads/mindfulness.mp3'
  },
  {
    id: '5',
    title: 'स्वस्थ नींद की आदतें (Healthy Sleep Habits)',
    description: 'छात्रों के लिए बेहतर नींद और आराम की तकनीकें',
    type: 'article',
    category: 'नींद स्वास्थ्य',
    language: 'हिंदी',
    rating: 4.5,
    url: 'https://www.healthline.com/health/healthy-sleep'
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
    url: 'https://www.youtube.com/embed/9c_Bv_FBE-c'
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
    url: '/audio/pmr.mp3',
    downloadUrl: '/downloads/pmr.mp3'
  },
  {
    id: '8',
    title: 'Time Management for Mental Wellness',
    description: 'Balancing academics and mental health through effective time management',
    type: 'guide',
    category: 'Student Life',
    language: 'English',
    rating: 4.4,
    url: 'https://www.mindtools.com/ato9m1b/time-management'
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
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

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

      {/* Search & Filters */}
      {/* ... keep your existing filter code ... */}

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {resource.thumbnail && (
              <div className="aspect-video relative">
                <img src={resource.thumbnail} alt={resource.title} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-6">
              {/* Resource Info */}
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

              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">{resource.description}</p>

              {/* Action Buttons */}
              <div className="space-y-3">
                {resource.type === 'video' && resource.url && (
                  <button
                    onClick={() => setVideoUrl(resource.url!)}
                    className="w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors text-sm flex items-center justify-center"
                  >
                    <Play className="h-4 w-4 mr-2" /> Watch
                  </button>
                )}
                {resource.type === 'audio' && resource.url && (
                  <div className="space-y-2">
                    <audio controls className="w-full">
                      <source src={resource.url} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                    {resource.downloadUrl && (
                      <a
                        href={resource.downloadUrl}
                        download
                        className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm flex items-center justify-center"
                      >
                        <Download className="h-4 w-4 mr-2" /> Download
                      </a>
                    )}
                  </div>
                )}
                {(resource.type === 'article' || resource.type === 'guide') && resource.url && (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors text-sm flex items-center justify-center"
                  >
                    <BookOpen className="h-4 w-4 mr-2" /> Read
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {videoUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl w-full relative">
            <button
              onClick={() => setVideoUrl(null)}
              className="absolute top-2 right-2 bg-gray-200 rounded-full p-1 hover:bg-gray-300"
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>
            <iframe
              width="100%"
              height="450"
              src={videoUrl}
              title="Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  )
}
