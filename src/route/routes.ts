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
  Roles,
  CreateRole,
  GetRole,
  UpdateRole,
} from '../controller/role_controller'

export const routes = (router: Router) => {
  router.post('/api/register', Register)
  router.post('/api/login', Login)
  router.get('/api/user', AuthMiddleware, AuthenticatedUser)
  router.post('/api/logout', AuthMiddleware, Logout)

  router.put('/api/users/info', AuthMiddleware, UpdateInfo)
  router.put('/api/users/password', AuthMiddleware, UpdatePassword)
  router.get('/api/users', AuthMiddleware, Users)
  router.get('/api/users/:id', AuthMiddleware, GetUser)
  router.post('/api/users', AuthMiddleware, CreateUser)
  router.put('/api/users/:id', AuthMiddleware, UpdateUser)
  router.delete('/api/users/:id', AuthMiddleware, DeleteUser)

  router.get('/api/permissions', AuthMiddleware, Permissions)

  router.get('/api/roles', AuthMiddleware, Roles)
  router.get('/api/roles/:id', AuthMiddleware, GetRole)
  router.post('/api/role', AuthMiddleware, CreateRole)
  router.put('/api/roles/:id', AuthMiddleware, UpdateRole)
  router.delete('/api/roles/:id', AuthMiddleware, DeleteRole)
}
