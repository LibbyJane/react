import { useTheme } from '../hooks/useTheme'
import modeIcon from '../assets/mode-icon.svg'

import './ThemeSelector.css'

const themeColors = ['red', 'green', 'blue']

export default function ThemeSelector() {
  const { changeColor, changeMode, mode } = useTheme()

  const toggleMode = () => {
    changeMode(mode === 'dark' ? 'light' : 'dark')
  }

  return (
    <aside className="theme-selector">
      <button className="mode-toggle"  type="button" onClick={toggleMode}>
        <img
          src={modeIcon}
          alt="dark/light toggle icon"
        />
      </button>

      <div className="theme-buttons">
        {themeColors.map(color => (
          <button
            key={color}
            onClick={() => changeColor(color)}
            className={`is-${color}`}
            type="button"
          />
        ))}
      </div>
    </aside>
  )
}