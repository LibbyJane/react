import { Link } from 'react-router-dom'
import { NavLink } from "react-router-dom"
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import Button from '../Button'
import Avatar from "../Avatar"

import './SiteHeader.scss'
import Logo from'../../assets/icons/mail-opened.svg'
import CreateIcon from '../../assets/icons/mail-opened-filled.svg'
import LogoutIcon from '../../assets/icons/log-out.svg'

export default function SiteHeader({ pageTitle }) {
    const { logout, isPending } = useLogout()
    const { user } = useAuthContext()

    return (
        <header className='site-header'>
            <div className='content'>
                <Link className="site-logo" to="/">
                    <img src={Logo} alt="logo" />
                </Link>

                <h1 className="page-title">{pageTitle}</h1>
            </div>

            {user && (
                <div className="site-user">
                    {user.photoURL && <Avatar src={user.photoURL} />}
                    <p>Hey {user.displayName}</p>
                    <nav className="user-nav">
                        <ul>
                            <li>
                                <NavLink to="/create">
                                    <img className="icon is-create" src={CreateIcon} alt="create a note icon" />
                                    <span className="visually-hidden">Create a note</span>
                                </NavLink>
                            </li>
                            <li>
                                <Button variant="text" onClick={logout}>
                                    <img className="icon is-logout" src={LogoutIcon} alt="logout icon" />
                                    <span className="visually-hidden">Log out</span>
                                </Button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
            {!user && (
                <nav className="site-nav">
                    <ul>
                        <>
                            <li><NavLink to="/login">Login</NavLink></li>
                            <li><NavLink to="/signup">Signup</NavLink></li>
                        </>
                    </ul>
                </nav>
            )}
        </header>
    )
}