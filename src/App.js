import {useState} from 'react'
import axios from 'axios'
import Header from './components/Header/Header'
import SearchBar from './components/SearchBar/SearchBar'
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay'
import ErrorMessage from './components/ErrorMessage/ErrorMessage'
import Footer from './components/Footer/Footer'
import './App.css'

const GEOCODING_API_URL = 'http://api.openweathermap.org/geo/1.0/direct'
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = '535f7ab029b8b2e463f8c8b9a08a790e'

const convertToFahrenheit = fahrenheit => ((fahrenheit - 32) * 5) / 9

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState('')

  const handleSearch = async city => {
    try {
      setError('')
      setWeatherData(null)

      console.log(`Searching for city: ${city}`)

      const geoResponse = await axios.get(GEOCODING_API_URL, {
        params: {
          q: city,
          limit: 1,
          appid: API_KEY,
        },
      })

      console.log('Geocoding API response:', geoResponse.data)

      if (geoResponse.data.length === 0) {
        throw new Error('City not found')
      }

      const {lat, lon} = geoResponse.data[0]

      console.log(`Coordinates for ${city}: Latitude=${lat}, Longitude=${lon}`)

      const weatherResponse = await axios.get(WEATHER_API_URL, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'imperial',
        },
      })

      console.log('Weather API response:', weatherResponse.data)

      const weather = {
        location: weatherResponse.data.name,
        temperature: {
          fahrenheit: weatherResponse.data.main.temp,
          celsius: convertToFahrenheit(weatherResponse.data.main.temp),
        },
        dateTime: new Date(weatherResponse.data.dt * 1000).toLocaleString(),
      }

      setWeatherData(weather)
    } catch (err) {
      console.error('Error fetching weather data:', err)
      if (err.response && err.response.status === 404) {
        setError('Error fetching data')
      } else {
        setError('City not found')
      }
      setWeatherData(null)
    }
  }

  return (
    <div className="App">
      <Header />
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {weatherData && <WeatherDisplay data={weatherData} />}
      <Footer />
    </div>
  )
}

export default App
