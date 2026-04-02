'use client'

import { useState } from 'react'

interface Incident {
  incident_id: string
  location: string
  problem_statement: string
  root_cause: string
  remediation_steps: string
  noc_category: string
  severity: string
  similarity_score: number
  similarity_pct: string
}

interface IncidentTableProps {
  incidents: Incident[]
}

export default function IncidentTable({ incidents }: IncidentTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredIncidents = incidents.filter(
    (incident) =>
      incident.incident_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.noc_category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg flex flex-col overflow-hidden h-full">
      {/* Table Tools */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800 bg-slate-800">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide">Similar Incidents</h3>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by ID, location, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-2.5 py-1.5 border border-slate-700 rounded-lg bg-slate-900 text-xs text-slate-300 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="text-left px-3 py-2.5 bg-slate-800 border-b border-slate-700 font-bold text-slate-400 whitespace-nowrap sticky top-0">
                ID
              </th>
              <th className="text-left px-3 py-2.5 bg-slate-800 border-b border-slate-700 font-bold text-slate-400 whitespace-nowrap sticky top-0">
                Location
              </th>
              <th className="text-left px-3 py-2.5 bg-slate-800 border-b border-slate-700 font-bold text-slate-400 whitespace-nowrap sticky top-0">
                Category
              </th>
              <th className="text-left px-3 py-2.5 bg-slate-800 border-b border-slate-700 font-bold text-slate-400 whitespace-nowrap sticky top-0">
                Match
              </th>
              <th className="text-left px-3 py-2.5 bg-slate-800 border-b border-slate-700 font-bold text-slate-400 whitespace-nowrap sticky top-0">

              </th>
            </tr>
          </thead>
          <tbody>
            {filteredIncidents.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-6 text-center text-slate-600">
                  No incidents found
                </td>
              </tr>
            ) : (
              filteredIncidents.map((incident) => (
                <IncidentRow
                  key={incident.incident_id}
                  incident={incident}
                  isExpanded={expandedId === incident.incident_id}
                  onToggle={() => toggleExpand(incident.incident_id)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function IncidentRow({
  incident,
  isExpanded,
  onToggle,
}: {
  incident: Incident
  isExpanded: boolean
  onToggle: () => void
}) {
  const getCategoryBadgeColor = (category: string) => {
    if (category.includes('WAN')) return 'bg-blue-900 border-blue-700 text-blue-300'
    if (category.includes('Network')) return 'bg-cyan-900 border-cyan-700 text-cyan-300'
    if (category.includes('Server')) return 'bg-emerald-900 border-emerald-700 text-emerald-300'
    return 'bg-slate-700 border-slate-600 text-slate-300'
  }

  const getSimilarityColor = (score: number) => {
    if (score >= 0.9) return 'text-emerald-400'
    if (score >= 0.7) return 'text-blue-400'
    return 'text-slate-500'
  }

  return (
    <>
      <tr
        onClick={onToggle}
        className="border-b border-slate-800 hover:bg-slate-800 cursor-pointer transition-colors"
      >
        <td className="px-3 py-2.5 text-slate-300 font-medium">{incident.incident_id}</td>
        <td className="px-3 py-2.5 text-slate-400">{incident.location}</td>
        <td className="px-3 py-2.5">
          <span
            className={`inline-flex px-2 py-0.5 rounded-md border text-xs font-semibold ${getCategoryBadgeColor(incident.noc_category)}`}
          >
            {incident.noc_category}
          </span>
        </td>
        <td className={`px-3 py-2.5 font-bold ${getSimilarityColor(incident.similarity_score)}`}>
          {incident.similarity_pct || Math.round(incident.similarity_score * 100) + '%'}
        </td>
        <td className="px-3 py-2.5">
          <span className="text-slate-500 text-xs">{isExpanded ? '▼' : '▶'}</span>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-slate-800 border-b border-slate-700">
          <td colSpan={5} className="px-3 py-3">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 space-y-2.5">
              <div>
                <p className="text-xs font-bold text-slate-400 mb-1">Problem</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {incident.problem_statement}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 mb-1">Root Cause</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {incident.root_cause}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 mb-1">Remediation</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {incident.remediation_steps}
                </p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
