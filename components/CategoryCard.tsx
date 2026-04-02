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
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3.5 hover:border-blue-600 transition-all">
      <div className="flex items-start gap-2 mb-3">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
        <div className="flex-1">
          <p className="text-xs text-blue-400 font-bold uppercase tracking-wide mb-1.5">
            Category
          </p>
          <p className="text-sm font-bold text-slate-200 line-clamp-2 leading-tight">{category}</p>
        </div>
      </div>

      {/* Confidence Indicator */}
      <div className="pt-2.5 border-t border-slate-800">
        <div className="flex justify-between items-center mb-1.5 text-xs">
          <span className="text-slate-400 font-medium">Confidence</span>
          <span className="text-blue-400 font-bold">{confidencePercent}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
            style={{ width: `${confidencePercent}%` }}
          />
        </div>
      </div>
    </div>
  )
}
