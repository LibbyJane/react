import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar'

import './NoteList.css'

export default function NoteList({ notes }) {
    console.log('notes', notes)
    return (
        <ul className="list-notes">
            {notes.length === 0 && <p>No notes yet!</p>}
            {notes.map(note => (
                <li key={note.id} className="card">
                    <Link to={`/notes/${note.id}`}>
                        <p>{note.message}</p>
                        <Avatar src={note.createdBy.photoURL} />
                        <p>from {note.createdBy.displayName}</p>
                        <img src={note.photoURL} />
                        {/* <h4>{note.name}</h4>
                        <p>Due by {note.dueDate.toDate().toDateString()}</p>
                        <div className="assigned-to">
                            <p><strong>Assigned to:</strong></p>
                            <ul className="avatar-list">
                                {note.assignedUsersList.map(user => (
                                    <li key={user.id}>
                                        <Avatar src={user.photoURL} />
                                    </li>
                                ))}
                            </ul>
                        </div> */}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
