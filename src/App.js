import './App.css';
import Search from './components/Search';
import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import axios from 'axios';
import { useState } from 'react';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    fetchCurrentWeather(searchData.lat, searchData.lon, searchData.label);
    fetchWeatherForecast(searchData.lat, searchData.lon, searchData.label);
  };

  const fetchCurrentWeather = async (lon, lat, city) => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_OPENWEATHER_API_URL}/data/2.5/weather?lon=${lon}&lat=${lat}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`,
      });
      console.log(response);
      setCurrentWeather({ city: city, ...response.data });
    } catch (error) {
      console.error(error);
    }
  };
  const fetchWeatherForecast = async (lon, lat, city) => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_OPENWEATHER_API_URL}/data/2.5/forecast?lon=${lon}&lat=${lat}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`,
      });
      setForecastWeather({ city: city, ...response.data });
    } catch (error) {
      console.error(error);
    }
  };

  console.log(currentWeather);

  return (
    <div className='container'>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecastWeather && <WeatherForecast data={forecastWeather} />}
    </div>
  );
}

export default App;
