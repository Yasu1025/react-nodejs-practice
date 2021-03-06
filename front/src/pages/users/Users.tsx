import { VFC, memo, useEffect, useState } from 'react'
import { AWrapper } from '../../components/layouts/AWrapper'
import axios from 'axios'
import { User } from '../../models/User'
import { Link } from 'react-router-dom'
import { Paginator } from '../../components/Paginator'

export const Users: VFC = memo(() => {
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(0)

  const onDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await axios.delete(`/api/users/${id}`)
      setUsers(users.filter((u: User) => u.id !== id))
    }
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
        <div className="pt-3 pd-2 mb-3 border-bottom">
          <Link
            to="/users/create"
            className="btn btn-sm btn-outline-secondary mb-3"
          >
            Add
          </Link>
        </div>
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
                <td>
                  <div className="btn-group mr-2">
                    <Link
                      to={`/users/${user.id}`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(user.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
    </AWrapper>
  )
})
