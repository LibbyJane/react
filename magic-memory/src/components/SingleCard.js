import './SingleCard.css'

export default function SingleCard({card, handleChoice, flipped, disabled}) {
    let cssClass = card.matched ? `card is-matched` : `card`
    if (flipped) {
        cssClass += ' is-flipped'
    }
    const handleClick = (e)=> {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <li className={cssClass} disabled={disabled}>
            <img className="card-front" src={card.src} alt="card front" />
            <img
                className="card-back"
                src="/img/cover.png"
                alt="card back"
                onClick={handleClick}
                // onClick={() => handleChoice(card)}
            />
        </li>
    )
}