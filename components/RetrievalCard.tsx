import { Search, Database } from 'lucide-react'

interface RetrievalCardProps {
  incidentCount: number
}

export default function RetrievalCard({ incidentCount }: RetrievalCardProps) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-lg p-4 shadow-sm flex flex-col">
      <div className="flex items-start gap-2 mb-3">
        <Database className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-wide text-purple-600">
            Retrieval Generation
          </p>
          <p className="text-xs text-slate-500 mt-0.5">Historical incidents matched</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center py-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Search className="w-5 h-5 text-purple-600" />
            <span className="text-3xl font-bold text-purple-600">{incidentCount}</span>
          </div>
          <p className="text-xs text-slate-600">
            {incidentCount === 1 ? 'incident' : 'incidents'} found
          </p>
        </div>
      </div>
    </div>
  )
}
