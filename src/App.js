import { useEffect, useState } from "react";
import "./App.css";
import Temp from "./components/temp";
import Today from "./components/today";


export default function App() {
  const ApiKey = "defc58b0449df58f5b750a7810dc80b2";
  const [dailyData, setDailyData] = useState([]);
  const [city, setCity] = useState("vijayawada");

  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${ApiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const dailyTemps = groupDataByDay(data.list);
        setDailyData(dailyTemps);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const groupDataByDay = (data) => {
    const dailyTemps = {};
    const today = new Date().toLocaleDateString();

    data.forEach((obj) => {
      const date = convertToDate(obj.dt);
      const condition = obj.weather[0].main;
      const humidity = obj.main.humidity;
      const wind = obj.wind.speed;
      if (!dailyTemps[date]) {
        dailyTemps[date] = {
          maxTemp: obj.main.temp,
          minTemp: obj.main.temp,
          condition: condition,
          humidity: humidity,
          wind: wind,
        };
      } else {
        dailyTemps[date].maxTemp = Math.max(
          dailyTemps[date].maxTemp,
          obj.main.temp
        );
        dailyTemps[date].minTemp = Math.min(
          dailyTemps[date].minTemp,
          obj.main.temp
        );
      }
    });

    const todayWeather = dailyTemps[today];
    delete dailyTemps[today];
    const nextFiveDaysWeather = Object.entries(dailyTemps).slice(0, 5);

    return { today: todayWeather, nextFiveDays: nextFiveDaysWeather };
  };

  const convertToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  return (
    <div className="App">
      {/* search */}
      <section>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Weather App
            </a>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Enter City"
                aria-label="Search"
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
            </form>
          </div>
        </nav>
      </section>

      <div className="container">
          {dailyData.today && (
            <Today
              key="today"
              date={city}
              temps={dailyData.today}
              condition={dailyData.today.condition}
              humidity={dailyData.today.humidity}
              wind={dailyData.today.wind}
            />
          )}
        <div className="row">
          {dailyData.nextFiveDays &&
            dailyData.nextFiveDays.map(([date, temps]) => (
              <Temp
                key={date}
                date={date}
                temps={temps}
                condition={temps.condition}
                humidity={temps.humidity}
                wind={temps.wind}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
