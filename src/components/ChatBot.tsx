import React, { useState, useEffect, useRef } from 'react'
import { Send, Bot, User, AlertCircle, Heart, Brain } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  assessment?: {
    type: 'PHQ-9' | 'GAD-7'
    score?: number
    risk?: 'low' | 'medium' | 'high' | 'critical'
  }
}

const mentalHealthResponses = {
  anxiety: [
    "I understand you're feeling anxious. Let's try a simple breathing exercise: Breathe in for 4 counts, hold for 4, exhale for 6. Repeat this 3 times.",
    "Anxiety can feel overwhelming, but you're not alone. Would you like me to guide you through a grounding technique called 5-4-3-2-1?",
    "Thank you for sharing how you feel. Here's a quick mindfulness tip: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste."
  ],
  depression: [
    "I hear that you're struggling right now. Your feelings are valid, and it's brave of you to reach out. Would you like to try a brief mood-boosting activity?",
    "Depression can make everything feel difficult. Let's start small - can you think of one tiny thing that brought you even a moment of comfort today?",
    "You've taken an important step by talking about this. Sometimes when we're feeling low, gentle movement can help. Would you like some simple stretching suggestions?"
  ],
  stress: [
    "Stress is your body's natural response, but we can learn to manage it better. Let's try the STOP technique: Stop, Take a breath, Observe your thoughts, Proceed mindfully.",
    "I can sense you're feeling overwhelmed. Here's a quick stress relief technique: Progressive muscle relaxation. Start by tensing your shoulders for 5 seconds, then release.",
    "Stress affects us all. Would you like me to suggest some time management techniques or would you prefer a guided meditation script?"
  ],
  general: [
    "Thank you for trusting me with your feelings. Remember, seeking help is a sign of strength, not weakness.",
    "I'm here to support you through this conversation. Would you like to tell me more about what's been on your mind lately?",
    "Your mental health matters, and you deserve support. Is there a particular area of your wellbeing you'd like to focus on today?"
  ]
}

const assessmentQuestions = {
  'PHQ-9': [
    "Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?",
    "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
    "Over the last 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?",
    "Over the last 2 weeks, how often have you felt tired or had little energy?",
    "Over the last 2 weeks, how often have you had poor appetite or been overeating?",
  ],
  'GAD-7': [
    "Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?",
    "Over the last 2 weeks, how often have you not been able to stop or control worrying?",
    "Over the last 2 weeks, how often have you been worrying too much about different things?",
    "Over the last 2 weeks, how often have you had trouble relaxing?",
    "Over the last 2 weeks, how often have you been so restless that it's hard to sit still?",
  ]
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your mental health support assistant. I'm here to provide you with coping strategies, mindfulness techniques, and emotional support. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentAssessment, setCurrentAssessment] = useState<{
    type: 'PHQ-9' | 'GAD-7' | null
    questionIndex: number
    scores: number[]
  }>({ type: null, questionIndex: 0, scores: [] })
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const detectMentalHealthKeywords = (text: string): string => {
    const anxietyKeywords = ['anxious', 'anxiety', 'worried', 'panic', 'nervous', 'fear']
    const depressionKeywords = ['depressed', 'sad', 'hopeless', 'worthless', 'empty', 'down']
    const stressKeywords = ['stressed', 'overwhelmed', 'pressure', 'tension', 'burnt out']

    const lowerText = text.toLowerCase()

    if (anxietyKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'anxiety'
    }
    if (depressionKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'depression'
    }
    if (stressKeywords.some(keyword => lowerText.includes(keyword))) {
      return 'stress'
    }
    return 'general'
  }

  const generateResponse = (userMessage: string): string => {
    const category = detectMentalHealthKeywords(userMessage)
    const responses = mentalHealthResponses[category as keyof typeof mentalHealthResponses]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const startAssessment = (type: 'PHQ-9' | 'GAD-7') => {
    setCurrentAssessment({
      type,
      questionIndex: 0,
      scores: []
    })

    const botMessage: Message = {
      id: Date.now().toString(),
      text: `Let's start the ${type} assessment. I'll ask you ${assessmentQuestions[type].length} questions. Please rate each on a scale of 0-3: 0 = Not at all, 1 = Several days, 2 = More than half the days, 3 = Nearly every day.\n\nQuestion 1: ${assessmentQuestions[type][0]}`,
      sender: 'bot',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, botMessage])
  }

  const handleAssessmentResponse = (score: number) => {
    const { type, questionIndex, scores } = currentAssessment
    if (!type) return

    const newScores = [...scores, score]
    const nextQuestionIndex = questionIndex + 1

    if (nextQuestionIndex < assessmentQuestions[type].length) {
      // More questions to ask
      setCurrentAssessment({
        type,
        questionIndex: nextQuestionIndex,
        scores: newScores
      })

      const botMessage: Message = {
        id: Date.now().toString(),
        text: `Question ${nextQuestionIndex + 1}: ${assessmentQuestions[type][nextQuestionIndex]}`,
        sender: 'bot',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, botMessage])
    } else {
      // Assessment complete
      const totalScore = newScores.reduce((sum, score) => sum + score, 0)
      let risk: 'low' | 'medium' | 'high' | 'critical'
      let message: string

      if (type === 'PHQ-9') {
        if (totalScore <= 4) {
          risk = 'low'
          message = "Your PHQ-9 score indicates minimal depression symptoms. That's great! Continue with healthy habits like regular sleep, exercise, and social connections."
        } else if (totalScore <= 9) {
          risk = 'medium'
          message = "Your PHQ-9 score indicates mild depression symptoms. Consider speaking with a counselor and practicing self-care strategies I can teach you."
        } else if (totalScore <= 14) {
          risk = 'high'
          message = "Your PHQ-9 score indicates moderate depression symptoms. I strongly recommend scheduling an appointment with a mental health professional. Would you like me to help you find resources?"
        } else {
          risk = 'critical'
          message = "Your PHQ-9 score indicates severe depression symptoms. Please seek immediate professional help. I can connect you with emergency resources if needed."
        }
      } else {
        // GAD-7
        if (totalScore <= 4) {
          risk = 'low'
          message = "Your GAD-7 score indicates minimal anxiety symptoms. Keep practicing relaxation techniques and maintaining healthy coping strategies."
        } else if (totalScore <= 9) {
          risk = 'medium'
          message = "Your GAD-7 score indicates mild anxiety symptoms. Let's work on some anxiety management techniques together."
        } else if (totalScore <= 14) {
          risk = 'high'
          message = "Your GAD-7 score indicates moderate anxiety symptoms. I recommend speaking with a counselor about these feelings."
        } else {
          risk = 'critical'
          message = "Your GAD-7 score indicates severe anxiety symptoms. Please consider seeking immediate professional support."
        }
      }

      const resultMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: 'bot',
        timestamp: new Date(),
        assessment: {
          type,
          score: totalScore,
          risk
        }
      }

      setMessages(prev => [...prev, resultMessage])
      setCurrentAssessment({ type: null, questionIndex: 0, scores: [] })

      // Add escalation for high-risk cases
      if (risk === 'high' || risk === 'critical') {
        setTimeout(() => {
          const escalationMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: risk === 'critical' 
              ? "🚨 URGENT: If you're having thoughts of self-harm, please contact emergency services immediately at 911 or go to your nearest emergency room. You can also reach the 988 Suicide & Crisis Lifeline by calling or texting 988."
              : "📞 I recommend booking an appointment with one of our counselors. Would you like me to help you schedule a confidential session?",
            sender: 'bot',
            timestamp: new Date(),
          }
          setMessages(prev => [...prev, escalationMessage])
        }, 2000)
      }
    }
  }

  const sendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Handle assessment responses
    if (currentAssessment.type) {
      const score = parseInt(inputText)
      if (score >= 0 && score <= 3) {
        handleAssessmentResponse(score)
        setIsTyping(false)
        return
      } else {
        const clarificationMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Please respond with a number from 0-3: 0 = Not at all, 1 = Several days, 2 = More than half the days, 3 = Nearly every day",
          sender: 'bot',
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, clarificationMessage])
        setIsTyping(false)
        return
      }
    }

    // Simulate typing delay
    setTimeout(() => {
      let botResponse: string

      // Check for assessment requests
      if (inputText.toLowerCase().includes('phq') || inputText.toLowerCase().includes('depression assessment')) {
        startAssessment('PHQ-9')
        setIsTyping(false)
        return
      } else if (inputText.toLowerCase().includes('gad') || inputText.toLowerCase().includes('anxiety assessment')) {
        startAssessment('GAD-7')
        setIsTyping(false)
        return
      } else {
        botResponse = generateResponse(inputText)
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  const quickReplies = [
    "I'm feeling anxious",
    "I'm stressed about school",
    "I feel depressed",
    "Start PHQ-9 assessment",
    "Start GAD-7 assessment",
    "I need help"
  ]

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="flex items-center">
          <div className="bg-teal-100 rounded-full p-3 mr-4">
            <Bot className="h-6 w-6 text-teal-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">AI Mental Health Assistant</h1>
            <p className="text-sm text-gray-600">Confidential support • Available 24/7</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-teal-600 text-white ml-auto'
                  : 'bg-white text-gray-900 shadow-sm border border-gray-200'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.sender === 'bot' && (
                  <Bot className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
                )}
                {message.sender === 'user' && (
                  <User className="h-5 w-5 text-teal-100 mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  {message.assessment && (
                    <div className={`mt-3 p-3 rounded-lg ${
                      message.assessment.risk === 'critical' ? 'bg-red-50 border border-red-200' :
                      message.assessment.risk === 'high' ? 'bg-orange-50 border border-orange-200' :
                      message.assessment.risk === 'medium' ? 'bg-yellow-50 border border-yellow-200' :
                      'bg-green-50 border border-green-200'
                    }`}>
                      <div className="flex items-center">
                        {message.assessment.risk === 'critical' ? (
                          <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                        ) : message.assessment.risk === 'high' ? (
                          <AlertCircle className="h-4 w-4 text-orange-500 mr-2" />
                        ) : (
                          <Brain className="h-4 w-4 text-teal-500 mr-2" />
                        )}
                        <span className="text-xs font-medium">
                          {message.assessment.type} Score: {message.assessment.score}/
                          {message.assessment.type === 'PHQ-9' ? '27' : '21'} 
                          ({message.assessment.risk} risk)
                        </span>
                      </div>
                    </div>
                  )}
                  <p className="text-xs mt-2 opacity-75">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-900 shadow-sm border border-gray-200 max-w-xs px-4 py-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-teal-600" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {!currentAssessment.type && (
        <div className="px-6 pb-4">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => setInputText(reply)}
                className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t px-6 py-4">
        <div className="flex space-x-4">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              currentAssessment.type 
                ? "Enter a number from 0-3..." 
                : "Type your message or feelings..."
            }
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim()}
            className="bg-teal-600 text-white rounded-lg px-4 py-2 hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        
        <div className="mt-2 flex items-center text-xs text-gray-500">
          <Heart className="h-3 w-3 mr-1" />
          Your conversations are confidential and secure
        </div>
      </div>
    </div>
  )
}