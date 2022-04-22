import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Role } from '../entity/role_entity'

export const Roles = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Role)
  res.send(await repository.find())
}

export const CreateRole = async (req: Request, res: Response) => {
  const { name, permissions }: { name: string; permissions: number[] } =
    req.body
  const repository = getManager().getRepository(Role)

  const newRole = await repository.save({
    name,
    permissions: permissions.map(id => ({ id })),
  })

  res.send(newRole)
}

export const GetRole = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Role)
  res.send(
    await repository.findOne({
      where: { id: +req.params.id },
      relations: ['permissions'],
    })
  )
}

export const UpdateRole = async (req: Request, res: Response) => {
  const { name, permissions }: { name: string; permissions: number[] } =
    req.body
  const repository = getManager().getRepository(Role)
  const updatedRole = await repository.save({
    id: +req.params.id,
    name,
    permissions: permissions.map(id => ({ id })),
  })

  res.send(updatedRole)
}

export const DeleteRole = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Role)
  await repository.delete(req.params.id)

  res.status(204).send(null)
}
