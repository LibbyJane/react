import './Avatar.css'

export default function Avatar({ src }) {
    return (
        <div className="avatar" style={{ backgroundImage: `url(${src})` }}>
            <img src={src} alt="user avatar" />
        </div>
    )
}