import { Router } from 'express'
import {
  Register,
  Login,
  AuthenticatedUser,
  Logout,
} from '../controller/auth_controller'
import { AuthMiddleware } from '../middleware/auth_middleware'
import { UpdateInfo, UpdatePassword } from '../controller/auth_controller'
import { DeleteUser } from '../controller/user_controller'
import {
  Users,
  CreateUser,
  GetUser,
  UpdateUser,
} from '../controller/user_controller'
import { Permissions } from '../controller/permission_controller'
import { DeleteRole } from '../controller/role_controller'
import {
  Products,
  GetProduct,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} from '../controller/product_controller'
import {
  Roles,
  CreateRole,
  GetRole,
  UpdateRole,
} from '../controller/role_controller'
import { UploadImage } from '../controller/image_controller'
import express from 'express'
import { PermissionMiddleware } from '../middleware/permission_middleware'
import {
  Orders,
  ExportOrders,
  OrdersChart,
} from '../controller/order_controller'

export const routes = (router: Router) => {
  // AUTH
  router.post('/api/register', Register)
  router.post('/api/login', Login)
  router.get('/api/user', AuthMiddleware, AuthenticatedUser)
  router.post('/api/logout', AuthMiddleware, Logout)
  router.put('/api/users/info', AuthMiddleware, UpdateInfo)
  router.put('/api/users/password', AuthMiddleware, UpdatePassword)

  // User
  router.get('/api/users', AuthMiddleware, PermissionMiddleware('users'), Users)
  router.get(
    '/api/users/:id',
    AuthMiddleware,
    PermissionMiddleware('users'),
    GetUser
  )
  router.post(
    '/api/users',
    AuthMiddleware,
    PermissionMiddleware('users'),
    CreateUser
  )
  router.put(
    '/api/users/:id',
    AuthMiddleware,
    PermissionMiddleware('users'),
    UpdateUser
  )
  router.delete(
    '/api/users/:id',
    AuthMiddleware,
    PermissionMiddleware('users'),
    DeleteUser
  )

  // Permission
  router.get('/api/permissions', AuthMiddleware, Permissions)

  // Role
  router.get('/api/roles', AuthMiddleware, PermissionMiddleware('roles'), Roles)
  router.get(
    '/api/roles/:id',
    AuthMiddleware,
    PermissionMiddleware('roles'),
    GetRole
  )
  router.post(
    '/api/roles',
    AuthMiddleware,
    PermissionMiddleware('roles'),
    CreateRole
  )
  router.put(
    '/api/roles/:id',
    AuthMiddleware,
    PermissionMiddleware('roles'),
    UpdateRole
  )
  router.delete(
    '/api/roles/:id',
    AuthMiddleware,
    PermissionMiddleware('roles'),
    DeleteRole
  )

  // Product
  router.get(
    '/api/products',
    AuthMiddleware,
    PermissionMiddleware('products'),
    Products
  )
  router.get(
    '/api/products/:id',
    AuthMiddleware,
    PermissionMiddleware('products'),
    GetProduct
  )
  router.post(
    '/api/products',
    AuthMiddleware,
    PermissionMiddleware('products'),
    CreateProduct
  )
  router.put(
    '/api/products/:id',
    AuthMiddleware,
    PermissionMiddleware('products'),
    UpdateProduct
  )
  router.delete(
    '/api/products/:id',
    AuthMiddleware,
    PermissionMiddleware('products'),
    DeleteProduct
  )

  // Image
  router.post('/api/upload', AuthMiddleware, UploadImage)
  router.use('/api/uploads', express.static('./uploads'))

  // Order
  router.get(
    '/api/orders',
    AuthMiddleware,
    PermissionMiddleware('orders'),
    Orders
  )
  router.post(
    '/api/orders/export',
    AuthMiddleware,
    PermissionMiddleware('orders'),
    ExportOrders
  )
  router.get(
    '/api/orders/chart',
    AuthMiddleware,
    PermissionMiddleware('orders'),
    OrdersChart
  )
}
