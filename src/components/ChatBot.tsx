import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, AlertCircle, Heart, Brain } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  assessment?: {
    type: 'PHQ-9' | 'GAD-7';
    score?: number;
    risk?: 'low' | 'medium' | 'high' | 'critical';
  };
}

// Assessment questions
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
};

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your mental health support assistant. I'm here to provide coping strategies, mindfulness techniques, and emotional support. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState<{
    type: 'PHQ-9' | 'GAD-7' | null;
    questionIndex: number;
    scores: number[];
  }>({ type: null, questionIndex: 0, scores: [] });
  const [conversationHistory, setConversationHistory] = useState<[string, string][]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ------------------- GRADIO MODEL -------------------
  const generateResponse = async (userMessage: string, history: [string, string][]): Promise<string> => {
    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, history })
      });
      const data = await response.json();
      return data.reply;
    } catch (err) {
      console.error(err);
      return "Sorry, I couldn't process that right now.";
    }
  };
  // -----------------------------------------------------

  const startAssessment = (type: 'PHQ-9' | 'GAD-7') => {
    setCurrentAssessment({ type, questionIndex: 0, scores: [] });
    const botMessage: Message = {
      id: Date.now().toString(),
      text: `Let's start the ${type} assessment. Please rate each on a scale of 0-3: 0 = Not at all, 1 = Several days, 2 = More than half the days, 3 = Nearly every day.\n\nQuestion 1: ${assessmentQuestions[type][0]}`,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, botMessage]);
  };

  const handleAssessmentResponse = (score: number) => {
    const { type, questionIndex, scores } = currentAssessment;
    if (!type) return;

    const newScores = [...scores, score];
    const nextQuestionIndex = questionIndex + 1;

    if (nextQuestionIndex < assessmentQuestions[type].length) {
      setCurrentAssessment({ type, questionIndex: nextQuestionIndex, scores: newScores });
      const botMessage: Message = {
        id: Date.now().toString(),
        text: `Question ${nextQuestionIndex + 1}: ${assessmentQuestions[type][nextQuestionIndex]}`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } else {
      const totalScore = newScores.reduce((sum, score) => sum + score, 0);
      let risk: 'low' | 'medium' | 'high' | 'critical';
      let message: string;

      if (type === 'PHQ-9') {
        if (totalScore <= 4) { risk = 'low'; message = "Minimal depression symptoms."; }
        else if (totalScore <= 9) { risk = 'medium'; message = "Mild depression symptoms."; }
        else if (totalScore <= 14) { risk = 'high'; message = "Moderate depression symptoms. Consider speaking with a counselor."; }
        else { risk = 'critical'; message = "Severe depression symptoms. Seek immediate professional help."; }
      } else {
        if (totalScore <= 4) { risk = 'low'; message = "Minimal anxiety symptoms."; }
        else if (totalScore <= 9) { risk = 'medium'; message = "Mild anxiety symptoms."; }
        else if (totalScore <= 14) { risk = 'high'; message = "Moderate anxiety symptoms. Speak with a counselor."; }
        else { risk = 'critical'; message = "Severe anxiety symptoms. Seek immediate professional help."; }
      }

      const resultMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: 'bot',
        timestamp: new Date(),
        assessment: { type, score: totalScore, risk }
      };

      setMessages(prev => [...prev, resultMessage]);
      setCurrentAssessment({ type: null, questionIndex: 0, scores: [] });
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Handle assessment input
    if (currentAssessment.type) {
      const score = parseInt(inputText);
      if (score >= 0 && score <= 3) {
        handleAssessmentResponse(score);
        setIsTyping(false);
        return;
      } else {
        const clarificationMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Please respond with a number from 0-3.",
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, clarificationMessage]);
        setIsTyping(false);
        return;
      }
    }

    // Call Gradio mental health model
    const botReply = await generateResponse(inputText, conversationHistory);
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botReply,
      sender: 'bot',
      timestamp: new Date(),
    };

    setConversationHistory(prev => [...prev, [inputText, botReply]]);
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage();
  };

  const quickReplies = [
    "I'm feeling anxious",
    "I'm stressed about school",
    "I feel depressed",
    "Start PHQ-9 assessment",
    "Start GAD-7 assessment",
    "I need help"
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b px-6 py-4 flex items-center">
        <div className="bg-teal-100 rounded-full p-3 mr-4"><Bot className="h-6 w-6 text-teal-600"/></div>
        <div>
          <h1 className="text-xl font-semibold text-gray-900">AI Mental Health Assistant</h1>
          <p className="text-sm text-gray-600">Confidential support • Available 24/7</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${message.sender === 'user' ? 'bg-teal-600 text-white' : 'bg-white text-gray-900 shadow-sm border border-gray-200'}`}>
              <div className="flex items-start space-x-2">
                {message.sender === 'bot' && <Bot className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0"/>}
                {message.sender === 'user' && <User className="h-5 w-5 text-teal-100 mt-0.5 flex-shrink-0"/>}
                <div className="flex-1">
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  {message.assessment && (
                    <div className={`mt-3 p-3 rounded-lg ${message.assessment.risk === 'critical' ? 'bg-red-50 border border-red-200' :
                      message.assessment.risk === 'high' ? 'bg-orange-50 border border-orange-200' :
                      message.assessment.risk === 'medium' ? 'bg-yellow-50 border border-yellow-200' :
                      'bg-green-50 border border-green-200'}`}>
                      <div className="flex items-center">
                        {message.assessment.risk === 'critical' ? <AlertCircle className="h-4 w-4 text-red-500 mr-2"/>
                          : message.assessment.risk === 'high' ? <AlertCircle className="h-4 w-4 text-orange-500 mr-2"/>
                          : <Brain className="h-4 w-4 text-teal-500 mr-2"/>}
                        <span className="text-xs font-medium">
                          {message.assessment.type} Score: {message.assessment.score}/
                          {message.assessment.type === 'PHQ-9' ? '27' : '21'} ({message.assessment.risk} risk)
                        </span>
                      </div>
                    </div>
                  )}
                  <p className="text-xs mt-2 opacity-75">{message.timestamp.toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-900 shadow-sm border border-gray-200 max-w-xs px-4 py-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-teal-600"/>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef}/>
      </div>

      {/* Quick Replies */}
      {!currentAssessment.type && (
        <div className="px-6 pb-4">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map(reply => (
              <button key={reply} onClick={() => setInputText(reply)} className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
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
            onChange={e => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={currentAssessment.type ? "Enter a number from 0-3..." : "Type your message or feelings..."}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
          <button onClick={sendMessage} disabled={!inputText.trim()} className="bg-teal-600 text-white rounded-lg px-4 py-2 hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center">
            <Send className="h-4 w-4"/>
          </button>
        </div>
        <div className="mt-2 flex items-center text-xs text-gray-500">
          <Heart className="h-3 w-3 mr-1"/>
          Your conversations are confidential and secure
        </div>
      </div>
    </div>
  );
}
