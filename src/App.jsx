import { useEffect, useState } from 'react';
import './App.css';


import brokencloudsIcon from "./assets/brokenclouds.png";
import clearsky1dIcon from "./assets/clearsky1d.png";
import clearsky1nIcon from "./assets/clearsky01n.png";
import fewclouds2dIcon from "./assets/fewclouds2d.png";
import fewclouds2nIcon from "./assets/fewclouds2n.png";
import mistIcon from "./assets/mist.png";
import rainIcon from "./assets/rain.png";
import scatteredcloudsIcon from "./assets/scatteredclouds.png";
import showerrainIcon from "./assets/showerrain.png";
import thunderstormIcon from './assets/thunderstorm.png';
import snowIcon from './assets/snow.png';
import humidityIcon from './assets/humidity.png';
import windIcon from './assets/wind.png';
import { use } from 'react';


const WeatherDetails=({icon,temp,city,country,lat,log,humidity,wind})=>{
  return(
  <>
  <div className='Image'>
    <img src={icon} alt="Image" />
  </div>
  <div className='temp'>{temp} °C</div>
  <div className='Location'>{city}</div>
  <div className='Country'>{country}</div>
  <div className="cord">
    <div>
      <span className="lat">latitude</span>
      <span>{lat}</span>
    </div>
    <div>
      <span className="log">longitude</span>
      <span>{log}</span>
    </div>
  </div>
  <div className='data-container'>
    <div className='element'>
      <img src={humidityIcon} className="wind-icon" alt="icon" />
      <div className="data">
        <div className="humidity-percent">{humidity} %</div>
        <div className="text">Humidity</div>
      </div>
    </div>
    <div className='element'>
      <img src={windIcon} className="wind-icon" alt="icon" />
      <div className="data">
        <div className="wind-percent">{wind} km/h</div>
        <div className="text">wind Speed</div>
      </div>
    </div>
  </div>
  </>
  );
}



function App() {
  let api_key="e39102014fda0bb5e7eea4f9708601d8";
  const [text,setText]=useState("Chennai");

const [icon,setIcon]=useState(brokencloudsIcon);
const [temp,setTemp]=useState(0);
const [city,setCity]=useState("Chennai");
const [country,setCountry]=useState("In");
const [lat,setLat]=useState(0);
const [log,setLog]=useState(0);
const [humidity,setHumidity]=useState(0);
const [wind,setWind]=useState(0);

const [cityNotFound,setCityNotFound]=useState(false);
const [loading,setLoading]=useState(false);

const[error,setError]=useState(null);

const weatherIconMap={
  "01d": clearsky1dIcon,
  "01n": clearsky1nIcon,
  "02d": fewclouds2dIcon,
  "02n": fewclouds2nIcon,
  "03d": scatteredcloudsIcon,
  "03n": scatteredcloudsIcon,
  "04d": brokencloudsIcon,
  "04n": brokencloudsIcon,
  "09d": showerrainIcon,
  "09n": showerrainIcon,
  "010d": rainIcon,
  "010n": rainIcon,
  "011d": thunderstormIcon,
  "011n": thunderstormIcon,
  "013d": snowIcon,
  "013n": snowIcon,
  "050d": mistIcon,
  "050n": mistIcon,
}

const search= async() =>{
  setLoading(true);

  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
  
  try{
    let res= await fetch(url);
    let data= await res.json();
    if (data.code==="404"){
      console.error("City not found");
      setCityNotFound(true);
      setLoading(false);
      return;
    }
    setHumidity(data.main.humidity);
    setWind(data.wind.speed);
    setTemp(Math.floor(data.main.temp));
    setCity(data.name);
    setCountry(data.sys.country);
    setLat(data.coord.lat);
    setLog(data.coord.lon);

    const weatherIconCode=data.weather[0].icon;
    setIcon(weatherIconMap[weatherIconCode] || clearIcon);

  }catch(error){
    console.error("An error occurred:",error.message);
    setError("An error occurred while fetching weather data.");
  }
  finally{
    setLoading(false);
  }
};

const handleCity=(e)=>{
  setText(e.target.value);

};

const handleKeyDown=(e)=>{
  if (e.key==="Enter"){
    search();
  }

};

useEffect(function(){
  search()

},[])

return(
    <>
      <div className='container'>
        <div className='input-container'> 
          <input type='text'
          className='cityINput'
          placeholder='Search City' 
          onChange={handleCity}
          value={text}
          onKeyDown={handleKeyDown}/>
          <div className='Search-icon'>
            <button className='SearchButton' onClick={()=>search()} >Serach</button>
          </div>
        </div>
        
        <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log}
        humidity={humidity} wind={wind}/>

        {loading && <div className="loading-message">Loading....</div>}
        {error && <div className="error-message">{error}</div>}
        {cityNotFound && <div className="city-not-found">City not found</div>}
        <p className='copyright'>Dsigned by <span>Bharath Kumar</span></p>

      </div>
    </>
  );
}

export default App
