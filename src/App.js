import React, { useState, useEffect } from 'react';
import './App.css';

const WEATHER_API_KEY = 'ab5e3d7c3bfb192593da5271a5352b30';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather'; // ?q={city name}&appid={API key}
const UNSPLASH_API_KEY = 'tGIlMnUbf3I9PWrm0J92C_fQiDV5yl3Fbpk8-hqB9UE';
// const UNSPLASH_API_SECRET = 'bPUMr_g76OabZTg0AejmCIT87egjZQBedYgv7D3Zy9E';
const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos?query=$'

const App = () => {

  const [ weather, setWeather ] = useState({});
  const [ locations, setLocations ] = useState("Kiev");
  const [ photos, setPhotos ] = useState([]);

  useEffect(() => ifClicked(), []);

  const ifClicked = () => {
    fetch(`${WEATHER_API_URL}?q=${locations}&appid=${WEATHER_API_KEY}&units=metric`)
    .then(response => {
      if (response.ok) {
        console.log(response.status);
        return response.json();
      } else if (response.status === 404) {
        return alert('Wrong location!');
      } else {
        alert('Some error!')
        throw new Error('You hav an error')
      }
    })
    .then(object => {
      setWeather(object);
      console.log(weather);
    })
    .catch(error => console.log(error))

    fetch(`${UNSPLASH_API_URL}${locations}&client_id=${UNSPLASH_API_KEY}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('You made a mistake');
      }
    })
    .then(data => {
      console.log(data);
      const index = Math.floor(Math.random() * 10);
      console.log(index);
      setPhotos(data?.results[index]?.urls?.raw)
    })
    .catch(error => console.log(error))
  }

  return (
    <div className="app">
      <div className="wrapper">
        <div className="search">
          <input
            type="text"
            value={locations}
            onChange={event => setLocations(event.target.value)}
            placeholder="Enter location"
            className="location_input"
          />
          <button className="location_searcher" onClick={ifClicked}>
            Search Location
          </button>
        </div>
        <div className="app__data">
          <p className="temp">Current Temparature: {Math.floor(weather?.main?.temp)} °C</p>
        </div>
        <img className="app__image" src={photos} alt="" />
      </div>
    </div>
  );
};

export default App;
