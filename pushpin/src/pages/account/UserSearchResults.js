import { useState, useEffect } from 'react'
import { projectAuth } from '../../firebase/config'
import { useCollection } from '../../hooks/useCollection'
import { useDocument } from '../../hooks/useDocument'

import { useFirestore } from "../../hooks/useFirestore"

import Avatar from "../../components/Avatar"
import Error from "../../components/Error"

export default function UserSearchResults({ query }) {
    const { uid } = projectAuth.currentUser

    const { documents, error } = useCollection('users', query)
    const [id, setId] = useState(null)
    const { updateDocument } = useFirestore('invitations')
    const { document } = useDocument('invitations', 'pending')

    const addFriend = async (id) => {
        setId(id)
        let updatedInvitations = {};
        updatedInvitations[id] = document[id] ? document[id] : [];
        updatedInvitations[id].push(uid)
        await updateDocument('pending', updatedInvitations)
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
