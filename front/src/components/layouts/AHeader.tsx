import { memo, useEffect, VFC, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { User } from '../../types/User'

export const AHeader: VFC = memo(() => {
  const [user, setUser] = useState<User | null>(null)
  useEffect(() => {
    const getuser = async () => {
      const { data } = await axios.get('/api/user')
      setUser(data)
    }

    getuser()
  }, [])
  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <Link to="/" className="navbar-brand col-md-3 col-lg-2 me-0 px-3">
        Admin
      </Link>
      <ul className="navbar-nav px-3">
        <li className="nav-item text-nowrap">
          <a className="nav-link">{`${user?.first_name} ${user?.last_name}`}</a>
        </li>
        <li className="nav-item text-nowrap">
          <a className="nav-link">Log out</a>
        </li>
      </ul>
    </header>
  )
})
