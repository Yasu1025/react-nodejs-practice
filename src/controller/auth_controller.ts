import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import bcryptjs from 'bcryptjs'
import { RegisterValidation } from '../validation/register_validation'
import { User } from '../entity/user_entity'

export const Register = async (req: Request, res: Response) => {
  const { body } = req
  const { error } = RegisterValidation.validate(body)
  if (error) {
    return res.status(400).send(error.details)
  }
  if (body.password !== body.password_confirm) {
    return res.status(400).send({
      message: 'Password are not matched...',
    })
  }

  const repository = getManager().getRepository(User)
  const user = await repository.save({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    password: await bcryptjs.hash(body.password, 10),
  })

  res.send(user)
}
