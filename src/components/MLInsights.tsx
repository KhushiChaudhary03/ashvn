import React, { useState, useEffect } from 'react'
import { Brain, TrendingUp, AlertTriangle, Target, BarChart3, Users } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, PieChart, Pie, Cell } from 'recharts'

interface MLPrediction {
  studentId: string
  riskScore: number
  predictedOutcome: 'low' | 'medium' | 'high' | 'critical'
  confidence: number
  factors: string[]
  recommendations: string[]
}

interface StressPattern {
  timeOfDay: string
  stressLevel: number
  commonTriggers: string[]
  effectiveInterventions: string[]
}

export default function MLInsights() {
  const [predictions, setPredictions] = useState<MLPrediction[]>([])
  const [stressPatterns, setStressPatterns] = useState<StressPattern[]>([])
  const [selectedModel, setSelectedModel] = useState<'knn' | 'logistic'>('knn')
  const [loading, setLoading] = useState(false)

  // Mock ML predictions using K-Nearest Neighbors approach
  const generateKNNPredictions = () => {
    const mockPredictions: MLPrediction[] = [
      {
        studentId: 'student_001',
        riskScore: 0.85,
        predictedOutcome: 'high',
        confidence: 0.92,
        factors: ['High PHQ-9 scores', 'Irregular sleep patterns', 'Academic stress'],
        recommendations: ['Schedule counseling session', 'Sleep hygiene education', 'Stress management workshop']
      },
      {
        studentId: 'student_002',
        riskScore: 0.34,
        predictedOutcome: 'low',
        confidence: 0.78,
        factors: ['Regular exercise', 'Good social support', 'Stable mood patterns'],
        recommendations: ['Continue current wellness practices', 'Peer mentoring opportunity']
      },
      {
        studentId: 'student_003',
        riskScore: 0.67,
        predictedOutcome: 'medium',
        confidence: 0.84,
        factors: ['Moderate anxiety levels', 'Exam period stress', 'Social isolation'],
        recommendations: ['Group therapy sessions', 'Study skills workshop', 'Social activities']
      },
      {
        studentId: 'student_004',
        riskScore: 0.91,
        predictedOutcome: 'critical',
        confidence: 0.96,
        factors: ['Severe depression indicators', 'Suicidal ideation', 'Substance use'],
        recommendations: ['Immediate intervention required', 'Crisis counseling', 'Medical evaluation']
      }
    ]
    return mockPredictions
  }

  // Mock stress pattern analysis
  const generateStressPatterns = () => {
    const patterns: StressPattern[] = [
      {
        timeOfDay: 'Morning (6-10 AM)',
        stressLevel: 3.2,
        commonTriggers: ['Academic deadlines', 'Sleep deprivation'],
        effectiveInterventions: ['Morning meditation', 'Exercise routine']
      },
      {
        timeOfDay: 'Afternoon (12-4 PM)',
        stressLevel: 5.8,
        commonTriggers: ['Class presentations', 'Social interactions'],
        effectiveInterventions: ['Breathing exercises', 'Peer support']
      },
      {
        timeOfDay: 'Evening (6-10 PM)',
        stressLevel: 7.1,
        commonTriggers: ['Assignment pressure', 'Financial concerns'],
        effectiveInterventions: ['Time management', 'Counseling sessions']
      },
      {
        timeOfDay: 'Night (10 PM-2 AM)',
        stressLevel: 8.4,
        commonTriggers: ['Overthinking', 'Loneliness', 'Future anxiety'],
        effectiveInterventions: ['Sleep hygiene', 'Crisis hotline', 'Mindfulness apps']
      }
    ]
    return patterns
  }

  const runMLAnalysis = async () => {
    setLoading(true)
    // Simulate ML processing time
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setPredictions(generateKNNPredictions())
    setStressPatterns(generateStressPatterns())
    setLoading(false)
  }

  useEffect(() => {
    runMLAnalysis()
  }, [selectedModel])

  const riskDistribution = [
    { name: 'Low Risk', value: 45, color: '#10B981' },
    { name: 'Medium Risk', value: 30, color: '#F59E0B' },
    { name: 'High Risk', value: 20, color: '#EF4444' },
    { name: 'Critical', value: 5, color: '#DC2626' }
  ]

  const modelAccuracy = selectedModel === 'knn' ? 0.87 : 0.82
  const modelPrecision = selectedModel === 'knn' ? 0.84 : 0.79

  const stressTimeData = stressPatterns.map(pattern => ({
    time: pattern.timeOfDay,
    stress: pattern.stressLevel
  }))

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Brain className="h-8 w-8 text-purple-600 mr-4" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ML-Powered Mental Health Insights</h1>
            <p className="text-gray-600">Advanced analytics for early intervention and personalized support</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value as 'knn' | 'logistic')}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="knn">K-Nearest Neighbors</option>
            <option value="logistic">Logistic Regression</option>
          </select>
          <button
            onClick={runMLAnalysis}
            disabled={loading}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50 flex items-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Run Analysis
              </>
            )}
          </button>
        </div>
      </div>

      {/* Model Performance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Target className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Model Accuracy</p>
              <p className="text-2xl font-bold text-gray-900">{(modelAccuracy * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <BarChart3 className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Precision</p>
              <p className="text-2xl font-bold text-gray-900">{(modelPrecision * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Students Analyzed</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">High Risk Detected</p>
              <p className="text-2xl font-bold text-gray-900">31</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Predictions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Risk Predictions</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {predictions.map((prediction, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-900">{prediction.studentId}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(prediction.predictedOutcome)}`}>
                        {prediction.predictedOutcome.toUpperCase()}
                      </span>
                      <span className="text-sm text-gray-600">
                        {(prediction.confidence * 100).toFixed(0)}% confidence
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm font-medium text-gray-700 mb-1">Risk Score</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          prediction.riskScore >= 0.8 ? 'bg-red-500' :
                          prediction.riskScore >= 0.6 ? 'bg-orange-500' :
                          prediction.riskScore >= 0.4 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${prediction.riskScore * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {(prediction.riskScore * 100).toFixed(1)}%
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium text-gray-700 mb-1">Key Factors:</div>
                      <ul className="text-gray-600 space-y-1">
                        {prediction.factors.map((factor, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="font-medium text-gray-700 mb-1">Recommendations:</div>
                      <ul className="text-gray-600 space-y-1">
                        {prediction.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start">
                            <span className="w-1 h-1 bg-blue-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <BarChart3 className="h-6 w-6 text-blue-500 mr-3" />
              <h2 className="text-lg font-semibold text-gray-900">Risk Distribution</h2>
            </div>
          </div>
          <div className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {riskDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stress Patterns Analysis */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="h-6 w-6 text-green-500 mr-3" />
            <h2 className="text-lg font-semibold text-gray-900">Daily Stress Patterns</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stressTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="stress" 
                    stroke="#8B5CF6" 
                    strokeWidth={3}
                    dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {stressPatterns.map((pattern, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{pattern.timeOfDay}</h3>
                    <span className={`px-2 py-1 rounded text-sm font-medium ${
                      pattern.stressLevel >= 7 ? 'bg-red-100 text-red-800' :
                      pattern.stressLevel >= 5 ? 'bg-orange-100 text-orange-800' :
                      pattern.stressLevel >= 3 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {pattern.stressLevel}/10
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Common Triggers:</strong> {pattern.commonTriggers.join(', ')}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Effective Interventions:</strong> {pattern.effectiveInterventions.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Model Information */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-start">
          <Brain className="h-6 w-6 text-purple-600 mr-3 mt-1" />
          <div>
            <h3 className="text-lg font-medium text-purple-800 mb-3">
              {selectedModel === 'knn' ? 'K-Nearest Neighbors Model' : 'Logistic Regression Model'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-purple-800 mb-2">How it works:</h4>
                {selectedModel === 'knn' ? (
                  <p className="text-sm text-purple-700">
                    Analyzes student data by finding similar patterns from historical cases. 
                    Uses features like PHQ-9/GAD-7 scores, mood patterns, and engagement metrics 
                    to identify students with similar risk profiles.
                  </p>
                ) : (
                  <p className="text-sm text-purple-700">
                    Uses statistical modeling to predict risk probability based on weighted 
                    combinations of assessment scores, behavioral patterns, and demographic factors.
                  </p>
                )}
              </div>
              <div>
                <h4 className="font-medium text-purple-800 mb-2">Key Features:</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• PHQ-9 and GAD-7 assessment scores</li>
                  <li>• Daily mood tracking patterns</li>
                  <li>• Platform engagement metrics</li>
                  <li>• Sleep and activity data</li>
                  <li>• Social interaction indicators</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}