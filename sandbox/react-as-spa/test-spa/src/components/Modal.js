
import ReactDOM from 'react-dom'
import './Modal.css'

export default function Modal({title, children, handleCloseModal}) {
    return ReactDOM.createPortal((
        <div className="modal-backdrop">
            <aside className="modal">
                <header className="modal-header">
                    <h4>{title}</h4>
                    <button className="modal-close" type="button" onClick={() => handleCloseModal()}>x</button>
                </header>
                <div className="modal-content">
                    {children}
                </div>
            </aside>
        </div>
        ), document.body)
}
