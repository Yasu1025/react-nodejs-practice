import { VFC, memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { Users } from '../pages/Users'
import { Register } from '../pages/Register'
import { Login } from '../pages/Login'

export const AppRouter: VFC = memo(() => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/users" element={<Users />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
  </Routes>
))
