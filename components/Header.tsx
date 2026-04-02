import { useEffect, useState } from 'react'

interface HeaderProps {
  timestamp?: string
  latency: number
  onExport: () => void
}

export default function Header({ timestamp, latency, onExport }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).replace(/\//g, '-'))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4.5 gap-4">
      <div className="flex-1">
        <h1 className="text-sm font-bold text-blue-900 tracking-wide">NOC-GPT</h1>
      </div>

      <div className="flex-1 text-center">
        <p className="text-sm font-semibold text-slate-800">Predictive Troubleshooting Dashboard</p>
      </div>

      <div className="flex-1 flex justify-end items-center gap-3">
        <span className="text-xs text-slate-500 whitespace-nowrap">{currentTime}</span>
        {latency > 0 && (
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 px-2.5 py-1 rounded-full border border-slate-200 bg-slate-50">
            Response: {latency.toFixed(1)}ms
          </span>
        )}
        <button
          onClick={onExport}
          className="text-xs font-semibold px-3 py-1.5 rounded border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 transition-colors"
        >
          Export Report
        </button>
      </div>
    </header>
  )
}
