import React from 'react'

function WeatherCard({ data }) {
  if (!data) return null;

  // Lógica para elegir Emojis según el estado del clima (data.weather[0].main)
  const getEmoji = (weatherMain) => {
    switch (weatherMain) {
      case 'Clear': return '☀️';
      case 'Clouds': return '☁️';
      case 'Rain': return '🌧️';
      case 'Snow': return '❄️';
      case 'Drizzle': return '🌦️';
      case 'Thunderstorm': return '⚡';
      default: return '🌈'; // Por defecto
    }
  };

  const emoji = getEmoji(data.weather[0].main);

  return (
    <div className="card-clima">
      <h2>{data.name}, {data.sys.country}</h2>
      <div className="temp">
        {Math.round(data.main.temp)}°C
      </div>
      <p>Sensación térmica: {Math.round(data.main.feels_like)}°C</p>
      
      <p className="desc">
         {data.weather[0].description}
      </p>

      {/* PLAN B: Usamos el Emoji gigante en vez de la imagen rota */}
      <div style={{ fontSize: '100px', margin: '20px 0' }}>
        {emoji}
      </div>
    </div>
  )
}

export default WeatherCard