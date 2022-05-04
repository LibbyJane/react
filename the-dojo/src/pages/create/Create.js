import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import Select from 'react-select'
import {Timestamp } from 'firebase/firestore'

import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useAddNote } from '../../hooks/useAddNote'
import Error from '../../components/Error'

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

    const [expiryDate, setExpiryDate] = useState('')
    const [message, setMessage] = useState('')
    const [style, setStyle] = useState('')
    const [recipients, setRecipients] = useState([])
    const [formError, setFormError] = useState(null)
    const { addNote, isPending, error } = useAddNote()

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
            createdBy,
            expiryDate: Timestamp.fromDate(new Date(expiryDate)),
            style: style ? style.value : null
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

            <label>Expiry date:</label>
            <input
                required
                type="date"
                onChange={(e) => setExpiryDate(e.target.value)}
                value={expiryDate}
            />


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
    )
}