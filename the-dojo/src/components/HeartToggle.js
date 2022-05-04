
import HeartOutlineIcon from '../assets/icons/heart-outline.svg'
import HeartIcon from '../assets/icons/heart.svg'
import './HeartToggle.css'

export default function HeartToggle({ val, isSet, callback }) {
    console.log('isSet?', isSet, val);
    return (
        <label className="checkable is-toggle">
            <input
                type="checkbox"
                value={val}
                checked={isSet ? 'checked' : ''}
                onChange={(e) => callback(e.target.value)}
            />
            {isSet && <img className='icon-heart' src={HeartIcon} alt="saved note" />}
            {!isSet && <img className='icon-heart-outlined' src={HeartOutlineIcon} alt="click to save note" />}
            <span className="visually-hidden">Save this note</span>
        </label>
    )
}