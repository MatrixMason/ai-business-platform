import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import {
  Activity,
  Bot,
  Boxes,
  ChartNoAxesCombined,
  ChevronDown,
  CircleHelp,
  Command,
  Database,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Settings,
  Workflow,
  X,
} from 'lucide-react'

const navigation = [
    {
      title: 'РАБОЧАЯ ОБЛАСТЬ',
      items: [
        { label: 'Обзор', path: '/', icon: LayoutDashboard },
        { label: 'AI-агенты', path: '/agents', icon: Bot },
        { label: 'CRM', path: '/crm', icon: Boxes },
        { label: 'Автоматизации', path: '/automations', icon: Workflow },
        { label: 'Каналы связи', path: '/channels', icon: MessageSquare },
        { label: 'База знаний', path: '/knowledge', icon: Database },
      ],
    },
    {
      title: 'УПРАВЛЕНИЕ',
      items: [
        { label: 'Аналитика', path: '/analytics', icon: ChartNoAxesCombined },
        { label: 'Журнал событий', path: '/activity', icon: Activity },
      ],
    },
]

export default function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      {mobileMenuOpen && (
        <button
          aria-label="Close navigation"
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-[#111827] text-slate-300 transition-transform duration-200 lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500 text-white">
              <Command size={20} />
            </div>
            <div>
              <div className="font-semibold tracking-tight text-white">
                AI Платформа
              </div>
              <div className="text-[11px] text-slate-500">
                АВТОМАТИЗАЦИЯ БИЗНЕСА
              </div>
            </div>
          </div>

          <button
            className="rounded-lg p-2 text-slate-400 hover:bg-white/10 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={19} />
          </button>
        </div>

        <nav className="flex-1 space-y-7 overflow-y-auto px-3 py-7">
          {navigation.map((group) => (
            <div key={group.title}>
              <div className="mb-3 px-3 text-[10px] font-semibold tracking-[0.16em] text-slate-500">
                {group.title}
              </div>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === '/'}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition ${
                          isActive
                            ? 'bg-indigo-500/15 text-indigo-300'
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                        }`
                      }
                    >
                      <Icon size={17} />
                      {item.label}
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <NavLink
            to="/settings"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] ${
                isActive
                  ? 'bg-indigo-500/15 text-indigo-300'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Settings size={17} />
            Настройки
          </NavLink>

          <div className="mt-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">
              AD
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-medium text-white">
                Администратор
              </div>
              <div className="text-[11px] text-slate-500">
                Владелец пространства
              </div>
            </div>
            <ChevronDown size={15} className="text-slate-500" />
          </div>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-[260px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-md sm:px-7">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={21} />
            </button>
            <div>
              <div className="text-sm font-semibold text-slate-800">
                Рабочая область
              </div>
              <div className="text-xs text-slate-400">
                AI Платформа / Обзор
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              aria-label="Help"
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <CircleHelp size={19} />
            </button>
            <div className="hidden h-8 w-px bg-slate-200 sm:block" />
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700">
              AD
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] p-4 sm:p-7 lg:p-9">
          <Outlet />
        </main>
      </div>
    </div>
  )
}