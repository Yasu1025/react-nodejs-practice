import { createConnection, getManager } from 'typeorm'
import ormConfig from '../config/ormconfig'
import { Product } from '../entity/product_entity'
import faker from '@faker-js/faker'
import { randomInt } from 'crypto'

createConnection(ormConfig).then(async connection => {
  const repository = getManager().getRepository(Product)

  for (let i = 0; i < 30; i++) {
    await repository.save({
      name: faker.lorem.words(2),
      description: faker.lorem.words(20),
      image: faker.image.imageUrl(200, 200, '', true),
      price: randomInt(10, 100),
    })
  }

  process.exit(0)
})
