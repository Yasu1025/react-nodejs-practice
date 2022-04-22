import { createConnection, getManager } from 'typeorm'
import ormConfig from '../config/ormconfig'
import { Product } from '../entity/product_entity'
import faker from '@faker-js/faker'
import { randomInt } from 'crypto'

createConnection({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'tarako22122',
  database: 'node_admin',
  entities: ['src/entity/*.ts'],
  logging: false,
  synchronize: true,
}).then(async connection => {
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
