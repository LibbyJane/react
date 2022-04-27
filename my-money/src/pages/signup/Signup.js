import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSignup } from '../../hooks/useSignup'
import { useAuthContext } from "../../hooks/useAuthContext"

import Error from '../../components/Error'

import styles from './Signup.module.css'

export default function Signup() {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, isPending, error } = useSignup()
    const history = useHistory()
    const { user } = useAuthContext()

    const handleSubmit = (e) => {
        e.preventDefault()
        signup(email, password, displayName)
    }

    useEffect(() => {
        if (user) {
            history.push('/')
        }
    }, [user, history])

    return (
        <form onSubmit={handleSubmit} className={styles['signup-form']}>
            <h2>sign up</h2>

            <label>display name:</label>
            <input
                type="text"
                onChange={(e) => setDisplayName(e.target.value)}
                value={displayName}
            />

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
            {!isPending && <button type="submit">sign up</button>}
            {isPending && <button type="submit" disabled>loading</button>}
            {error && <Error message={error} />}
        </form>
    )
}