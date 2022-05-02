import { VFC, memo, useState, useEffect } from 'react'
import { AWrapper } from '../../components/layouts/AWrapper'
import axios from 'axios'
import { Role } from '../../models/Role'
import { useNavigate } from 'react-router-dom'

export const UserCreate: VFC = memo(() => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [roleId, setRoleId] = useState('')
  const [roles, setRoles] = useState<Role[]>([])

  const onSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    await axios.post('/api/users', {
      first_name: firstName,
      last_name: lastName,
      email,
      role_id: roleId,
    })

    navigate('/users')
  }

  useEffect(() => {
    const getRoles = async () => {
      const { data } = await axios.get('/api/roles')
      setRoles(data)
    }

    getRoles()
  }, [])

  return (
    <AWrapper>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            className="form-control"
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            className="form-control"
            onChange={e => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select
            className="form-control"
            onChange={e => setRoleId(e.target.value)}
          >
            {roles.map(role => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </AWrapper>
  )
})
