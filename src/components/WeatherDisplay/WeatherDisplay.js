import './WeatherDisplay.css'

function WeatherDisplay({data}) {
  return (
    <div className="weather-display-container">
      <h2 className="sub-headings">Current Location: {data.location}</h2>
      <p className="sub-headings">
        Temperature: {data.temperature.celsius.toFixed(1)}°C /{' '}
        {data.temperature.fahrenheit}°F
      </p>
      <p className="sub-headings">Date and Time: {data.dateTime}</p>
    </div>
  )
}

export default WeatherDisplay
