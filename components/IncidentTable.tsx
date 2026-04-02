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
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col overflow-hidden">
      {/* Table Tools */}
      <div className="flex items-center gap-3 px-3.5 py-3 border-b border-slate-200 bg-white">
        <h3 className="text-xs font-bold text-slate-800">Similar Incidents</h3>
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search incidents by ID, location, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg bg-slate-50 text-xs outline-none focus:border-blue-300 focus:bg-blue-50"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr>
              <th className="text-left px-3.5 py-2.5 bg-slate-50 border-b border-slate-200 font-bold text-slate-500 whitespace-nowrap">
                Incident ID
              </th>
              <th className="text-left px-3.5 py-2.5 bg-slate-50 border-b border-slate-200 font-bold text-slate-500 whitespace-nowrap">
                Location
              </th>
              <th className="text-left px-3.5 py-2.5 bg-slate-50 border-b border-slate-200 font-bold text-slate-500 whitespace-nowrap">
                Category
              </th>
              <th className="text-left px-3.5 py-2.5 bg-slate-50 border-b border-slate-200 font-bold text-slate-500 whitespace-nowrap">
                Similarity
              </th>
              <th className="text-left px-3.5 py-2.5 bg-slate-50 border-b border-slate-200 font-bold text-slate-500 whitespace-nowrap">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredIncidents.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3.5 py-6 text-center text-slate-500">
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
    if (category.includes('WAN')) return 'bg-indigo-100 border-indigo-300 text-indigo-700'
    if (category.includes('Network')) return 'bg-blue-100 border-blue-300 text-blue-700'
    if (category.includes('Server')) return 'bg-purple-100 border-purple-300 text-purple-700'
    return 'bg-slate-100 border-slate-300 text-slate-700'
  }

  const getSimilarityColor = (score: number) => {
    if (score >= 0.9) return 'text-green-600'
    if (score >= 0.7) return 'text-blue-600'
    return 'text-slate-600'
  }

  return (
    <>
      <tr
        onClick={onToggle}
        className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors"
      >
        <td className="px-3.5 py-3 text-slate-800 font-semibold">{incident.incident_id}</td>
        <td className="px-3.5 py-3 text-slate-700">{incident.location}</td>
        <td className="px-3.5 py-3">
          <span
            className={`inline-flex px-2 py-1 rounded-full border text-xs font-bold ${getCategoryBadgeColor(incident.noc_category)}`}
          >
            {incident.noc_category}
          </span>
        </td>
        <td className={`px-3.5 py-3 font-bold ${getSimilarityColor(incident.similarity_score)}`}>
          {incident.similarity_pct || Math.round(incident.similarity_score * 100) + '%'}
        </td>
        <td className="px-3.5 py-3">
          <span className="text-slate-500">{isExpanded ? '▼' : '▶'}</span>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-slate-50 border-b border-slate-100">
          <td colSpan={5} className="px-3.5 py-4">
            <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-3">
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1">Problem Statement</p>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {incident.problem_statement}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1">Root Cause</p>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong className="text-blue-900">Root Cause:</strong> {incident.root_cause}
                </p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 mb-1">Remediation Steps</p>
                <p className="text-xs text-slate-700 leading-relaxed">
                  <strong className="text-blue-900">Steps:</strong> {incident.remediation_steps}
                </p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}
