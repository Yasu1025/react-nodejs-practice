import { VFC, memo, useState } from 'react'
import { AWrapper } from '../../components/layouts/AWrapper'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { ImageUpload } from '../../components/ImageUpload'

export const ProductsCreate: VFC = memo(() => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(0)

  const onSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    await axios.post('/api/products', {
      name,
      description,
      image,
      price,
    })

    navigate('/products')
  }

  return (
    <AWrapper>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            className="form-control"
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
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
