import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { useLogin } from '../../hooks/useLogin'
import { useAuthContext } from "../../hooks/useAuthContext"

import Error from '../../components/Error'

import styles from './Login.module.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isPending, error } = useLogin()
    const history = useHistory()
    const { user } = useAuthContext()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    useEffect(() => {
        if (user) {
            history.push('/')
        }
    }, [user, history])

    return (
        <form onSubmit={handleSubmit} className={styles['login-form']}>
            <h2>login</h2>

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
            {!isPending && <button type="submit">Login</button>}
            {isPending && <button type="submit" disabled>loading</button>}
            {error && <Error message={error} />}
        </form>
    )
}