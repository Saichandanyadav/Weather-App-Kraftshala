import {useState, useEffect} from 'react'
import './Header.css'

function Header() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
      document.body.style.backgroundImage =
        "url('https://wallpaperaccess.com/full/1363028.jpg')"
    } else {
      document.body.classList.remove('dark-mode')
      document.body.style.backgroundImage =
        "url('https://wallpaperaccess.com/full/1442485.png')"
    }
  }, [darkMode])

  return (
    <div className="header-bg-container">
      <h1 className="main-heading">
        Weather App{' '}
        <span>
          <img
            src="https://bit.ly/4c6QgNu"
            className="weather-icon"
            alt="weather icon"
          />
        </span>
      </h1>
      <button
        className="dark-mode-toggle"
        type="button"
        onClick={toggleDarkMode}
      >
        <img
          src={
            darkMode
              ? 'https://tse3.mm.bing.net/th?id=OIP.hRYssjFTiDipc3gNYYB2cwHaHa&pid=Api&P=0&h=180'
              : 'https://tse2.mm.bing.net/th?id=OIP.L7XNpNZplEbxOQLgjvv-jAHaHa&pid=Api&P=0&h=180'
          }
          alt={darkMode ? 'Light Mode Icon' : 'Dark Mode Icon'}
          className="mode-icon"
        />
      </button>
    </div>
  )
}

export default Header
