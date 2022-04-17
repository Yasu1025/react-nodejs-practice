import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { User } from '../entity/user_entity'
import bcryptjs from 'bcryptjs'

export const Users = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User)
  const users = await repository.find()

  res.send(
    users.map(u => {
      const { password, ...data } = u
      return data
    })
  )
}

export const GetUser = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User)
  const { password, ...user } = await repository.findOneById(req.params.id)

  res.send(user)
}

export const CreateUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body
  const hashedPassword = await bcryptjs.hash('1234', 10) // lateruser has to change thir password

  const repository = getManager().getRepository(User)
  const { password, ...data } = await repository.save({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    password: hashedPassword,
  })

  res.status(201).send(data)
}

export const UpdateUser = async (req: Request, res: Response) => {
  const { role_id, ...body } = req.body
  const repository = getManager().getRepository(User)
  const response = await repository.update(req.params.id, {
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
  })

  const { password, ...user } = await repository.findOneById(req.params.id)

  res.status(204).send(user)
}

export const DeleteUser = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User)
  await repository.delete(req.params.id)

  res.status(204).send(null)
}
