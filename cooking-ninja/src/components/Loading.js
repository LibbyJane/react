import icon from '../assets/loader-icon.svg'
import './Loading.css'

export default function LoadingIcon() {
    return (
      <div className='loader'>
        <img
        src={icon}
        alt="loading"
        className="icon-loading"
        />
      </div>
    )
  }