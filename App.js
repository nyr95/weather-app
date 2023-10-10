import React, { useState, useEffect } from 'react';
import WeatherDisplay from './WeatherDisplay';
import axios from 'axios';

function App() {
  const [location, setLocation] = useState({ lat: '', lon: '' });
  const [weatherData, setWeatherData] = useState(null);
  const [searchLocation, setSearchLocation] = useState('');

  useEffect(() => {
    // Fetch weather data for the user's current location when the component mounts
    fetchCurrentLocationWeather();
  }, []);

  const fetchCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.error(error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const getWeatherData = async () => {
    try {
      const response = await axios.get(`/weather?lat=${location.lat}&lon=${location.lon}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchWeatherData = async () => {
    try {
      const response = await axios.get(`/weather?q=${searchLocation}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app" style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>Weather App</h1>
      <div className="input-form" style={{ margin: '20px' }}>
        <label style={{ marginRight: '10px' }}>Latitude:</label>
        <input
          type="text"
          value={location.lat}
          onChange={(e) => setLocation({ ...location, lat: e.target.value })}
          style={{ padding: '5px' }}
        />
        <label style={{ marginLeft: '10px', marginRight: '10px' }}>Longitude:</label>
        <input
          type="text"
          value={location.lon}
          onChange={(e) => setLocation({ ...location, lon: e.target.value })}
          style={{ padding: '5px' }}
        />
        <button
          onClick={getWeatherData}
          style={{
            padding: '5px 10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Get Weather
        </button>
      </div>
      <div className="search-form" style={{ margin: '20px' }}>
        <label style={{ marginRight: '10px' }}>Search Location:</label>
        <input
          type="text"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          style={{ padding: '5px' }}
        />
        <button
          onClick={searchWeatherData}
          style={{
            padding: '5px 10px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Search Weather
        </button>
      </div>
      <button
        onClick={fetchCurrentLocationWeather}
        style={{
          padding: '5px 10px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Use Current Location
      </button>
      <WeatherDisplay weatherData={weatherData} />
    </div>
  );
}

export default App;

