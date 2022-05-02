import { VFC, memo, useState, useEffect } from 'react'
import { AWrapper } from '../../components/layouts/AWrapper'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { Permission } from '../../models/Permission'

export const RoleCreate: VFC = memo(() => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [permIds, setPermIds] = useState<number[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])

  const onPermCheck = (id: number) => {
    if (permIds.some(p => p === id)) {
      setPermIds(permIds.filter(pId => pId !== id))
      return
    }
    setPermIds([...permIds, id])
  }

  const onSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()

    await axios.post('/api/roles', {
      name,
      permissions: permIds,
    })

    navigate('/roles')
  }

  useEffect(() => {
    const getPerms = async () => {
      const { data } = await axios.get('/api/permissions')
      setPermissions(data)
    }

    getPerms()
  }, [])

  return (
    <AWrapper>
      <form onSubmit={onSubmit}>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input
              className="form-control"
              onChange={e => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 mt-3 row">
          <label className="col-sm-2 col-form-label">Permissions</label>
          <div className="col-sm-10">
            {permissions.map(perm => (
              <div key={perm.id} className="form-check form-check-inline col-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={perm.id}
                  onChange={() => onPermCheck(perm.id)}
                />
                <label className="form-check-label">{perm.name}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="btn-group mr-2">
          <button className="btn btn-outline-secondary">Save</button>
          <Link to="/roles" className="btn btn-outline-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </AWrapper>
  )
})
