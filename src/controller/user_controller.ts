import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { User } from '../entity/user_entity'
import bcryptjs from 'bcryptjs'

export const Users = async (req: Request, res: Response) => {
  const take = 15
  const page = +req.query.page || 1

  const repository = getManager().getRepository(User)
  const [data, total] = await repository.findAndCount({
    take,
    skip: (page - 1) * take,
    relations: ['role'],
  })

  res.send({
    data: data.map(u => {
      const { password, ...data } = u
      return data
    }),
    meta: {
      total,
      page,
      last_page: Math.ceil(total / take),
    },
  })
}

export const GetUser = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User)
  const { password, ...user } = await repository.findOne({
    where: { id: +req.params.id },
    relations: ['role'],
  })

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
    role: { id: role_id || 3 },
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
    role: { id: role_id },
  })

  const { password, ...user } = await repository.findOneById(req.params.id)

  res.status(204).send(user)
}

export const DeleteUser = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(User)
  await repository.delete(req.params.id)

  res.status(204).send(null)
}
