'use client'

import { useState } from 'react'
import { Activity, Hop as Home, Clock, Download } from 'lucide-react'
import InputPanel from '@/components/InputPanel'
import CategoryCard from '@/components/CategoryCard'
import RemediationCard from '@/components/RemediationCard'
import IncidentTable from '@/components/IncidentTable'
import AIReasoningPanel from '@/components/AIReasoningPanel'
import { FileText, BarChart3 as BarChart } from 'lucide-react'

interface DashboardLayoutProps {
  result: any
  loading: boolean
  latency: number
  onPredict: (data: any) => void
  onExport: () => void
}

export default function DashboardLayout({
  result,
  loading,
  latency,
  onPredict,
  onExport,
}: DashboardLayoutProps) {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour12: false })
  )

  useState(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    }, 1000)
    return () => clearInterval(interval)
  })

  const getSeverityStatus = (severity: string) => {
    if (severity === 'P1' || severity === 'Critical') return 'critical'
    if (severity === 'P2' || severity === 'Warning') return 'warning'
    return 'normal'
  }

  return (
    <div className="h-screen flex flex-col bg-slate-950 overflow-hidden">

      {/* ── Top Nav ── */}
      <nav className="h-14 shrink-0 bg-slate-900 border-b border-slate-800 flex items-center px-4 gap-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" />
          <span className="text-base font-bold text-white tracking-tight">NOC-GPT</span>
        </div>
        <div className="h-6 w-px bg-slate-700" />
        <button className="px-3 py-1.5 rounded-md bg-slate-800 text-slate-100 text-xs font-medium flex items-center gap-2 hover:bg-slate-700 transition-colors">
          <Home className="w-3.5 h-3.5" />
          Dashboard
        </button>

        <div className="ml-auto flex items-center gap-3">
          {latency > 0 && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-slate-300 font-medium">{latency}ms</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-300 font-medium">{currentTime}</span>
          </div>
          <button
            onClick={onExport}
            disabled={!result}
            className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </nav>

      {/* ── 3-Column Body ── */}
      <div className="flex-1 flex overflow-hidden p-3 gap-3">

        {/* LEFT COLUMN — fixed width, two stacked cards */}
        <div className="w-64 shrink-0 flex flex-col gap-3">

          {/* Card 1: Incident Input */}
          <div className="flex-1 min-h-0 bg-slate-900 border border-slate-800 rounded-lg overflow-y-auto">
            <InputPanel
              onPredict={onPredict}
              loading={loading}
              severity={result ? getSeverityStatus(result.predicted_severity) : 'normal'}
            />
          </div>

          {/* Card 2: Category */}
          <div className="shrink-0 bg-slate-900 border border-slate-800 rounded-lg">
            {result ? (
              <CategoryCard
                category={result.predicted_category}
                categoryConfidence={result.category_confidence}
              />
            ) : (
              <div className="h-28 flex items-center justify-center">
                <p className="text-xs text-slate-500">Category will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* MIDDLE COLUMN — flex-1, single full-height card */}
        <div className="flex-1 min-w-0 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          {result ? (
            <AIReasoningPanel reasoning={result.llm_response} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-sm">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-slate-600" />
                </div>
                <h3 className="text-base font-semibold text-slate-300 mb-2">AI Analysis Ready</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Enter incident details in the left panel and click Run Prediction to receive
                  AI-powered troubleshooting recommendations.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN — fixed width, two stacked cards */}
        <div className="w-64 shrink-0 flex flex-col gap-3">

          {/* Card 1: Remediation Steps */}
          <div className="flex-1 min-h-0 bg-slate-900 border border-slate-800 rounded-lg overflow-y-auto">
            {result ? (
              <RemediationCard remediation={result.llm_response} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-10 h-10 text-slate-700 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">Remediation steps will appear here</p>
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Similar Incidents */}
          <div className="flex-1 min-h-0 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
            {result ? (
              <IncidentTable incidents={result.similar_incidents || []} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <BarChart className="w-10 h-10 text-slate-700 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">Similar incidents will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}