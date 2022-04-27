import { useState, useEffect } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

export default function TransactionForm({ uid }) {
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const { addDocument, response } = useFirestore('transactions') // if the collection doesn't already exist, it will be created

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('submitted')
        addDocument({
            uid,
            name,
            amount,
        })
    }

    // reset the form fields
    useEffect(() => {
        console.log('ue response', response)
        if (response.success) {
            setName('')
            setAmount('')
        }
    }, [response.success])

    return (
        <>
            <h3>Add a Transation</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="transactionName" >Transaction name:</label>
                <input
                    id="transactionName"
                    name="transactionName"
                    type="text"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />

                <label htmlFor="transactionAmount" >Amount (£):</label>
                <input
                    type="number"
                    required
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                    min="0"
                />
                {name && amount && <button type="submit">Add Transaction</button>}
                {(!name || !amount) && <button type="submit" disabled>Add Transaction</button>}
            </form>
        </>
    )
}
