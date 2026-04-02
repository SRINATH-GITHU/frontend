'use client'

interface CategoryCardProps {
  category: string
  categoryConfidence: number
}

export default function CategoryCard({
  category,
  categoryConfidence,
}: CategoryCardProps) {
  const confidencePercent = Math.round(categoryConfidence * 100)

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5" />
        <div className="flex-1">
          <p className="text-xs text-blue-600 font-bold uppercase tracking-wide mb-1">
            Predicted Incident Type
          </p>
          <p className="text-sm font-bold text-slate-900 line-clamp-2 leading-tight">{category}</p>
        </div>
      </div>

      {/* Confidence Indicator */}
      <div className="pt-3 border-t border-blue-100">
        <div className="flex justify-between items-center mb-2 text-xs">
          <span className="text-slate-600 font-semibold">Confidence Score</span>
          <span className="text-blue-700 font-bold text-sm">{confidencePercent}%</span>
        </div>
        <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden border border-blue-200">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500"
            style={{ width: `${confidencePercent}%` }}
          />
        </div>
      </div>
    </div>
  )
}
