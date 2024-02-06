export default function Temp(props) {
    const isToday = (date) => {
      const today = new Date().toLocaleDateString();
      return date === today;
    };
  
    const condition = () => {
      switch (props.condition) {
        case "Clear":
          return <i className="bi bi-brightness-high"></i>;
        case "Clouds":
          return <i className="bi bi-clouds"></i>;
        case "Rain":
          return <i className="bi bi-clouds-rain"></i>;
        case "Snow":
          return <i className="bi bi-snow"></i>;
        case "Thunderstorm":
          return <i className="bi bi-clouds-lightning"></i>;
        default:
          return <i className="bi bi-thermometer-half"></i>;
      }
    };
  
    return (
      <div
        key={props.date}
        className={`col-sm-6 col-md-3 col-lg-3 ${isToday(props.date) ? "today" : ""}`}
      >
        <div className="card p-3 m-2">
          <h2>
            {condition()} {props.date}
          </h2>
          <p className="font-weight-bold">
            Max Temp: {(props.temps.maxTemp - 273.5).toFixed(2)}°C
          </p>
          <p className="font-weight-bold">
            Min Temp: {(props.temps.minTemp - 273.5).toFixed(2)}°C
          </p>
          <p className="font-weight-bold">humidity : {props.humidity}%</p>
          <span className="font-weight-bold">
            <i className="bi bi-wind"></i>
            {props.wind}
            <span> km/h</span>
          </span>
        </div>
      </div>
    );
  }
  