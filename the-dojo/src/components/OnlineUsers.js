import { useCollection } from '../hooks/useCollection'
import { projectAuth} from '../firebase/config'

import Avatar from "./Avatar"
import Error from "./Error"

import './OnlineUsers.css'

export default function OnlineUsers() {
    const { documents, error } = useCollection('users')
    const { uid } = projectAuth.currentUser

    return (
        <aside className="user-list">
            {documents && (
                <ul className="user-list-items">
                    {documents.map(user => {
                        if ((user.id !== uid))  {
                            return <li key={user.id} className="user-list-item" data-online={user.online}>
                                <span className="ul-status"></span>
                                <span className="ul-name">{user.displayName}</span>
                                <Avatar src={user.photoURL} name={user.photoURL} />
                            </li>
                        }
                        else {
                            return null
                        }
                    })}
                </ul>
            )}
            {error && (
                <Error message={error} />
            )}
        </aside>
    )
}
