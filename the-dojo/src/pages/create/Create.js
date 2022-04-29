import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import Error from '../../components/Error'
import { useAddNote } from '../../hooks/useAddNote'

import './Create.css'

const styles = [
    { value: 'postcard', label: 'Post Card' },
    { value: 'stickynote', label: 'Sticky Note' }
]

export default function Create() {
    const history = useHistory()
    const { user } = useAuthContext()
    const { documents } = useCollection('users')
    const [users, setUsers] = useState([])

    const [noteImage, setNoteImage] = useState(null)
    const [noteImageError, setNoteImageError] = useState(null)

    const [message, setMessage] = useState('')
    const [style, setStyle] = useState('')
    const [recipients, setRecipients] = useState([])
    const [formError, setFormError] = useState(null)
    const { addNote, isPending, error } = useAddNote()

    console.log('user', user)

    // create user values for react-select
    useEffect(() => {
        if (documents) {
            const usersList = documents.map(u => {

                return {
                    value: {
                        displayName: u.displayName,
                        photoURL: u.photoURL,
                        id: u.id
                    },
                    label: u.displayName
                }
            })

            setUsers(usersList)
        }
    }, [documents])

    const handleFileChange = (e) => {
        setNoteImage(null)
        let selected = e.target.files[0]
        console.log(selected)

        if (!selected) {
            setNoteImageError('Please select a file')
            return
        }
        if (!selected.type.includes('image')) {
            setNoteImageError('Selected file must be an image')
            return
        }
        if (selected.size > 100000) {
            setNoteImageError('Image file size must be less than 100kb')
            return
        }

        setNoteImageError(null)
        setNoteImage(selected)
        console.log('image updated')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if (!style) {
            setFormError('Please select a note style.')
            return
        }
        if (recipients.length < 1) {
            setFormError('Please assign the note to at least 1 user')
            return
        }

        const recipientsList = recipients.map(u => {
            return {
                displayName: u.value.displayName,
                photoURL: u.value.photoURL,
                id: u.value.id
            }
        })
        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const note = {
            // name,
            message,
            recipientsList,
            createdBy
        }

        if (style) {
            note.style = style.value;
        }



        await addNote(note, noteImage)


        // if (!response.error) {
        //     history.push('/')
        // }
    }

    // // if using html select
    // const handleAssignUsers = function(field)  {
    //     const selectedValues = [...field.options]
    //         .filter(x => x.selected)
    //         .map(x => x.value);
    //     setRecipients(selectedValues);
    // }

    return (
        <>
            <h1 className="page-title">Create a new note</h1>
            <form onSubmit={handleSubmit}>
                {/* <label>note name:</label>
                <input
                    required
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                /> */}

                <label>Style:</label>
                <Select
                    className='react-select-container'
                    classNamePrefix="react-select"
                    onChange={(option) => setStyle(option)}
                    options={styles}
                >

                </Select>

                <label>write your message</label>
                <textarea
                    required
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                ></textarea>
                {/*
                <label>Set due date:</label>
                <input
                    required
                    type="date"
                    onChange={(e) => setDueDate(e.target.value)}
                    value={dueDate}
                /> */}


                {/* <select
                    onChange={(e) => setStyle(e.target.value)}
                >
                    {styles.map(style => {
                        return <option key={style.value} value={style.value}>{style.label}</option>
                    })}
                </select> */}

                <label>Send to:</label>
                <Select
                    className='react-select-container'
                    classNamePrefix="react-select"
                    onChange={(option) => setRecipients(option)}
                    options={users}
                    isMulti
                />

                {style.value === 'postcard' && (
                    <>
                        <label htmlFor="noteImage">Note image</label>
                        <input
                            name="noteImage"
                            id="noteImage"
                            required
                            type="file"
                            onChange={handleFileChange}
                        />
                        {noteImageError && <Error message={noteImageError} />}
                    </>

                )

                }



                {/* <select
                    multiple
                    onChange={(e) => handleAssignUsers(e.target)}
                >
                    {documents && documents.map(user => {
                        return <option key={user.id} value={user.id}>{user.displayName}</option>
                    })}
                </select> */}

                <button className="btn">Add note</button>

                {formError && <Error message={formError} />}
            </form>
        </>
    )
}