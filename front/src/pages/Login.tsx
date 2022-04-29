import axios from 'axios'
import { VFC, memo, useState } from 'react'
import '../assets/styles/login.css'
import { useNavigate } from 'react-router-dom'

export const Login: VFC = memo(() => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    const res = await axios.post('/api/login', {
      email,
      password,
    })
    console.log(res)
    navigate('/')
  }
  return (
    <main className="form-signin">
      <form>
        <h1 className="h3 mb-3 fw-normal">login</h1>
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

        <button
          className="w-100 btn btn-lg btn-primary"
          type="submit"
          onClick={onSubmit}
        >
          login
        </button>
      </form>
    </main>
  )
})
