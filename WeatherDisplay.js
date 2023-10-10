import React from 'react';

function WeatherDisplay({ weatherData }) {
  if (!weatherData) {
    return null;
  }

  const { name, main, weather } = weatherData;
  const temperature = main.temp;
  const condition = weather[0].description;

  return (
    <div
      className="weather-display"
      style={{
        margin: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f5f5f5',
      }}
    >
      <h2 style={{ fontSize: '24px' }}>Weather in {name}</h2>
      <p style={{ fontSize: '16px' }}>Temperature: {temperature}°C</p>
      <p style={{ fontSize: '16px' }}>Condition: {condition}</p>
    </div>
  );
}

export default WeatherDisplay;
