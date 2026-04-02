import { AlertCircle, Zap, Lightbulb, CheckCircle, ArrowRight, Brain } from 'lucide-react'

interface AIReasoningPanelProps {
  reasoning: string
}

interface ReasoningSection {
  title: string
  content: string
  icon: React.ReactNode
  color: string
  bgColor: string
}

function parseReasoningContent(text: string): ReasoningSection[] {
  const sections: ReasoningSection[] = []
  
  // Parse ROOT CAUSE ASSESSMENT
  const rootCauseMatch = text.match(/1\.\s*ROOT CAUSE ASSESSMENT:\s*([\s\S]*?)(?=2\.|$)/)
  if (rootCauseMatch) {
    sections.push({
      title: 'Root Cause',
      content: rootCauseMatch[1].trim(),
      icon: <AlertCircle className="w-5 h-5" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50 border-red-200',
    })
  }

  // Parse KEY INSIGHT
  const keyInsightMatch = text.match(/2\.\s*KEY INSIGHT:\s*([\s\S]*?)(?=3\.|$)/)
  if (keyInsightMatch) {
    sections.push({
      title: 'Key Insight',
      content: keyInsightMatch[1].trim(),
      icon: <Lightbulb className="w-5 h-5" />,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 border-amber-200',
    })
  }

  // Parse STEP-BY-STEP REMEDIATION
  const remediationMatch = text.match(/3\.\s*STEP-BY-STEP REMEDIATION:\s*([\s\S]*?)(?=4\.|$)/)
  if (remediationMatch) {
    sections.push({
      title: 'Remediation Steps',
      content: remediationMatch[1].trim(),
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200',
    })
  }

  // Parse WHAT NOT TO DO
  const whatNotMatch = text.match(/4\.\s*WHAT NOT TO DO:\s*([\s\S]*?)(?=5\.|$)/)
  if (whatNotMatch) {
    sections.push({
      title: 'Avoid These Actions',
      content: whatNotMatch[1].trim(),
      icon: <Zap className="w-5 h-5" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 border-orange-200',
    })
  }

  // Parse ESCALATION PATH
  const escalationMatch = text.match(/5\.\s*ESCALATION PATH:\s*([\s\S]*?)$/)
  if (escalationMatch) {
    sections.push({
      title: 'Escalation Path',
      content: escalationMatch[1].trim(),
      icon: <ArrowRight className="w-5 h-5" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
    })
  }

  return sections
}

export default function AIReasoningPanel({ reasoning }: AIReasoningPanelProps) {
  const sections = parseReasoningContent(reasoning)

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col h-full overflow-hidden">
      {/* Enhanced Panel Header */}
      <div className="border-b border-slate-200 px-4 py-4 bg-gradient-to-r from-slate-50 to-transparent">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-slate-700" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">AI Reasoning Summary</h3>
            <p className="text-xs text-slate-500 mt-0.5">Detailed analysis and remediation guidance</p>
          </div>
        </div>
      </div>

      {/* Panel Body with Cards */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {sections.length > 0 ? (
          sections.map((section, idx) => (
            <div
              key={idx}
              className={`border rounded-lg p-3.5 transition-all hover:shadow-md ${section.bgColor}`}
            >
              {/* Section Header */}
              <div className="flex items-start gap-2.5 mb-2.5">
                <div className={`flex-shrink-0 mt-0.5 ${section.color}`}>
                  {section.icon}
                </div>
                <h4 className="text-xs font-semibold text-slate-900">{section.title}</h4>
              </div>

              {/* Section Content */}
              <p className="text-xs text-slate-700 leading-relaxed ml-7 whitespace-pre-wrap break-words">
                {section.content}
              </p>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-40 text-slate-400">
            <p className="text-xs">No reasoning available yet. Run a prediction to see analysis.</p>
          </div>
        )}
      </div>
    </div>
  )
}
