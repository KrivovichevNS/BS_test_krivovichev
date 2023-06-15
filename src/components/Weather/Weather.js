import React, { useState } from "react";
import "./Weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleClick = () => {
    if (city) {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=5123e1e907344928703ad2471f423551`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
          setCity("");
          setError("");
        });
    } else {
      setError("Вы не указали город!");
    }
  };

  return (
    <div className="container">
      <div className="weather-wrapper">
        <div className="form-wrapper">
          <input
            type="text"
            value={city}
            onChange={handleChange}
            placeholder="Введите город"
          />
          <button onClick={handleClick}>Посмотреть погоду</button>
        </div>
        {weather?.cod === 200 && (
          <div className="result-wrapper">
            <h2>Погода в {weather?.name} сегодня:</h2>
            <p>
              Температура: {Math.floor(weather?.main?.temp - 273.15)} &#8451;
            </p>
            <p>Атмосферное давление: {weather?.main?.pressure} мм. рт. ст.</p>
            <p>Ветер: {weather?.wind?.speed} м/с</p>
          </div>
        )}
        <div className="error">{error}</div>
      </div>
    </div>
  );
}

export default Weather;
