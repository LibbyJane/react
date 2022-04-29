import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { timestamp } from '../../firebase/config'
import Error from '../../components/Error'

import './Create.css'

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
]

export default function Create() {
    const history = useHistory()
    const { addDocument, response } = useFirestore('projects')
    const { user } = useAuthContext()
    const { documents } = useCollection('users')
    const [users, setUsers] = useState([])

    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if (!category) {
            setFormError('Please select a project category.')
            return
        }
        if (assignedUsers.length < 1) {
            setFormError('Please assign the project to at least 1 user')
            return
        }

        const assignedUsersList = assignedUsers.map(u => {
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

        const project = {
            name,
            details,
            category: category.value,
            dueDate: timestamp.fromDate(new Date(dueDate)),
            assignedUsersList,
            createdBy,
            comments: []
        }

        await addDocument(project)

        if (!response.error) {
            history.push('/')
        }
    }

    // // if using html select
    // const handleAssignUsers = function(field)  {
    //     const selectedValues = [...field.options]
    //         .filter(x => x.selected)
    //         .map(x => x.value);
    //     setAssignedUsers(selectedValues);
    // }

    return (
        <>
            <h1 className="page-title">Create a new Project</h1>
            <form onSubmit={handleSubmit}>
                <label>Project name:</label>
                <input
                    required
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />

                <label>Project Details:</label>
                <textarea
                    required
                    onChange={(e) => setDetails(e.target.value)}
                    value={details}
                ></textarea>

                <label>Set due date:</label>
                <input
                    required
                    type="date"
                    onChange={(e) => setDueDate(e.target.value)}
                    value={dueDate}
                />
                <label>Project category:</label>
                <Select
                    className='react-select-container'
                    classNamePrefix="react-select"
                    onChange={(option) => setCategory(option)}
                    options={categories}
                >

                </Select>

                {/* <select
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map(category => {
                        return <option key={category.value} value={category.value}>{category.label}</option>
                    })}
                </select> */}

                <label>Assign to:</label>
                <Select
                    className='react-select-container'
                    classNamePrefix="react-select"
                    onChange={(option) => setAssignedUsers(option)}
                    options={users}
                    isMulti
                />

                {/* <select
                    multiple
                    onChange={(e) => handleAssignUsers(e.target)}
                >
                    {documents && documents.map(user => {
                        return <option key={user.id} value={user.id}>{user.displayName}</option>
                    })}
                </select> */}

                <button className="btn">Add Project</button>

                {formError && <Error message={formError} />}
            </form>
        </>
    )
}