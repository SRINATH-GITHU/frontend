import { AlertCircle } from 'lucide-react'

interface SeverityCardProps {
  severity: string
  confidence: number
}

export default function SeverityCard({ severity, confidence }: SeverityCardProps) {
  const getSeverityColor = (sev: string) => {
    if (sev === 'P1' || sev === 'Critical') {
      return {
        bg: 'bg-red-50',
        border: 'border-red-200',
        dot: 'bg-red-600',
        text: 'text-red-700',
        confidence: 'text-red-600',
      }
    }
    if (sev === 'P2' || sev === 'Warning') {
      return {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        dot: 'bg-amber-600',
        text: 'text-amber-700',
        confidence: 'text-amber-600',
      }
    }
    return {
      bg: 'bg-green-50',
      border: 'border-green-200',
      dot: 'bg-green-600',
      text: 'text-green-700',
      confidence: 'text-green-600',
    }
  }

  const colors = getSeverityColor(severity)
  const confidencePercent = Math.round(confidence * 100)

  return (
    <div className={`border rounded-lg p-4 shadow-sm flex flex-col ${colors.bg} ${colors.border}`}>
      <div className="flex items-start gap-2 mb-3">
        <AlertCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${colors.text}`} />
        <div className="flex-1">
          <p className={`text-xs font-bold uppercase tracking-wide ${colors.text}`}>
            Predicted Severity
          </p>
        </div>
      </div>

      <div className="mb-3">
        <p className={`text-lg font-bold ${colors.text}`}>{severity}</p>
      </div>

      <div className="border-t pt-3" style={{ borderColor: colors.dot }}>
        <div className="flex justify-between items-center mb-2 text-xs">
          <span className="text-slate-600 font-semibold">Confidence</span>
          <span className={`font-bold ${colors.confidence}`}>{confidencePercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: `${colors.dot}20` }}>
          <div
            className="h-full transition-all duration-500"
            style={{ 
              width: `${confidencePercent}%`,
              backgroundColor: colors.dot 
            }}
          />
        </div>
      </div>
    </div>
  )
}
