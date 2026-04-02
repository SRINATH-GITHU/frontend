'use client'

import { CheckCircle2, AlertCircle } from 'lucide-react'

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
    <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start gap-2 mb-4 pb-3 border-b border-green-100">
        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-bold text-slate-900">Remediation Steps</p>
          <p className="text-xs text-slate-500 mt-0.5">Based on NetOps Suggestion</p>
        </div>
      </div>

      {/* Steps List */}
      <div className="flex-1 overflow-y-auto">
        {remediationSteps.length > 0 ? (
          <div className="space-y-3">
            {remediationSteps.map((step, idx) => (
              <div key={idx} className="flex gap-3">
                {/* Step Number Badge */}
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-xs">{idx + 1}</span>
                  </div>
                </div>

                {/* Step Content */}
                <div className="flex-1 pt-0.5">
                  <p className="text-xs text-slate-700 leading-relaxed">{step}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-slate-400">
            <AlertCircle className="w-5 h-5 mb-2" />
            <p className="text-xs">No remediation steps available</p>
          </div>
        )}
      </div>

      {/* Footer Note */}
      <div className="mt-3 pt-3 border-t border-green-100">
        <p className="text-xs text-slate-500 italic">
          Follow these steps in order. Contact on-call engineer if issues persist.
        </p>
      </div>
    </div>
  )
}
