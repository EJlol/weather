import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import '../css/components/App.scss';

import LocationSelect from './LocationSelect';
import WeerliveProvider from '../providers/weerlive';
import CurrentWeather from './CurrentWeather';

interface AppState {
  temperature: number,
  location: string,
  locations: Array<string>
}

class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            temperature: 0,
            location: '',
            locations: [],
        };

        this.handleLocationChange = this.handleLocationChange.bind(this);
    }

    componentDidMount() {
        fetch('locations.json')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    locations: data,
                    location: data[0],
                });
            })
            .catch((reason) => console.error(reason));
    }

    componentDidUpdate(previousProps: {}, previousState: AppState) {
        const { location } = this.state;
        if (location !== previousState.location) {
            this.updateWeather(location);
        }
    }

    handleLocationChange(location: string) {
        this.updateWeather(location);
    }

    updateWeather(location: string) {
        WeerliveProvider.fetchWeather(location)
            .then((data) => {
                this.setState({
                    temperature: data[0].temperature,
                    location: data[0].location,
                });
            })
            .catch((reason) => console.error(reason));
    }

    render() {
        const { locations, temperature } = this.state;
        return (
            <div className="App">
                <LocationSelect
                    locations={locations}
                    onLocationChange={this.handleLocationChange}
                />
                <CurrentWeather temperature={temperature} />
            </div>
        );
    }
}

export default hot(module)(App);
