import { projectAuth } from '../firebase/config'
import { useCollection } from '../hooks/useCollection'

import Avatar from "./Avatar"
import Error from "./Error"

export default function UserList({ query }) {
    const { uid } = projectAuth.currentUser

    const { documents, error } = useCollection(
        'users',
        query
    )

    const addFriend = (user) => {
        console.log('add friend', user)

    }

    return (
        <aside className="user-list">
            {documents && (
                <ul className="user-list-items">
                    {documents.map(user => {
                        if ((user.id !== uid)) {
                            return <li key={user.id} className="user-list-item">
                                <button type="button" onClick={(e) => addFriend(user.id)}>
                                    <span className="ul-name">{user.displayName}</span>
                                    <Avatar src={user.photoURL} name={user.photoURL} />
                                </button>
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
