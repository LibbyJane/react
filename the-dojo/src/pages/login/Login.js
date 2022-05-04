// styles
import './Login.css'

import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

import Error from '../../components/Error'

import './Login.css'

export default function Login({setPageTitle}) {
    setPageTitle('Welcome')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isPending, error } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <form onSubmit={handleSubmit} className="form-login card">
            <header className="card-header">
                Log In
            </header>

            <label>email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>
                password:
            </label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            {!isPending && <button type="submit">log in</button>}
            {isPending && <button type="submit" disabled>loading</button>}

            {error && <Error message={error} />}
        </form>
    )
}