import axios from 'axios'
import { VFC, memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../assets/styles/login.css'

export const Register: VFC = memo(() => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const onSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const res = await axios.post('/api/register', {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      password_confirm: passwordConfirm,
    })
    console.log(res)
    navigate('/')
  }

  return (
    <main className="form-signin">
      <form>
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>
        <input
          className="form-control"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
        />
        <input
          className="form-control"
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password Confirm"
          value={passwordConfirm}
          onChange={e => setPasswordConfirm(e.target.value)}
          required
        />

        <button
          className="w-100 btn btn-lg btn-primary"
          type="submit"
          onClick={onSubmit}
        >
          Submit
        </button>
      </form>
    </main>
  )
})
