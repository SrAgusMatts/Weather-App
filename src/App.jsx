import { useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'

function App() {
  const [ciudad, setCiudad] = useState('')
  const [dataClima, setDataClima] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  const buscarClima = async (e) => {
    e.preventDefault()
    if(!ciudad) return;

    setCargando(true)
    setError(null)
    setDataClima(null)

    const API_KEY = 'a10a4a2823aa3f64076d665e6ef3e9dc';

    const query = encodeURIComponent(ciudad);

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric&lang=es`)
      const data = await response.json()

      if (response.ok) {
        setDataClima(data)
      } else {
        setError("Ciudad no encontrada 😔")
      }
      
    } catch (error) {
      console.error(error)
      setError("Error de conexión")
    } finally {
      setCargando(false)
    }
  }

  const getVideoSource = () => {
    if (!dataClima) return 'video-despejado.mp4'; // Video por defecto (ej: soleado)

    const weatherType = dataClima.weather[0].main;

    switch (weatherType) {
      case 'Rain':
      case 'Drizzle':
      case 'Thunderstorm':
        return 'video-lluvia.mp4';
      case 'Snow':
        return 'video-nieve.mp4';
      case 'Clouds':
        return 'video-nublado.mp4';
      default:
        return 'video-despejado.mp4'; // Clear y otros
    }
  }

  const getOverlayClass = () => {
    if (!dataClima) return '';
    const weatherType = dataClima.weather[0].main;
    if(['Rain', 'Drizzle', 'Thunderstorm'].includes(weatherType)) return 'overlay-lluvia';
    if(weatherType === 'Snow') return 'overlay-nieve';
    return ''; // Despejado o nublado no necesitan overlay
  }

  return (
    <div className="app-wrapper">
      
      {/* 1. EL VIDEO DE FONDO */}
      <video 
        className="video-background" 
        key={getVideoSource()} /* IMPORTANTE: El key obliga a React a recargar el video si cambia el clima */
        autoPlay 
        loop 
        muted 
        playsInline 
      >
        <source src={getVideoSource()} type="video/mp4" />
      </video>

      {/* 2. CAPA EXTRA DE ANIMACIÓN (Gotas/Nieve nítidas CSS) */}
      <div className={`weather-overlay ${getOverlayClass()}`}></div>

      {/* 3. TU CONTENIDO ORIGINAL */}
      <div className="container">
        <h1 className="title-container">🌤️ Clima App</h1>
        
        <form onSubmit={buscarClima}>
          <input 
            type="text" 
            placeholder="Ej: Córdoba..."
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>

        {cargando && <p>Cargando datos...</p>}

        {error && <p style={{color: 'red'}}>{error}</p>}

        {dataClima && <WeatherCard data={dataClima} />}
        
      </div>
    </div>
  )
}

export default App