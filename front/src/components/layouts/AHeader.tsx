import { memo, useEffect, VFC, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { User } from '../../models/User'

export const AHeader: VFC = memo(() => {
  const [user, setUser] = useState(new User())
  useEffect(() => {
    const getuser = async () => {
      const { data } = await axios.get('/api/user')
      setUser(new User(data.id, data.first_name, data.last_name, data.email))
    }

    getuser()
  }, [])

  const onLogout = async () => {
    await axios.post('/api/logout', {})
  }

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link to="/" className="navbar-brand col-md-3 col-lg-2 me-0 px-3">
        Admin
      </Link>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <Link to="profile" className="nav-link">
            {user?.name}
          </Link>
        </li>
        <li className="nav-item text-nowrap">
          <Link to="login" className="nav-link" onClick={onLogout}>
            Log out
          </Link>
        </li>
      </ul>
    </header>
  )
})
