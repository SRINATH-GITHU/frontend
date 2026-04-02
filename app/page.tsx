'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import Toast from '@/components/Toast'

interface PredictionResult {
  problem_statement: string
  predicted_category: string
  category_confidence: number
  category_proba: number[]
  predicted_severity: string
  severity_confidence: number
  similar_incidents: any[]
  llm_response: string
  llm_fallback: boolean
  latency_ms: number
  model_version: string
  timestamp: string
}

export default function Page() {
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [latency, setLatency] = useState(0)

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  const handlePredict = async (data: {
    problem_statement: string
    location: string
    process: string
    client: string
    hour: number
    is_night: number
    top_k: number
  }) => {
    setLoading(true)
    console.log('[v0] Prediction started with API_BASE:', API_BASE)
    console.log('[v0] Request data:', data)
    
    try {
      const startTime = performance.now()
      const url = `${API_BASE}/predict`
      console.log('[v0] Fetching from URL:', url)
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      console.log('[v0] Response status:', response.status, response.statusText)

      if (!response.ok) {
        const errorText = await response.text()
        console.error('[v0] API error response:', errorText)
        throw new Error(`API error: ${response.status} ${response.statusText}. ${errorText}`)
      }

      const result = await response.json()
      const endTime = performance.now()
      setLatency(Math.round(endTime - startTime))
      console.log('[v0] Prediction successful:', result)
      setResult(result)
      setToast({ message: 'Prediction completed successfully!', type: 'success' })
    } catch (error) {
      console.error('[v0] Prediction error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to get prediction'
      console.error('[v0] Error details:', {
        message: errorMessage,
        apiUrl: API_BASE,
        apiAvailable: !!API_BASE,
      })
      setToast({
        message: errorMessage,
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    if (!result) {
      setToast({ message: 'No prediction data to export', type: 'error' })
      return
    }

    const reportData = {
      timestamp: result.timestamp,
      problem_statement: result.problem_statement,
      predicted_category: result.predicted_category,
      category_confidence: result.category_confidence,
      predicted_severity: result.predicted_severity,
      severity_confidence: result.severity_confidence,
      ai_reasoning: result.llm_response,
      similar_incidents: result.similar_incidents,
      model_version: result.model_version,
      latency_ms: result.latency_ms,
    }

    const dataStr = JSON.stringify(reportData, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

    const exportFileDefaultName = `noc-gpt-report-${new Date().toISOString().slice(0, 10)}.json`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()

    setToast({ message: 'Report exported successfully!', type: 'success' })
  }

  const getSeverityStatus = (severity: string) => {
    if (severity === 'P1' || severity === 'Critical') return 'critical'
    if (severity === 'P2' || severity === 'Warning') return 'warning'
    return 'normal'
  }

  return (
    <>
      <DashboardLayout
        result={result}
        loading={loading}
        latency={latency}
        onPredict={handlePredict}
        onExport={handleExport}
      />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}
