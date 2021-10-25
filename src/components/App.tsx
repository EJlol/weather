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
            location: localStorage.getItem('location') ?? 'Amsterdam',
            locations: [],
        };

        this.handleLocationChange = this.handleLocationChange.bind(this);
    }

    componentDidMount() {
        fetch('locations.json')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ locations: data });
                this.updateWeather();
            })
            .catch((reason) => console.error(reason));
    }

    componentDidUpdate(previousProps: {}, previousState: AppState) {
        const { location } = this.state;
        if (location !== previousState.location) {
            localStorage.setItem('location', location);
            this.updateWeather();
        }
    }

    handleLocationChange(location: string) {
        this.setState({ location, temperature: 0 });
    }

    updateWeather() {
        const { location } = this.state;
        WeerliveProvider.fetchWeather(location)
            .then((data) => {
                this.setState({ temperature: data[0].temperature });
            })
            .catch((reason) => console.error(reason));
    }

    render() {
        const { locations, location, temperature } = this.state;
        return (
            <div className="App">
                <LocationSelect
                    locations={locations}
                    selectedLocation={location}
                    onLocationChange={this.handleLocationChange}
                />
                <CurrentWeather temperature={temperature} />
            </div>
        );
    }
}

export default hot(module)(App);
