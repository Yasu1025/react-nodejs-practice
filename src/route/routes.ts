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
}
