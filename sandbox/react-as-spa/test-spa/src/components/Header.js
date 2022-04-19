export default function Header(props) {
    return (
        <header className={props.cssClass}>
            <h1 className="title">{props.title}</h1>
            <h2 className="subtitle">{props.subtitle}</h2>
        </header>
    )
}