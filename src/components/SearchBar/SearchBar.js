import {useState} from 'react'
import './SearchBar.css'

function SearchBar({onSearch}) {
  const [city, setCity] = useState('')
  const [error, setError] = useState('')

  const handleSearchClick = () => {
    if (city.trim() === '') {
      setError('Please Enter a Valid Input')
      return
    }

    onSearch(city)
    setCity('')
    setError('')
  }

  const handleInputChange = e => {
    setCity(e.target.value)
    setError('')
  }

  return (
    <div className="search-bar">
      <h1 className="main-heading">Check Weather Status in your City</h1>
      <div className="input-container">
        <input
          className="input-element"
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter City Name"
        />
        <button
          type="button"
          onClick={handleSearchClick}
          className="search-button"
        >
          Search
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default SearchBar
