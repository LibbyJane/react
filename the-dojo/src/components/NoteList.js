import { Link } from 'react-router-dom'
import { useFirestore } from "../hooks/useFirestore"
import Avatar from '../components/Avatar'
import HeartToggle from '../components/HeartToggle'

import './NoteList.css'

export default function NoteList({ notes }) {
    const { updateDocument } = useFirestore('notes')

    const toggleHeart = async (id) => {
        notes.find((n, index) => {
            if (n.id === id) {
                const newVal = notes[index].saved ? !notes[index].saved : true
                updateDocument(id, {
                    saved: newVal
                })
                return true; // stop searching
            } else {
                return false
            }
        });
    }

    return (
        <ul className="list-notes">
            {notes.length === 0 &&
                <li className="card">
                    <h4>Welcome</h4>
                    <p>Looks like you don&rsquo;t have any notes at the moment. Would you like to <Link to='/create'>send one?</Link></p>
                </li>
            }
            {notes.map(note => (
                <li key={note.id} className={`note is-${note.style}`} data-saved={note.saved}>
                    <header className="note-header">
                        <HeartToggle
                                val={note.id}
                                isSet={note.saved}
                                callback={toggleHeart}
                        />
                    </header>

                    <Link to={`/notes/${note.id}`}>
                        { note.noteImage  &&
                            <img className='note-image' src={ note.noteImage.URL} alt={ note.noteImage.name}/>
                        }

                        <p className='note-message'>{note.message}</p>
                    </Link>


                    <footer className="note-footer">
                        <Avatar src={note.createdBy.photoURL} name={note.createdBy.displayName} />
                        <p className='note-author'>from {note.createdBy.displayName}</p>
                    </footer>


                    {/* <h4>{note.name}</h4>
                    <p>Due by {note.dueDate.toDate().toDateString()}</p>
                    <div className="assigned-to">
                        <p><strong>Assigned to:</strong></p>
                        <ul className="list-avatars">
                            {note.assignedUsersList.map(user => (
                                <li key={user.id}>
                                    <Avatar src={user.photoURL} />
                                </li>
                            ))}
                        </ul>
                    </div> */}

                </li>
            ))}
        </ul>
    )
}
