import { VFC, memo } from 'react'

type PropsType = {
  page: number
  lastPage: number
  pageChanged: (page: number) => void
}

export const Paginator: VFC<PropsType> = memo(
  ({ page, lastPage, pageChanged }) => {
    const onPrev = () => {
      if (page < 1) return
      pageChanged(page - 1)
    }
    const onNext = () => {
      if (page >= lastPage) return
      pageChanged(page + 1)
    }
    return (
      <nav>
        <ul className="pagination">
          <li className={'page-item' + (page <= 1 && ' disabled')}>
            <button className="page-link" onClick={onPrev}>
              Prev
            </button>
          </li>
          <li className={'page-item' + (page >= lastPage && ' disabled')}>
            <button className="page-link" onClick={onNext}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    )
  }
)
