import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import Error from '../../components/Error'

import './Signup.css'

export default function Signup({setPageTitle}) {
    setPageTitle('Welcome')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [thumbnail, setThumbnail] = useState(null)
    const [thumbnailError, setThumbnailError] = useState(null)
    const { signup, isPending, error } = useSignup()

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password, displayName, thumbnail)
    }

    const handleFileChange = (e) => {
        setThumbnail(null)
        let selected = e.target.files[0]

        if (!selected) {
            setThumbnailError('Please select a file')
            return
        }
        if (!selected.type.includes('image')) {
            setThumbnailError('Selected file must be an image')
            return
        }
        if (selected.size > 100000) {
            setThumbnailError('Image file size must be less than 100kb')
            return
        }

        setThumbnailError(null)
        setThumbnail(selected)
    }

    return (
        <form onSubmit={handleSubmit} className="form-signup card">
            <header className="card-header">
                Sign Up
            </header>

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
                    onChange={handleFileChange}
                />
                {thumbnailError && <Error message={thumbnailError}/>}
            </label>
            {!isPending && <button className="btn" type="submit">Sign up</button>}
            {isPending && <button className="btn" disabled type="submit">loading</button>}
            {error && <Error message={error} />}
        </form>
    )
}