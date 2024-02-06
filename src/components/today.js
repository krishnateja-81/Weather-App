export default function Today(props){
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
        <div key={props.key} className="m-3 p-3">
            <center>
            <h1 className="white">
            {condition()} {props.date}
          </h1>
          <h2 className="white font-weight-bold">
             {(props.temps.maxTemp - 273.5).toFixed(2)}°C
          </h2>
          {/* <p className="font-weight-bold">
            Min Temp: {(props.temps.minTemp - 273.5).toFixed(2)}°C
          </p> */}
          <p className="white font-weight-bold"><i class="bi bi-moisture">   </i>humidity : {props.humidity}%</p>
          <p className="white font-weight-bold">
            <i className="bi bi-wind"></i>
            {props.wind}
             km/h</p>
          
          </center>
        </div>
    )
}