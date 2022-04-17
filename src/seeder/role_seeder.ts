import { createConnection, getManager } from 'typeorm'
import ormConfig from '../config/ormconfig'
import { Permission } from '../entity/permission_entity'
import { Role } from '../entity/role_entity'

createConnection(ormConfig).then(async connection => {
  const permissionRepo = getManager().getRepository(Permission)
  const perms = [
    'view_users',
    'edit_users',
    'view_roles',
    'edit_roles',
    'view_products',
    'edit_products',
    'view_orders',
    'edit_orders',
  ]

  let permissions = []

  for (let i = 0; i < perms.length; i++) {
    permissions.push(await permissionRepo.save({ name: perms[i] }))
  }

  const roleRepo = getManager().getRepository(Role)

  await roleRepo.save({
    name: 'Admin',
    permissions,
  })

  delete permissions[3]

  await roleRepo.save({
    name: 'Editor',
    permissions,
  })

  delete permissions[1]
  delete permissions[5]
  delete permissions[7]

  await roleRepo.save({
    name: 'Viwers',
    permissions,
  })

  process.exit(0)
})
