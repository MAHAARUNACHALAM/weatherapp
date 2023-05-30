import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

const App = () => {
  const apiKey = '24034b357fbbed95a577df3566ce4210';
  const cities = ['chennai', 'trichy', 'pune', 'mumbai', 'delhi', 'kolkata', 'bangalore', 'hyderabad', 'coimbatore', 'madurai'];
  // const [latitude, setLatitude] = useState('');
  // const [longitude, setLongitude] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [temperature, setTemperature] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState(logo);
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (selectedCity) {
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`);
          const data = await response.json();
          const temperature = data.main.temp;
          const description = data.weather[0].description;
          const icon = data.weather[0].icon;
          setTemperature(temperature);
          setDescription(description);
          setIcon(icon);
        } catch (error) {
          console.log('An error occurred:', error);
        }
      }
    };

    fetchWeatherData();
  }, [selectedCity]);

  useEffect(() => {
    const fetchForecastData = async () => {
      if (selectedCity) {
        try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&appid=${apiKey}&units=metric`);
          const data = await response.json();
          const filteredForecasts = data.list.filter((item, index) => index % 8 === 0);
          setForecasts(filteredForecasts);
        } catch (error) {
          console.log('An error occurred:', error);
        }
      }
    };

    fetchForecastData();
  }, [selectedCity]);

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <select className="city-select" id="city-select" onChange={handleCityChange}>
        <option value="">Select a city</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
     { (selectedCity)?(
      <><div className="weather-info">
          <img className="weather-icon" src={`http://openweathermap.org/img/w/${icon}.png`} alt="Weather Icon" />
          <div className="temperature">{temperature}°C</div>
          <div className="description">{description}</div>
          <div className="location">{selectedCity}</div>
        </div><div className="forecast-container">
            {forecasts.map((forecast) => (
              <div key={forecast.dt} className="forecast-card">
                <div className="forecast-day">{formatDate(forecast.dt)}</div>
                <img className="forecast-icon" src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`} alt="Forecast Icon" />
                <div className="forecast-temp">{forecast.main.temp}°C</div>
              </div>
            ))}
          </div></>):(<div></div>)}
    </div>
  );
};


export default App;
