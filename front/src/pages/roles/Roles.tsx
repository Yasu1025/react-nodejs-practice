import { VFC, memo, useEffect, useState } from 'react'
import { AWrapper } from '../../components/layouts/AWrapper'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Role } from '../../models/Role'

export const Roles: VFC = memo(() => {
  const [roles, setRoles] = useState<Role[]>([])

  const onDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await axios.delete(`/api/roles/${id}`)
      setRoles(roles.filter((r: Role) => r.id !== id))
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get(`/api/roles`)

      setRoles(data)
    }
    getUsers()
  }, [])

  return (
    <AWrapper>
      <div className="table-responsive">
        <div className="pt-3 pd-2 mb-3 border-bottom">
          <Link
            to="/roles/create"
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role: Role) => (
              <tr key={role.id}>
                <td>{role.id}</td>
                <td>{role.name}</td>
                <td>
                  <div className="btn-group mr-2">
                    <Link
                      to={`/roles/${role.id}`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(role.id)}
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
    </AWrapper>
  )
})
