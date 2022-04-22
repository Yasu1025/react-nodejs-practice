import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { User } from '../entity/user_entity'
import { Product } from '../entity/product_entity'

export const Products = async (req: Request, res: Response) => {
  const take = 15
  const page = +req.query.page || 1
  const repository = getManager().getRepository(Product)
  const [data, total] = await repository.findAndCount({
    take,
    skip: (page - 1) * take,
  })

  res.send({
    data,
    meta: {
      total,
      page,
      last_page: Math.ceil(total / take),
    },
  })
}

export const GetProduct = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Product)
  const product = await repository.findOneBy({ id: +req.params.id })

  res.send(product)
}

export const CreateProduct = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Product)
  const product = await repository.save(req.body)

  res.status(201).send(product)
}

export const UpdateProduct = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Product)
  await repository.update(req.params.id, req.body)

  const product = await repository.findOneBy({ id: +req.params.id })

  res.status(204).send(product)
}

export const DeleteProduct = async (req: Request, res: Response) => {
  const repository = getManager().getRepository(Product)
  await repository.delete(req.params.id)

  res.status(204).send(null)
}
