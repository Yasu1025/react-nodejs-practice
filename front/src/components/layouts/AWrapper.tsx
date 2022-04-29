import { memo, ReactNode, VFC } from 'react'
import { AHeader } from './AHeader'
import { AMenu } from './AMenu'

type PropsType = {
  children: ReactNode
}

export const AWrapper: VFC<PropsType> = memo(({ children }) => {
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
