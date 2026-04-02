import { useEffect } from 'react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgColor = type === 'success' ? 'bg-green-100 border-green-300' : 'bg-red-100 border-red-300'
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800'
  const iconBgColor =
    type === 'success' ? 'bg-green-200 border-green-400' : 'bg-red-200 border-red-400'
  const iconColor = type === 'success' ? 'text-green-700' : 'text-red-700'

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className={`flex gap-3 px-4 py-3 rounded-lg border bg-white shadow-lg ${bgColor}`}>
        <div
          className={`flex-shrink-0 w-6 h-6 rounded border flex items-center justify-center text-sm font-bold ${iconBgColor} ${iconColor}`}
        >
          {type === 'success' ? '✓' : '!'}
        </div>
        <div className="flex-1">
          <p className={`text-sm font-semibold ${textColor}`}>
            {type === 'success' ? 'Success' : 'Error'}
          </p>
          <p className={`text-xs mt-0.5 ${textColor}`}>{message}</p>
        </div>
      </div>
    </div>
  )
}
