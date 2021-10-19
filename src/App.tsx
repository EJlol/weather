import React, { Component} from "react";
import { hot } from "react-hot-loader";

import "./css/App.css";

import Units from './i18n/units';
import WeerliveProvider from './providers/weerlive';

interface State {
  temperature: number,
  location: string
}

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      temperature: 0,
      location: ''
    };
  }

  componentDidMount() {
    const weerliveProvider : WeerliveProvider = new WeerliveProvider();
    weerliveProvider.fetchWeather()
      .then(data => {
        this.setState({
          temperature: data[0].temperature,
          location: data[0].location
        });
      })
      .catch(reason => console.log(reason));
  }

  render() {
    return(
      <div className="App">
        <h1> De temperatuur in { this.state.location } is vandaag <span id="temperature">{ Units.temperature(this.state.temperature) }</span></h1>
      </div>
    );
  }
}

export default hot(module)(App);