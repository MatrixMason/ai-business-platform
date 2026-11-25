import { useLocation } from 'react-router-dom'
import { Construction } from 'lucide-react'

const moduleNames: Record<string, string> = {
    '/agents': 'AI-агенты',
    '/crm': 'CRM',
    '/automations': 'Автоматизации',
    '/channels': 'Каналы коммуникации',
    '/knowledge': 'База знаний',
    '/analytics': 'Аналитика',
    '/activity': 'Журнал событий',
    '/settings': 'Настройки',
}

export default function ModulePage() {
  const location = useLocation()
  const title = moduleNames[location.pathname] ?? 'Module'

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 text-center">
      <div className="rounded-2xl bg-indigo-50 p-4 text-indigo-600">
        <Construction size={28} />
      </div>

      <h1 className="mt-5 text-2xl font-bold text-slate-900">
        {title}
      </h1>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        Этот модуль входит в состав AI Платформы.
        Его функциональность будет реализована на следующих этапах разработки.
      </p>

      <span className="mt-5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
        В разработке
      </span>
    </section>
  )
}