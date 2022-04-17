import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import bcryptjs from 'bcryptjs'
import { RegisterValidation } from '../validation/register_validation'
import { User } from '../entity/user_entity'
import { sign, verify } from 'jsonwebtoken'

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

export const Login = async (req: Request, res: Response) => {
  const { body } = req
  const repository = getManager().getRepository(User)
  const user = await repository.findOneBy({ email: body.email })

  if (!user) {
    return res.status(404).send({ message: 'Invalid credentials...' })
  }

  if (!(await bcryptjs.compare(body.password, user.password))) {
    return res.status(404).send({ message: 'Invalid credentials...' })
  }

  const payload = { id: user.id }
  const token = sign(payload, process.env.SECRET_KEY)

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1day
  })
  const { password, ...data } = user

  res.send({ message: 'Login success!!' })
}

export const AuthenticatedUser = async (req: Request, res: Response) => {
  try {
    const jwt = req.cookies['jwt']
    const payload: any = verify(jwt, process.env.SECRET_KEY)
    if (!payload) {
      return res.status(401).send({ message: 'Unauthenticated....' })
    }

    const repository = getManager().getRepository(User)
    const user = await repository.findOneBy({ id: payload.id })

    return res.send(user)
  } catch (e) {
    return res.status(401).send({ message: 'Unauthenticated....' })
  }
}

export const Logout = async (req: Request, res: Response) => {
  res.cookie('jwt', '', { maxAge: 0 })

  res.send({
    message: 'Logout success!!!',
  })
}
