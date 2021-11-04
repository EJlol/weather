import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import '../css/components/App.scss';

import Utils from '../utils';

import LocationSelect from './LocationSelect';
import WeerliveProvider from '../providers/weerlive';
import CurrentWeather from './CurrentWeather';

interface AppSaveState {
    temperature: number,
    location: string,
    lastUpdate: number
}

type AppState = AppSaveState & {
    locations: Array<string>
}

function isAppSaveState(o: any): o is AppSaveState {
    return 'temperature' in o && 'location' in o && 'lastUpdate' in o;
}

class App extends Component<{}, AppState> {
    constructor(props: {}) {
        super(props);

        const lastStateString = localStorage.getItem('last-state');
        if (lastStateString !== null) {
            this.state = {
                ...Utils.parseJson(isAppSaveState)(lastStateString).parsed,
                locations: [],
            };
        } else {
            this.state = {
                temperature: 0,
                location: 'Amsterdam',
                lastUpdate: 0,
                locations: [],
            };
        }

        this.handleLocationChange = this.handleLocationChange.bind(this);
    }

    componentDidMount() {
        fetch('locations.json')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ locations: data }, () => this.updateWeather());
            })
            .catch((reason) => console.error(reason));
    }

    handleLocationChange(location: string) {
        this.setState({ location, temperature: 0 }, () => this.updateWeather(true));
    }

    updateWeather(force?: boolean) {
        const { lastUpdate } = this.state;
        if (force) {
            this.fetchWeather();
        } else {
            const now = Date.now();
            const difference = Math.abs(lastUpdate - now) / 3.6e6;
            if (difference > 1) {
                this.fetchWeather();
            }
        }
    }

    fetchWeather() {
        const { location } = this.state;
        WeerliveProvider.fetchWeather(location)
            .then((data) => {
                const { temperature } = data[0];
                this.setState({ temperature, lastUpdate: Date.now() }, () => this.saveAppState());
            })
            .catch((reason) => console.error(reason));
    }

    saveAppState() {
        const { temperature, location, lastUpdate } = this.state;
        const saveString = JSON.stringify({
            temperature,
            location,
            lastUpdate,
        });
        localStorage.setItem('last-state', saveString);
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
