import { memo, ReactNode, VFC, useEffect } from 'react'
import { AHeader } from './AHeader'
import { AMenu } from './AMenu'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

type PropsType = {
  children: ReactNode
}

export const AWrapper: VFC<PropsType> = memo(({ children }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const getuser = async () => {
      try {
        await axios.get('/api/user')
      } catch (e) {
        navigate('/login')
      }
    }
    getuser()
  }, [])

  return (
    <>
      <AHeader />
      <div className="container-fluid">
        <div className="row">
          <AMenu />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {children}
          </main>
        </div>
      </div>
    </>
  )
})
