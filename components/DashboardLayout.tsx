'use client'

import { useState, useEffect } from 'react'
import { Activity, Hop as Home, ChartBar as BarChart3, Settings, FileText, Clock, Download, Moon, Sun } from 'lucide-react'
import InputPanel from '@/components/InputPanel'
import CategoryCard from '@/components/CategoryCard'
import SeverityCard from '@/components/SeverityCard'
import RetrievalCard from '@/components/RetrievalCard'
import RemediationCard from '@/components/RemediationCard'
import IncidentTable from '@/components/IncidentTable'
import AIReasoningPanel from '@/components/AIReasoningPanel'

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
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }))
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('noc-theme') as 'light' | 'dark' | null
    const initial = stored || 'dark'
    setTheme(initial)
    applyTheme(initial)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement
    if (newTheme === 'dark') {
      root.classList.add('dark')
      root.style.colorScheme = 'dark'
    } else {
      root.classList.remove('dark')
      root.style.colorScheme = 'light'
    }
    localStorage.setItem('noc-theme', newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  const getSeverityStatus = (severity: string) => {
    if (severity === 'P1' || severity === 'Critical') return 'critical'
    if (severity === 'P2' || severity === 'Warning') return 'warning'
    return 'normal'
  }

  if (!mounted) return null

  const bgColor = theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'
  const navColor = theme === 'dark' ? 'bg-slate-900' : 'bg-white'
  const borderColor = theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
  const textColor = theme === 'dark' ? 'text-white' : 'text-slate-900'
  const secondaryText = theme === 'dark' ? 'text-slate-400' : 'text-slate-600'

  return (
    <div className={`h-screen flex flex-col ${bgColor} overflow-hidden`}>
      {/* Top Navigation Bar */}
      <nav className={`h-14 ${navColor} border-b ${borderColor} flex items-center px-4 shrink-0`}>
        <div className="flex items-center gap-3 flex-1">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-500" />
            <span className={`text-base font-bold tracking-tight ${textColor}`}>NOC-GPT</span>
          </div>
          <div className={`h-6 w-px ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'}`} />
          <div className="flex items-center gap-1">
            <button className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-colors ${
              theme === 'dark'
                ? 'bg-slate-800 text-slate-100 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}>
              <Home className="w-3.5 h-3.5" />
              Dashboard
            </button>
            <button className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-colors ${
              theme === 'dark'
                ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}>
              <BarChart3 className="w-3.5 h-3.5" />
              Analytics
            </button>
            <button className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-colors ${
              theme === 'dark'
                ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}>
              <FileText className="w-3.5 h-3.5" />
              Reports
            </button>
            <button className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-colors ${
              theme === 'dark'
                ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}>
              <Settings className="w-3.5 h-3.5" />
              Settings
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {latency > 0 && (
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${
              theme === 'dark'
                ? 'bg-slate-800 border-slate-700'
                : 'bg-slate-100 border-slate-300'
            }`}>
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span className={`text-xs font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>{latency}ms</span>
            </div>
          )}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${
            theme === 'dark'
              ? 'bg-slate-800 border-slate-700'
              : 'bg-slate-100 border-slate-300'
          }`}>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className={`text-xs font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>{currentTime}</span>
          </div>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-all ${
              theme === 'dark'
                ? 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                : 'bg-slate-100 border-slate-300 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={onExport}
            className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!result}
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Input Panel */}
        <aside className={`w-80 ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} border-r flex flex-col shrink-0`}>
          <div className="flex-1 overflow-y-auto">
            <InputPanel
              onPredict={onPredict}
              loading={loading}
              severity={result ? getSeverityStatus(result.predicted_severity) : 'normal'}
              theme={theme}
            />
          </div>
        </aside>

        {/* Main Dashboard Grid */}
        <main className="flex-1 p-3 overflow-hidden flex flex-col gap-3">
          {/* Top Row - Metrics & AI Reasoning */}
          <div className="grid grid-cols-12 gap-3 h-[45%]">
            {/* Metrics Column */}
            <div className="col-span-3 flex flex-col gap-3">
              {result && (
                <>
                  <CategoryCard
                    category={result.predicted_category}
                    categoryConfidence={result.category_confidence}
                  />
                  <SeverityCard
                    severity={result.predicted_severity}
                    confidence={result.severity_confidence}
                  />
                  <RetrievalCard
                    incidentCount={result.similar_incidents?.length || 0}
                  />
                </>
              )}
              {!result && (
                <div className="flex-1 flex items-center justify-center bg-slate-900 border border-slate-800 rounded-lg">
                  <div className="text-center">
                    <Activity className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                    <p className="text-sm text-slate-500 font-medium">Submit an incident to see predictions</p>
                  </div>
                </div>
              )}
            </div>

            {/* AI Reasoning */}
            <div className="col-span-9 overflow-hidden">
              {result ? (
                <AIReasoningPanel reasoning={result.llm_response} />
              ) : (
                <div className="h-full flex items-center justify-center bg-slate-900 border border-slate-800 rounded-lg">
                  <div className="text-center max-w-md">
                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Activity className="w-8 h-8 text-slate-600" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-300 mb-2">AI Analysis Ready</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Enter incident details in the left panel and click Run Prediction to receive AI-powered troubleshooting recommendations
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Row - Remediation & Incidents */}
          <div className="grid grid-cols-2 gap-3 flex-1 overflow-hidden">
            <div className="overflow-hidden">
              {result ? (
                <RemediationCard remediation={result.llm_response} />
              ) : (
                <div className="h-full flex items-center justify-center bg-slate-900 border border-slate-800 rounded-lg">
                  <div className="text-center">
                    <FileText className="w-10 h-10 text-slate-700 mx-auto mb-2" />
                    <p className="text-sm text-slate-500 font-medium">Remediation steps will appear here</p>
                  </div>
                </div>
              )}
            </div>
            <div className="overflow-hidden">
              {result ? (
                <IncidentTable incidents={result.similar_incidents || []} />
              ) : (
                <div className="h-full flex items-center justify-center bg-slate-900 border border-slate-800 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="w-10 h-10 text-slate-700 mx-auto mb-2" />
                    <p className="text-sm text-slate-500 font-medium">Similar incidents will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
