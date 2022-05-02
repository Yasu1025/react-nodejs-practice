import { VFC, memo, useState, useEffect } from 'react'
import { AWrapper } from '../../components/layouts/AWrapper'
import axios from 'axios'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { ImageUpload } from '../../components/ImageUpload'
import { Product } from '../../models/Product'

export const ProductsEdit: VFC = memo(() => {
  const navigate = useNavigate()
  const productId = useParams().id
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(0)

  const onSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    await axios.put(`/api/products/${productId}`, {
      name,
      description,
      image,
      price,
    })

    navigate('/products')
  }

  useEffect(() => {
    const getProduct = async () => {
      const { data }: { data: Product } = await axios.get(
        `/api/products/${productId}`
      )
      console.log(data)
      setName(data.name)
      setDescription(data.description)
      setImage(data.image)
      setPrice(data.price)
    }

    getProduct()
  }, [])

  return (
    <AWrapper>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            className="form-control"
            defaultValue={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            defaultValue={description}
            onChange={e => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label>Image</label>
          <div className="input-group">
            <input
              className="form-control"
              value={image}
              onChange={e => setImage(e.target.value)}
            />
            <ImageUpload uploaded={setImage} />
          </div>
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={e => setPrice(+e.target.value)}
          />
        </div>

        <div className="btn-group mr-2">
          <button className="btn btn-outline-secondary">Save</button>
          <Link to="/products" className="btn btn-outline-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </AWrapper>
  )
})
