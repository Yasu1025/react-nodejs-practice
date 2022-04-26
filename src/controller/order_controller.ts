import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Order } from '../entity/order_entity'

export const Orders = async (req: Request, res: Response) => {
  const take = 15
  const page = +req.query.page || 1

  const repository = getManager().getRepository(Order)
  const [data, total] = await repository.findAndCount({
    take,
    skip: (page - 1) * take,
    relations: ['order_items'],
  })

  res.send({
    data: data.map((order: Order) => ({
      id: order.id,
      name: order.name,
      email: order.email,
      totalPrice: order.totalPrice,
      created_at: order.created_at,
      order_items: order.order_items,
    })),
    meta: {
      total,
      page,
      last_page: Math.ceil(total / take),
    },
  })
}
