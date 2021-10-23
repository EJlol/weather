import React, { ChangeEvent, Component } from 'react';

import '../css/components/LocationSelect.scss';
import Location from './Location';

interface LocationSelectProps {
  locations: Array<string>,
  onLocationChange: Function
}

class LocationSelect extends Component<LocationSelectProps, {}> {
    constructor(props: LocationSelectProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: ChangeEvent<HTMLSelectElement>) {
        const { onLocationChange } = this.props;
        onLocationChange(e.target.value);
    }

    render() {
        const { locations } = this.props;
        return (
            <div className="location-select-container">
                <select className="location-select" onChange={this.handleChange}>
                    {locations.map((location) => (<Location name={location} />))}
                </select>
            </div>
        );
    }
}

export default LocationSelect;
