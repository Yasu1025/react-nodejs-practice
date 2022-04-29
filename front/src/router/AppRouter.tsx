import { VFC, memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/dashboard'
import { Users } from '../pages/Users'

export const AppRouter: VFC = memo(() => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/users" element={<Users />} />
  </Routes>
))
