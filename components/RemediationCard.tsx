'use client'

import { CircleCheck as CheckCircle2, CircleAlert as AlertCircle } from 'lucide-react'

interface RemediationCardProps {
  remediation: string
}

export default function RemediationCard({ remediation }: RemediationCardProps) {
  const parseRemediationSteps = (text: string): string[] => {
    return text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.match(/^\d+\.|^[*•]/))
      .slice(0, 6)
  }

  const remediationSteps = parseRemediationSteps(remediation)

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-start gap-2 px-4 py-3 border-b border-slate-800 bg-slate-800">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-xs font-bold text-slate-200 uppercase tracking-wide">Remediation Steps</p>
          <p className="text-xs text-slate-500 mt-0.5">AI-generated action plan</p>
        </div>
      </div>

      {/* Steps List */}
      <div className="flex-1 overflow-y-auto p-3">
        {remediationSteps.length > 0 ? (
          <div className="space-y-2.5">
            {remediationSteps.map((step, idx) => (
              <div key={idx} className="flex gap-2.5">
                {/* Step Number Badge */}
                <div className="flex-shrink-0">
                  <div className="w-5 h-5 rounded-md bg-emerald-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">{idx + 1}</span>
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1">
                  <p className="text-xs text-slate-400 leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-600">
            <AlertCircle className="w-8 h-8 mb-2" />
            <p className="text-xs">No remediation steps available</p>
          </div>
        )}
      </div>

      {/* Footer Note */}
      {remediationSteps.length > 0 && (
        <div className="px-3 py-2.5 border-t border-slate-800 bg-slate-800">
          <p className="text-xs text-slate-500">
            Follow steps in sequence. Escalate if unresolved.
          </p>
        </div>
      )}
    </div>
  )
}
