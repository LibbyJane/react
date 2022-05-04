import { useState } from 'react'
import './FilterList.css'

export default function FilterList({filters, changeFilter}) {
    const [currentFilter, setCurrentFilter] = useState('all')

    const handleClick = (newFilter) => {
        setCurrentFilter(newFilter)
        changeFilter(newFilter)
    }

    return (
        <aside className="filter-bar">
            {/* {filterList.map((f) => (
                <button key={f}
                    onClick={() => handleClick(f)}
                    className={currentFilter === f ? 'active' : ''}
                >{f}</button>
            ))} */}

            <ul class="list-filters">
                {filters.map((f) => (
                    <li>
                        <label key={f}>
                            <input
                                type="radio"
                                name="filterBy"
                                value={f}
                                onChange={(e) => handleClick(e.target.value)}
                            />
                            {f}
                        </label>
                    </li>
                ))}
            </ul>


        </aside>
    )
}
