import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import HeartToggle from './HeartToggle'
import Avatar from './Avatar'
import PushPin from '../assets/images/drawing-pin.webp'

function Note({ note, toggleHeart}) {
    console.log('note', note);
    return (
        <div data-saved={note.saved}  style={{ backgroundColor: `${note.color ? note.color : ''}` }}  className={`note is-${note.style}`} >
            <header className="note-header">
                { toggleHeart &&
                    <HeartToggle
                        val={note.id}
                        isSet={note.saved}
                        callback={toggleHeart}
                    />
                }

                <img className="note-pin" src={PushPin} alt="Push Pin" />
            </header>

            <Link to={`/notes/${note.id}`}>
                { note.noteImage &&
                    <img className='note-image' src={ note.noteImage.URL} alt={ note.noteImage.name}/>
                }

                <p className='note-message'>{note.message}</p>
            </Link>


            <footer className="note-footer">
                <Avatar src={note.createdBy.photoURL} name={note.createdBy.displayName} />
                <p className='note-author'>from {note.createdBy.displayName}</p>
            </footer>


            {/* <h4>{name}</h4>
            <p>Due by {dueDate.toDate().toDateString()}</p>
            <div className="assigned-to">
                <p><strong>Assigned to:</strong></p>
                <ul className="list-avatars">
                    {assignedUsersList.map(user => (
                        <li key={user.id}>
                            <Avatar src={user.photoURL} />
                        </li>
                    ))}
                </ul>
            </div> */}

        </div>
    )
}

Note.defaultProps = {
    reverse: false,
}

Note.propTypes = {
    id: PropTypes.string,
    saved: PropTypes.bool,
    toggleHeart: PropTypes.func,
    noteImage: PropTypes.object,
    message: PropTypes.string,
    createdBy: PropTypes.string,
    delete: PropTypes.func
}

export default Note