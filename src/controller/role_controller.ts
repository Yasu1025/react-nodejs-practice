import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Role } from '../entity/role_entity'

export const Roles = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Role)
  res.send(repository.find())
}
