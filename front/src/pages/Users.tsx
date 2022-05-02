import { VFC, memo, useEffect, useState } from 'react'
import { AWrapper } from '../components/layouts/AWrapper'
import axios from 'axios'
import { User } from '../models/User'

export const Users: VFC = memo(() => {
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(0)

  const onPrev = () => {
    if (page <= 1) return
    setPage(page - 1)
  }
  const onNext = () => {
    if (page >= lastPage) return
    setPage(page + 1)
  }

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get(`/api/users?page=${page}`)
      const usersTemp: User[] = []
      data.data.forEach((user: User) => {
        usersTemp.push(
          new User(
            user.id,
            user.first_name,
            user.last_name,
            user.email,
            user.role
          )
        )
      })

      setUsers(usersTemp)
      setLastPage(data.meta.last_page)
    }
    getUsers()
  }, [page])

  return (
    <AWrapper>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: User) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role && user.role.name}</td>
                <td>Action todo</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav>
        <ul className="pagination">
          <li className={'page-item' + (page === 1 && ' disabled')}>
            <button className="page-link" onClick={onPrev}>
              Prev
            </button>
          </li>
          <li className={'page-item' + (page >= lastPage && ' disabled')}>
            <button className="page-link" onClick={onNext}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </AWrapper>
  )
})
