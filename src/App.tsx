import React, { Component } from "react";
import { hot } from "react-hot-loader";

import "./css/App.css";

import Units from './i18n/units';
import LocationSelect from "./components/LocationSelect";
import WeerliveProvider from './providers/weerlive';

interface AppState {
  temperature: number,
  location: string,
  locations: Array<string>
}

class App extends Component<{}, AppState> {
  weerliveProvider: WeerliveProvider;

  constructor(props: {}) {
    super(props);

    this.weerliveProvider = new WeerliveProvider();
    this.state = {
      temperature: 0,
      location: '',
      locations: []
    };

    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentDidMount() {
    fetch('locations.json')
      .then(response => response.json())
      .then(data => {
        this.setState({
          locations: data,
          location: data[0]
        });
      })
      .catch(reason => console.log(reason));
  }

  componentDidUpdate(previousProps: {}, previousState: AppState) {
    if (this.state.location !== previousState.location) {
      this.weerliveProvider.fetchWeather(this.state.location)
        .then(data => {
          this.setState({
            temperature: data[0].temperature,
            location: data[0].location
          });
        })
        .catch(reason => console.log(reason));
    }
  }

  handleLocationChange(location: string) {
    this.weerliveProvider.fetchWeather(location)
      .then(data => {
        this.setState({
          temperature: data[0].temperature,
          location: data[0].location
        });
      })
      .catch(reason => console.log(reason));
  }

  render() {
    return (
      <div className="App">
        <h1> De temperatuur in {this.state.location} is vandaag <span id="temperature">{Units.temperature(this.state.temperature)}</span></h1>
        <LocationSelect locations={this.state.locations} onLocationChange={this.handleLocationChange}></LocationSelect>
      </div>
    );
  }
}

export default hot(module)(App);