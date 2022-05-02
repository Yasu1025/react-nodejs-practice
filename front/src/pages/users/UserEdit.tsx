import { VFC, memo, useState, useEffect } from 'react'
import { AWrapper } from '../../components/layouts/AWrapper'
import axios from 'axios'
import { Role } from '../../models/Role'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { User } from '../../models/User'

export const UserEdit: VFC = memo(() => {
  const navigate = useNavigate()
  const userId = useParams().id
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [roleId, setRoleId] = useState(0)
  const [roles, setRoles] = useState<Role[]>([])

  const onSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    await axios.put(`/api/users/${userId}`, {
      first_name: firstName,
      last_name: lastName,
      email,
      role_id: roleId,
    })

    navigate('/users')
  }

  useEffect(() => {
    const getUser = async () => {
      const { data }: { data: User } = await axios.get(`/api/users/${userId}`)
      setFirstName(data.first_name)
      setLastName(data.last_name)
      setEmail(data.email)
      setRoleId(data.role.id)
    }
    const getRoles = async () => {
      const { data } = await axios.get('/api/roles')
      setRoles(data)
    }

    getUser()
    getRoles()
  }, [])

  return (
    <AWrapper>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            className="form-control"
            defaultValue={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            className="form-control"
            defaultValue={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            defaultValue={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select
            className="form-control"
            value={roleId}
            onChange={e => setRoleId(+e.target.value)}
          >
            {roles.map(role => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div className="btn-group mr-2">
          <button className="btn btn-outline-secondary">Save</button>
          <Link to="/users" className="btn btn-outline-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </AWrapper>
  )
})
