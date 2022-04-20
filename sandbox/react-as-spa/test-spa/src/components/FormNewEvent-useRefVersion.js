import { useRef } from 'react';
import './FormNewEvent.css'


export default function FormNewEvent({addEvent}) {
  // const [title, setTitle] = new useState('Test')
  // const [date, setDate] = new useState('')

  const title = useRef()
  const date = useRef()

  const resetForm = () => {
    title.current.value = ''
    date.current.value = ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const event = {
      title: title.current.value,
      date: date.current.value,
      id: Math.floor(new Date())
    }
    addEvent(event)
    resetForm()
  }

  return (
    <form className="form-new-event" onSubmit={handleSubmit}>
      <ul className="form-fields">
        <li>
          <label htmlFor="fne-title">Event Title</label>
          <input
            id="fne-title"
            name="fne-title"
            type="text"
            ref={title}
          />
        </li>
        <li>
          <label htmlFor="fne-date">Event Date</label>
          <input
            id="fne-date"
            name="fne-date"
            type="date"
            ref={date}
          />
        </li>
        <li>
          <label></label>
          <button>Submit</button>
          <button
            type="reset"
            onClick={resetForm}
          >Reset</button>
        </li>
      </ul>
      <p>
      {date && date.current && date.current.value && (
          <> on {date.current.value}</>
        )}
      </p>
    </form>
  )
}
