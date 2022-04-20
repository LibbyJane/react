import './App.css'
import React, {useState} from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import EventList from './components/EventList'
import FormNewEvent from './components/FormNewEvent'

function App() {
  const [showModal, setShowModal] = useState(true)
  const [showEvents, setShowEvents] = useState(true)
  const [events, setEvents] = useState([])

  const addEvent = (event)=> {
    setShowModal(false)

    setEvents((prevEvents)=> {
      return [...prevEvents, event]
    })
  }

  const handleCloseModal = ()=> {
    setShowModal(false)
  }

  const handleDeleteEvent = (id)=> {
    setEvents((prevEvents)=> {
      return prevEvents.filter((event)=> {
        return event.id !== id;
      })
    })
  }

  const subtitle = "Page Subtitle Text"

  return (
    <div className="App">
      <Header cssClass="site-header" title="Page Title Text" subtitle={subtitle} />

      <button onClick={()=>setShowModal(true)}>Add event</button>

      {
        showEvents && (
          <button type="button" onClick={()=>setShowEvents(false)}>hide events</button>
        )
      }
      {
        !showEvents && (
          <button type="button" onClick={()=>setShowEvents(true)}>show events</button>
        )
      }
      {
        showEvents && <EventList events={events} handleDeleteEvent={handleDeleteEvent} />
      }
      {
        showModal && (
          <Modal
            title="Modal Title"
            handleCloseModal={handleCloseModal}
          >
            <FormNewEvent addEvent={addEvent} />
          </Modal>
        )
      }
    </div>
  )
}

export default App;
