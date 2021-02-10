const convertTemp = (temp) => {
    let currentUnits;
    let celsius = Math.round(temp);
    let fahrenheit = Math.round((temp * (9 / 5)) + 32);
    if (celsius > 0) celsius = `+${celsius}°`;
    else celsius = `${celsius}°`;
    if (fahrenheit > 0) fahrenheit = `+${fahrenheit}°`;
    else fahrenheit = `${fahrenheit}°`;

    const unitSwitch = document.querySelector('.current-info__switch-units').dataset.unit;
    if (unitSwitch === 'celsius') currentUnits = celsius;
    else currentUnits = fahrenheit;
    
    return {
        celsius,
        fahrenheit,
        currentUnits,
    };
};

const getNewPosition = (temp) => {
    if (temp > 30) return '0% 0%';
    if (temp < -30) return '100% 100%';
    const newPosition = -Math.round((temp / 30) * 50) + 50;
    return `${newPosition}% ${newPosition}%`;
};

const getWeekDay = (unixTime) => {
    const week = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    return week[(Math.floor((unixTime / 86400) + 4) % 7)];
};

const convertWeather = (rawData) => {
    return {
        temp: convertTemp(rawData.main.temp),
        tempFeeling: convertTemp(rawData.main.feels_like),
        position: getNewPosition(rawData.main.temp),
        name: rawData.name,
        description: rawData.weather[0].description,
    };
};

const convertForecast = (rawData) => {
    const forecast = [];
    for (let i = 0; i < 7; i++) {
        forecast.push({
            weekDay: getWeekDay(rawData.daily[i].dt),
            tempMorning: convertTemp(rawData.daily[i].temp.morn),
            tempDay: convertTemp(rawData.daily[i].temp.day),
            tempEvening: convertTemp(rawData.daily[i].temp.eve),
            tempNight: convertTemp(rawData.daily[i].temp.night),
            description: rawData.daily[i].weather[0].description,
            wind: `${Math.round(rawData.daily[i].wind_speed)}m/s`,
            pressure: Math.round(rawData.daily[i].pressure * 0.75),
            humidity: `${rawData.daily[i].humidity}%`,
            uvi: Math.round(rawData.daily[i].uvi * 10) / 10,
        });
    }
    return forecast;
};

export { convertWeather, convertForecast };
