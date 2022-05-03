import { VFC, memo, useEffect, useState } from 'react'
import { AWrapper } from '../components/layouts/AWrapper'
import axios from 'axios'
import { User } from '../models/User'

export const Profile: VFC = memo(() => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const onInfoSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    await axios.put(`api/users/info`, {
      first_name: firstName,
      last_name: lastName,
      email,
    })
  }

  const onPasswordSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    await axios.put(`api/users/password`, {
      password,
      password_confirm: passwordConfirm,
    })
  }

  useEffect(() => {
    const getUser = async () => {
      const { data }: { data: User } = await axios.get('/api/user')
      setFirstName(data.first_name)
      setLastName(data.last_name)
      setEmail(data.email)
    }

    getUser()
  }, [])

  return (
    <AWrapper>
      <h3>Account Information</h3>
      <form onSubmit={onInfoSubmit}>
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
        <button className="btn btn-outline-secondary">Save</button>
      </form>

      <h3 className="mt-4">Change Password</h3>
      <form onSubmit={onPasswordSubmit}>
        <div className="mb-3">
          <label>password</label>
          <input
            type="password"
            className="form-control"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>password confirm</label>
          <input
            type="password"
            className="form-control"
            onChange={e => setPasswordConfirm(e.target.value)}
          />
        </div>
        <button className="btn btn-outline-secondary">Save</button>
      </form>
    </AWrapper>
  )
})
