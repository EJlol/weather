import React from 'react';

import '../css/components/CurrentWeather.scss';

import Units from '../i18n/units';

interface CurrentWeatherProps {
    temperature: number
}

const CurrentWeather = (props: CurrentWeatherProps) => {
    const { temperature } = props;
    return (
        <div className="current-weather">
            <div className="temperature">{ Units.temperature(temperature) }</div>
        </div>
    );
};

export default CurrentWeather;
