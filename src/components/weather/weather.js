import React, { useEffect, useState } from 'react';
import Search from './search/search'
import Card from './card/card'

import { useDispatch } from 'react-redux';
import { change } from "../../actions";

import './weather.css'

const host = "community-open-weather-map.p.rapidapi.com";
const apiKey = process.env.REACT_APP_API_KEY;

const WeatherPresentational = props => {
  return (
    <div className="weather">
      <div className="header"><h3>WEATHER</h3></div>
      <Search handleSearch={props.handleSearch}></Search>
      <Card data={props.data}></Card>
    </div>
  )
}

const Weather = () => {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(change('weather'));
  }, [dispatch]);

  const composeEndpoint = (input) => {
    //params
    const separator = "%2C%20";
    const count = "10";
    const mode = null;
    const longitude = "0";
    const type = ["link", "accurate"].join(separator);
    const latitude = "0";
    const units = ["metric"].join(separator);

    //endpoint
    const endpoint = "https://community-open-weather-map.p.rapidapi.com/";
    const params = `find?q=${input}&cnt=${count}&mode=${mode}&lon=${longitude}&type=${type}&lat=${latitude}&units=${units}`;

    return endpoint + params;
  }

  const handleSearch = (input) => {
    if (input.trim() !== "") {
      let endpoint = composeEndpoint(input);

      fetch(endpoint, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": host,
          "x-rapidapi-key": apiKey
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data.count > 0) {
            // this.setState({ list: data.list })
            setList(data.list)
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
  return <WeatherPresentational handleSearch={handleSearch} data={list} />;
}

export default Weather;


// const WeatherPresentational = props => {
//   return (
//     <div className="weather">
//       <div className="header"><h3>WEATHER APPLICATION</h3></div>
//       <Search handleSearch={props.handleSearch}></Search>
//       <Card data={props.data}></Card>
//     </div>
//   )
// }

// class Weather extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: '',
//       list: []
//     }
//   }

//   componentDidMount() {
//     this.props.changeRoute('weather');
//     this.handleSearch('london');
//   }

//   composeEndpoint = (input) => {
//     //params
//     const separator = "%2C%20";
//     const count = "10";
//     const mode = null;
//     const longitude = "0";
//     const type = ["link", "accurate"].join(separator);
//     const latitude = "0";
//     const units = ["metric"].join(separator);

//     //endpoint
//     const endpoint = "https://community-open-weather-map.p.rapidapi.com/";
//     const params = `find?q=${input}&cnt=${count}&mode=${mode}&lon=${longitude}&type=${type}&lat=${latitude}&units=${units}`;

//     return endpoint + params;
//   }

//   handleSearch = (input) => {
//     if (input.trim() !== "") {
//       let endpoint = this.composeEndpoint(input);

//       fetch(endpoint, {
//         "method": "GET",
//         "headers": {
//           "x-rapidapi-host": host,
//           "x-rapidapi-key": apiKey
//         }
//       })
//         .then(response => {
//           return response.json();
//         })
//         .then(data => {
//           if (data.count > 0) {
//             this.setState({ list: data.list })
//           }
//         })
//         .catch(err => {
//           console.error(err);
//         });
//     }
//   }

//   render() {
//     return <WeatherPresentational handleSearch={this.handleSearch} data={this.state.list} />;
//   }
// }
