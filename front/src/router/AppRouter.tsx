import { VFC, memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/dashboard'
import { Users } from '../pages/Users'
import { Register } from '../pages/Register'

export const AppRouter: VFC = memo(() => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/users" element={<Users />} />
    <Route path="/register" element={<Register />} />
  </Routes>
))
