import { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Header from './components/header/header'
import Home from './components/home/home'
import Task from './components/task/task';
import Weather from './components/weather/weather';
import Calculator from './components/calculator/calculator';

import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: ""
    }
  }

  changeRoute = (route) => {
    this.setState({
      route: route
    })
  }


  render() {
    return (
      <div className="app">
        <Router>
          <Header route={this.state.route} />
          <Routes>
            <Route exact path="/" element={<Home changeRoute={this.changeRoute} />} />
            <Route exact path="/task" element={<Task changeRoute={this.changeRoute} />} />
            <Route exact path="/calculator" element={<Calculator changeRoute={this.changeRoute} />} />
            <Route exact path="/weather" element={<Weather changeRoute={this.changeRoute} />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
