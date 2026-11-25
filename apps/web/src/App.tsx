import { Navigate, Route, Routes } from 'react-router-dom'

import AppLayout from './app/AppLayout'
import DashboardPage from './pages/DashboardPage'
import ModulePage from './pages/ModulePage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="agents" element={<ModulePage />} />
        <Route path="crm" element={<ModulePage />} />
        <Route path="automations" element={<ModulePage />} />
        <Route path="channels" element={<ModulePage />} />
        <Route path="knowledge" element={<ModulePage />} />
        <Route path="analytics" element={<ModulePage />} />
        <Route path="activity" element={<ModulePage />} />
        <Route path="settings" element={<ModulePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}