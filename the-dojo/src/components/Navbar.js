import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import Button from './Button'

import './Navbar.css'
import Logo from '../assets/logo.svg'

export default function Navbar( {pageTitle}) {
    const { logout, isPending } = useLogout()
    const { user } = useAuthContext()

    return (
        <nav className="navbar">
            <ul>
                <li className="logo">
                    <Link to="/">
                        <img src={Logo} alt="dojo logo" />
                    </Link>
                    <h1>{pageTitle}</h1>
                </li>

                {!user && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                )}

                {user && (
                    <li>
                        {!isPending && <Button version="white" onClick={logout}>Logout</Button>}
                        {isPending && <Button version="white" disabled="true">Logout</Button>}
                    </li>
                )}
            </ul>
        </nav>
    )
}