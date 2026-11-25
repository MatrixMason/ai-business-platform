import {
    Activity,
    ArrowUpRight,
    Bot,
    CheckCircle2,
    Clock3,
    MessageSquare,
    Plus,
    Workflow,
  } from 'lucide-react'
  
  const stats = [
    {
      label: 'Активные AI-агенты',
      value: '08',
      change: '+2 за этот месяц',
      icon: Bot,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      label: 'Автоматизации',
      value: '24',
      change: '18 выполняются',
      icon: Workflow,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      label: 'Диалоги',
      value: '1 284',
      change: '+12,8% за неделю',
      icon: MessageSquare,
      color: 'bg-sky-50 text-sky-600',
    },
    {
      label: 'Успешно выполнено задач',
      value: '96,4%',
      change: 'За последние 30 дней',
      icon: CheckCircle2,
      color: 'bg-amber-50 text-amber-600',
    },
  ]
  
  const activities = [
    {
      title: 'AI-агент по продажам выполнил задачу',
      description: 'Квалификация лида · Чат на сайте',
      time: '2 минуты назад',
      icon: Bot,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Выполнена новая автоматизация',
      description: 'Уведомление о новом лиде · amoCRM',
      time: '18 минут назад',
      icon: Workflow,
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Получено новое сообщение',
      description: 'Чат на сайте · Входящее сообщение',
      time: '34 минуты назад',
      icon: MessageSquare,
      color: 'bg-sky-50 text-sky-600',
    },
  ]
  
  export default function DashboardPage() {
    return (
      <div className="space-y-7">
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="text-sm font-medium text-indigo-600">
              ОБЗОР
            </div>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Панель управления
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Контролируйте работу AI-агентов, автоматизаций и бизнес-процессов.
            </p>
          </div>
  
          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700">
            <Plus size={17} />
            Создать автоматизацию
          </button>
        </section>
  
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
  
            return (
              <article
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    {stat.label}
                  </span>
                  <div className={`rounded-lg p-2 ${stat.color}`}>
                    <Icon size={19} />
                  </div>
                </div>
  
                <div className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </div>
  
                <div className="mt-2 text-xs text-slate-400">
                  {stat.change}
                </div>
              </article>
            )
          })}
        </section>
  
        <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.5fr_1fr]">
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                    Активность платформы
                </h2>
                <p className="mt-1 text-xs text-slate-400">
                    Обзор последних операций системы
                </p>
              </div>
              <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-50">
                <ArrowUpRight size={18} />
              </button>
            </div>
  
            <div className="mt-7 flex h-48 items-end gap-3 border-b border-slate-100 px-2">
              {[38, 55, 43, 70, 58, 82, 65, 92, 74, 60, 88, 100].map(
                (height, index) => (
                  <div
                    key={index}
                    className="flex h-full flex-1 flex-col justify-end"
                  >
                    <div
                      className="rounded-t-md bg-indigo-500/80 transition hover:bg-indigo-600"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ),
              )}
            </div>
  
            <div className="mt-3 flex justify-between text-[11px] text-slate-400">
              <span>Последние 12 периодов</span>
              <span>Демонстрационные данные</span>
            </div>
          </article>
  
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div>
              <h2 className="font-semibold text-slate-900">
                Состояние системы
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Текущее состояние компонентов
              </p>
            </div>
  
            <div className="mt-6 space-y-5">
              {[
                { label: 'AI-оркестратор', status: 'Работает' },
                { label: 'Центр коммуникаций', status: 'Работает' },
                { label: 'Движок автоматизаций', status: 'Работает' },
                { label: 'Интеграция с CRM', status: 'Не подключено' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="text-sm text-slate-600">
                    {item.label}
                  </span>
                  <span
                    className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      item.status === 'Работает'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
  
            <div className="mt-6 rounded-lg bg-slate-50 p-3 text-xs leading-5 text-slate-500">
              Эти статусы приведены для демонстрации. Реальные проверки состояния будут подключены к Backend на следующих этапах.
            </div>
          </article>
        </section>
  
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Последние события
              </h2>
              <p className="mt-1 text-xs text-slate-400">
                Последние события в рабочем пространстве
              </p>
            </div>
            <Activity size={19} className="text-slate-400" />
          </div>
  
          <div className="mt-5 divide-y divide-slate-100">
            {activities.map((activity) => {
              const Icon = activity.icon
  
              return (
                <div
                  key={activity.title}
                  className="flex items-center gap-3 py-4"
                >
                  <div className={`rounded-lg p-2.5 ${activity.color}`}>
                    <Icon size={18} />
                  </div>
  
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-slate-800">
                      {activity.title}
                    </div>
                    <div className="mt-1 truncate text-xs text-slate-400">
                      {activity.description}
                    </div>
                  </div>
  
                  <div className="hidden items-center gap-1 text-xs text-slate-400 sm:flex">
                    <Clock3 size={13} />
                    {activity.time}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    )
  }