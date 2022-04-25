import './App.css'
import Routes from './Routes.js'
import ThemeSelector from './components/ThemeSelector';
import { useTheme } from './hooks/useTheme'

function App() {
  const { mode, color } = useTheme()

  return (
    <main className={`App mode-${mode} theme-${color}`}>
      <ThemeSelector />
      <Routes />
    </main>
  );
}

export default App
