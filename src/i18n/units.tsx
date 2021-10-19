class Units {
    static temperatureFormat: Intl.NumberFormat = new Intl.NumberFormat(process.env.REACT_APP_LANGUAGE, {
        style: 'unit',
        unit: 'celsius',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
    });

    static temperature(value: number): string {
        return Units.temperatureFormat.format(value);
    }
}

export default Units;