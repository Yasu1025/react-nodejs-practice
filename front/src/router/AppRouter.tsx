import { VFC, memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { Users } from '../pages/users/Users'
import { Register } from '../pages/Register'
import { Login } from '../pages/Login'
import { UserCreate } from '../pages/users/UserCreate'
import { UserEdit } from '../pages/users/UserEdit'
import { Roles } from '../pages/roles/Roles'
import { RoleCreate } from '../pages/roles/RoleCreate'
import { RoleEdit } from '../pages/roles/RoleEdit'
import { ProductsCreate } from '../pages/products/ProductCreate'
import { ProductsEdit } from '../pages/products/ProductEdit'
import { Products } from '../pages/products/Products'

export const AppRouter: VFC = memo(() => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />
    <Route path="/users" element={<Users />} />
    <Route path="/users/create" element={<UserCreate />} />
    <Route path="/users/:id" element={<UserEdit />} />
    <Route path="/roles" element={<Roles />} />
    <Route path="/roles/create" element={<RoleCreate />} />
    <Route path="/roles/:id" element={<RoleEdit />} />
    <Route path="/products" element={<Products />} />
    <Route path="/products/create" element={<ProductsCreate />} />
    <Route path="/products/:id" element={<ProductsEdit />} />
  </Routes>
))
