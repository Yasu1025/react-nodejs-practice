import { VFC, memo } from 'react'
import axios from 'axios'

type PropsType = {
  uploaded: (url: string) => void
}

export const ImageUpload: VFC<PropsType> = memo(({ uploaded }) => {
  const upload = async (files: FileList | null) => {
    if (!files) return
    const formData = new FormData()
    formData.append('image', files[0])
    const { data } = await axios.post('/api/upload', formData)
    uploaded(data.url)
  }

  return (
    <label className="btn btn-primary">
      Upload Image{' '}
      <input type="file" onChange={e => upload(e.target.files)} hidden />
    </label>
  )
})
