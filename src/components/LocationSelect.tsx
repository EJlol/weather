import React, { ChangeEvent, Component } from "react";

import Location from "./Location";

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
    this.props.onLocationChange(e.target.value);
  }

  render() {
    return (
      <select onChange={this.handleChange}>{this.props.locations.map(location => (<Location name={location} />))}</select>
    );
  }
}

export default LocationSelect;