import { VFC, memo, useEffect, useState } from 'react'
import { AWrapper } from '../../components/layouts/AWrapper'
import axios from 'axios'
import { User } from '../../models/User'
import { Link } from 'react-router-dom'
import { Product } from '../../models/Product'
import { Paginator } from '../../components/Paginator'

export const Products: VFC = memo(() => {
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(0)

  const onDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      await axios.delete(`/api/products/${id}`)
      setProducts(products.filter((p: Product) => p.id !== id))
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.get(`/api/products?page=${page}`)
      const productsTemp: Product[] = []
      data.data.forEach((product: Product) => {
        productsTemp.push(
          new Product(
            product.id,
            product.name,
            product.description,
            product.image,
            product.price
          )
        )
      })

      setProducts(productsTemp)
      setLastPage(data.meta.last_page)
    }
    getUsers()
  }, [page])

  return (
    <AWrapper>
      <div className="table-responsive">
        <div className="pt-3 pd-2 mb-3 border-bottom">
          <Link
            to="/users/create"
            className="btn btn-sm btn-outline-secondary mb-3"
          >
            Add
          </Link>
        </div>
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>
                  <img src={product.image} width="50" alt={product.name} />
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <div className="btn-group mr-2">
                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
    </AWrapper>
  )
})
