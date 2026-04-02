import { Database } from 'lucide-react'

interface RetrievalCardProps {
  incidentCount: number
}

export default function RetrievalCard({ incidentCount }: RetrievalCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3.5 hover:border-emerald-600 transition-all">
      <div className="flex items-start gap-2 mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5" />
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-400 mb-1">
            Retrieved
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-200">{incidentCount}</span>
            <span className="text-xs text-slate-500">
              {incidentCount === 1 ? 'incident' : 'incidents'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
