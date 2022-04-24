import { createConnection, getManager } from 'typeorm'
import ormConfig from '../config/ormconfig'
import faker from '@faker-js/faker'
import { randomInt } from 'crypto'
import { Order } from '../entity/order_entity'
import { OrderItem } from '../entity/orderItem_entity'

createConnection(ormConfig).then(async connection => {
  const orderRepo = getManager().getRepository(Order)
  const orderItemRepo = getManager().getRepository(OrderItem)

  for (let i = 0; i < 30; i++) {
    const order = await orderRepo.save({
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(),
    })

    for (let j = 0; j < randomInt(1, 5); j++) {
      await orderItemRepo.save({
        order,
        product_name: faker.lorem.words(2),
        price: randomInt(10, 100),
        quantity: randomInt(1, 10),
      })
    }
  }

  process.exit(0)
})
