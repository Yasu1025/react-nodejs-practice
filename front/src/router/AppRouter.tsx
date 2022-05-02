import { VFC, memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { Users } from '../pages/users/Users'
import { Register } from '../pages/Register'
import { Login } from '../pages/Login'
import { UserCreate } from '../pages/users/UserCreate'

export const AppRouter: VFC = memo(() => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/users" element={<Users />} />
    <Route path="/users/create" element={<UserCreate />} />
  </Routes>
))
