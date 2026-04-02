'use client'

import { useState } from 'react'

interface InputPanelProps {
  onPredict: (data: {
    problem_statement: string
    location: string
    process: string
    client: string
    hour: number
    is_night: number
    top_k: number
  }) => void
  loading: boolean
  severity: 'critical' | 'warning' | 'normal'
}

const EXAMPLE_STATEMENT =
  'Advisors are isolated from Network and IPs not getting assigned to systems at Gurgaon 398 for Amazon process'

export default function InputPanel({ onPredict, loading, severity }: InputPanelProps) {
  const [problemStatement, setProblemStatement] = useState(EXAMPLE_STATEMENT)
  const [location, setLocation] = useState('Gurgaon 398')
  const [process, setProcess] = useState('Amazon')
  const [client, setClient] = useState('Amazon')
  const [hour, setHour] = useState(12)
  const [topK, setTopK] = useState(3)

  const getSeverityColor = () => {
    if (severity === 'critical') return 'bg-red-100 border-red-300 text-red-600'
    if (severity === 'warning') return 'bg-amber-100 border-amber-300 text-amber-600'
    return 'bg-green-100 border-green-300 text-green-600'
  }

  const getSeverityText = () => {
    if (severity === 'critical') return 'Critical'
    if (severity === 'warning') return 'Warning'
    return 'Normal'
  }

  const handleSubmit = () => {
    onPredict({
      problem_statement: problemStatement,
      location,
      process,
      client,
      hour,
      is_night: hour >= 20 || hour < 6 ? 1 : 0,
      top_k: topK,
    })
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col h-full">
      {/* Panel Header */}
      <div className="flex items-center justify-between px-3.5 py-3 border-b border-slate-200">
        <h2 className="text-xs font-bold text-slate-800">Incident Input</h2>
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${getSeverityColor()}`}
        >
          <span className="w-2 h-2 rounded-full bg-current" />
          {getSeverityText()}
        </span>
      </div>

      {/* Panel Body */}
      <div className="flex-1 p-3.5 overflow-y-auto">
        {/* Problem Statement */}
        <div className="mb-3">
          <label className="text-xs font-bold text-slate-500 mb-1.5 block">Incident Statement</label>
          <textarea
            value={problemStatement}
            onChange={(e) => setProblemStatement(e.target.value)}
            className="w-full h-16 p-2.5 border border-slate-200 rounded-lg bg-slate-50 text-sm text-slate-800 outline-none focus:border-blue-300 focus:bg-blue-50 resize-none"
            style={{ fontFamily: 'inherit' }}
          />
        </div>

        {/* Form Grid */}
        <div className="space-y-2.5">
          {/* Location */}
          <div>
            <label className="text-xs font-bold text-slate-500 mb-1.5 block">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-2.5 py-2 border border-slate-200 rounded-lg bg-slate-50 text-sm text-slate-800 outline-none focus:border-blue-300 focus:bg-blue-50"
            >
              <option>Gurgaon 398</option>
              <option>Gurgaon 94-95</option>
              <option>Mohali 40A</option>
              <option>Hyderabad 112</option>
            </select>
          </div>

          {/* Process */}
          <div>
            <label className="text-xs font-bold text-slate-500 mb-1.5 block">Process</label>
            <select
              value={process}
              onChange={(e) => setProcess(e.target.value)}
              className="w-full px-2.5 py-2 border border-slate-200 rounded-lg bg-slate-50 text-sm text-slate-800 outline-none focus:border-blue-300 focus:bg-blue-50"
            >
              <option>Amazon</option>
              <option>HP</option>
              <option>Sales Support</option>
              <option>Finance Ops</option>
            </select>
          </div>

          {/* Hour */}
          <div>
            <label className="text-xs font-bold text-slate-500 mb-1.5 block">Hour of Day</label>
            <select
              value={hour}
              onChange={(e) => setHour(parseInt(e.target.value))}
              className="w-full px-2.5 py-2 border border-slate-200 rounded-lg bg-slate-50 text-sm text-slate-800 outline-none focus:border-blue-300 focus:bg-blue-50"
            >
              {Array.from({ length: 24 }, (_, i) => (
                <option key={i} value={i}>
                  {String(i).padStart(2, '0')}:00
                </option>
              ))}
            </select>
          </div>

          {/* Top K */}
          <div>
            <label className="text-xs font-bold text-slate-500 mb-1.5 block">Top K Similar Incidents</label>
            <select
              value={topK}
              onChange={(e) => setTopK(parseInt(e.target.value))}
              className="w-full px-2.5 py-2 border border-slate-200 rounded-lg bg-slate-50 text-sm text-slate-800 outline-none focus:border-blue-300 focus:bg-blue-50"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-3 py-2.5 px-3 bg-blue-900 text-white text-sm font-semibold rounded-lg hover:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {loading && (
            <span className="inline-block w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {loading ? 'Running...' : 'Run Prediction'}
        </button>

        {/* Note */}
        <p className="text-xs text-slate-500 mt-3 leading-relaxed">
          <strong className="text-slate-700">Note:</strong> This dashboard predicts incident
          categories and remediation steps using machine learning models.
        </p>
      </div>
    </div>
  )
}
