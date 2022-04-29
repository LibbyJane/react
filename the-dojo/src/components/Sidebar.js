import { NavLink } from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext'
import OnlineUsers from '../components/OnlineUsers'

import Avatar from "./Avatar"

import "./Sidebar.css"
import DashboardIcon from '../assets/icons/dashboard.svg'
import AddIcon from '../assets/icons/add.svg'

export default function Sidebar() {
    const { user } = useAuthContext()

    return (
        <aside className="sidebar">
            <div className="sb-content">
                {user && <div className="sb-user">
                    {user.photoURL && <Avatar src={user.photoURL} />}
                    <p>Hey {user.displayName}</p>
                </div>}
                <nav className="sb-links">
                    <ul>
                        <li>
                            <NavLink exact to="/">
                                <img src={DashboardIcon} alt="dashboard icon" />
                                <span>Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/create">
                                <img src={AddIcon} alt="add project icon" />
                                <span>New Project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <OnlineUsers />
            </div>
        </aside>
    )
}
