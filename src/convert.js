const convertTemp = (() => {
  let tempUnits = 'c';

  return {
    get units() {
      return tempUnits;
    },

    convert(temp) {
      let currentUnits;
      let celsius = Math.round(temp);
      let fahrenheit = Math.round((temp * (9 / 5)) + 32);

      if (celsius > 0) celsius = `+${celsius}°`;
      else celsius = `${celsius}°`;
      if (fahrenheit > 0) fahrenheit = `+${fahrenheit}°`;
      else fahrenheit = `${fahrenheit}°`;

      if (tempUnits === 'c') currentUnits = celsius;
      else if (tempUnits === 'f') currentUnits = fahrenheit;

      return {
        celsius,
        fahrenheit,
        currentUnits,
      };
    },

    switchUnits() {
      if (tempUnits === 'c') {
        tempUnits = 'f';
      } else if (tempUnits === 'f') {
        tempUnits = 'c';
      }
    },
  };
})();

const getBackgroundPosition = (temp) => {
  if (temp > 30) return '0% 0%';
  if (temp < -30) return '100% 100%';
  const newPosition = -Math.round((temp / 30) * 50) + 50;

  return `${newPosition}% ${newPosition}%`;
};

const getDate = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);
  const week = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return `${week[date.getDay()]}, ${date.getDate()}`;
};

const convertWeather = (rawData) => ({
  temp: convertTemp.convert(rawData.main.temp),
  tempFeeling: convertTemp.convert(rawData.main.feels_like),
  position: getBackgroundPosition(rawData.main.temp),
  name: rawData.name,
  description: rawData.weather[0].description,
});

const convertForecast = (rawData) => {
  const forecast = [];
  for (let i = 0; i < 7; i += 1) {
    forecast.push({
      weekDay: getDate(rawData.daily[i].dt),
      tempMorning: convertTemp.convert(rawData.daily[i].temp.morn),
      tempDay: convertTemp.convert(rawData.daily[i].temp.day),
      tempEvening: convertTemp.convert(rawData.daily[i].temp.eve),
      tempNight: convertTemp.convert(rawData.daily[i].temp.night),
      description: rawData.daily[i].weather[0].description,
      wind: `${Math.round(rawData.daily[i].wind_speed)}m/s`,
      pressure: Math.round(rawData.daily[i].pressure * 0.75),
      humidity: `${rawData.daily[i].humidity}%`,
      uvi: Math.round(rawData.daily[i].uvi * 10) / 10,
    });
  }

  return forecast;
};

export { convertWeather, convertForecast, convertTemp };
