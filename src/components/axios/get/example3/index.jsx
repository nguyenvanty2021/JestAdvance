// WeatherForecast.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherForecast = () => {
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(
          'https://api.example.com/weather-forecast',
        )
        setForecast(response.data)
        setLoading(false)
      } catch (error) {
        setError('Error fetching forecast')
        setLoading(false)
      }
    }

    fetchForecast()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h1>Weather Forecast</h1>
      <ul>
        {forecast.map((data, index) => (
          <li key={index}>
            {data.date}: {data.temperature}°C
          </li>
        ))}
      </ul>
    </div>
  )
}

export default WeatherForecast
