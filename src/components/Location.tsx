import React, { Component } from "react";

interface LocationProps {
    name: string
}

class Location extends Component<LocationProps, {}> {
    constructor(props: { name: string }) {
        super(props);
    }

    render() {
        return (
            <option value={this.props.name}>{this.props.name}</option>
        );
    }
}

export default Location