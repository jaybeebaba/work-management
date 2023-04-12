import { useState } from 'react'

// styles
import './Signup.css'
import { useSignup } from '../../hooks/useSignup'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)

  const {signup, error, isPending} = useSignup()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, thumbnail)
  }

  const handleThumbnailChange = (e) =>{
    setThumbnail(null)
    const selected = e.target.files[0]
    if(!selected){
      setThumbnailError("Please select a file")
      return
    }
    if(!selected.type.includes("image")){
      setThumbnailError("Selected file must be an image")
      return
    }
    if(selected.size > 10000){
      setThumbnailError("Selected file size must be less than 100kb")
      return 
    }
    setThumbnailError(null)
    setThumbnail(selected)
    

  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>sign up</h2>
      <label>
        <span>email:</span>
        <input
          required 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          required
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          required
          type="text" 
          onChange={(e) => setDisplayName(e.target.value)} 
          value={displayName}
        />
      </label>
      <label>
        <span>Profile thumbnail:</span>
        <input 
          required
          type="file" 
          onChange = {handleThumbnailChange}
        />
      {thumbnailError && <p className='error'>{thumbnailError}</p>}
      </label>
      {error && <p className='error'>{error}</p>}
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && <button className="btn" disabled>Loading</button>}
    </form>
  )
}