import { Request, Response } from 'express'
import { User } from '../entity/user_entity'

type AccessType = 'products' | 'users' | 'roles' | 'orders'

export const PermissionMiddleware = (access: AccessType) => {
  return async (req: Request, res: Response, next: Function) => {
    const user: User = req['user']
    const permissions = user.role ? user.role.permissions : []

    if (req.method === 'GET') {
      const isAuthorized = permissions.some(
        p => p.name === `view_${access}` || p.name === `edit_${access}`
      )
      if (!isAuthorized) {
        return res.status(401).send({ message: 'Unauthorized...' })
      }
    } else {
      const isAuthorized = permissions.some(p => p.name === `edit_${access}`)
      if (!isAuthorized) {
        return res.status(401).send({ message: 'Unauthorized...' })
      }
    }

    next()
  }
}
