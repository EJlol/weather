import React from 'react';

interface LocationProps {
    name: string
}

const Location = (props: LocationProps) => {
    const { name } = props;
    return (
        <option value={name}>{name}</option>
    );
};

export default Location;
