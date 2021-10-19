interface DayReport {
    location: string,
    temperature: number
}

type DayReports = Array<DayReport>;

interface apiReport {
    plaats: string,
    temp: string,
    gtemp: string,
    samenv: string,
    lv: string,
    windr: string,
    windms: string,
    winds: string,
    windk: string,
    windkmh: string,
    luchtd: string,
    ldmmhg: string,
    dauwp: string,
    zicht: string,
    verw: string,
    sup: string,
    sunder: string,
    image: string,
    d0weer: string,
    d0tmax: string,
    d0tmin: string,
    d0windk: string,
    d0windr: string,
    d0neerslag: string,
    d0zon: string,
    d1weer: string,
    d1tmax: string,
    d1tmin: string,
    d1windk: string,
    d1windr: string,
    d1neerslag: string,
    d1zon: string,
    d2weer: string,
    d2tmax: string,
    d2tmin: string,
    d2windk: string,
    d2windr: string,
    d2neerslag: string,
    d2zon: string,
    alarm: string,
    alarmtxt: string
}

interface api {
    liveweer: Array<apiReport>
}

class WeerLiveProvider {
    static url: RequestInfo = 'http://weerlive.nl/api/json-data-10min.php?key=' + process.env.WEERLIVE_API_KEY + '&locatie=Amsterdam';

    constructor() {

    }

    fetchWeather(): Promise<DayReports> {
        const promise : Promise<DayReports> = new Promise((resolve, reject) => {
            fetch(WeerLiveProvider.url)
                .then(response => {
                    if (!response.ok) {
                        reject(response.statusText);
                    }
                    return response.json() as Promise<api>;
                }).then(json => {
                    const reports = json.liveweer.map<DayReport>(report => ({
                        location: report.plaats,
                        temperature: parseFloat(report.temp)
                    }));
                    resolve(reports);
                        
                }).catch(reason => {
                    reject(reason);
                });
        });

        return promise;
    }
}

export default WeerLiveProvider;