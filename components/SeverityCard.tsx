import { CircleAlert as AlertCircle } from 'lucide-react'

interface SeverityCardProps {
  severity: string
  confidence: number
}

export default function SeverityCard({ severity, confidence }: SeverityCardProps) {
  const getSeverityColor = (sev: string) => {
    if (sev === 'P1' || sev === 'Critical') {
      return {
        border: 'border-red-600',
        text: 'text-red-400',
        bar: 'bg-red-500',
      }
    }
    if (sev === 'P2' || sev === 'Warning') {
      return {
        border: 'border-amber-600',
        text: 'text-amber-400',
        bar: 'bg-amber-500',
      }
    }
    return {
      border: 'border-emerald-600',
      text: 'text-emerald-400',
      bar: 'bg-emerald-500',
    }
  }

  const colors = getSeverityColor(severity)
  const confidencePercent = Math.round(confidence * 100)

  return (
    <div className={`bg-slate-900 border ${colors.border} rounded-lg p-3.5 hover:${colors.border} transition-all`}>
      <div className="flex items-start gap-2 mb-3">
        <div className={`w-1.5 h-1.5 rounded-full ${colors.bar} mt-1.5`} />
        <div className="flex-1">
          <p className={`text-xs font-bold uppercase tracking-wide ${colors.text} mb-1.5`}>
            Severity
          </p>
          <p className={`text-sm font-bold text-slate-200`}>{severity}</p>
        </div>
      </div>

      <div className="pt-2.5 border-t border-slate-800">
        <div className="flex justify-between items-center mb-1.5 text-xs">
          <span className="text-slate-400 font-medium">Confidence</span>
          <span className={`font-bold ${colors.text}`}>{confidencePercent}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${colors.bar} transition-all duration-500`}
            style={{ width: `${confidencePercent}%` }}
          />
        </div>
      </div>
    </div>
  )
}
