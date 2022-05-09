// styles
import './Login.css'

import { useState, useEffect } from 'react'
import { useLogin } from '../../hooks/useLogin'

import Button from '../../components/Button'
import Error from '../../components/Error'

import './Login.css'

export default function Login({setPageTitle}) {
    useEffect(() => {
        setPageTitle('Log In')
    })

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

            {!isPending && <Button type="submit">log in</Button>}
            {isPending && <Button type="submit" isDisabled={true}>loading</Button>}

            {error && <Error message={error} />}
        </form>
    )
}