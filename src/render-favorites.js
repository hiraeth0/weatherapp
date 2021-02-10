const removeCity = (cityName) => {
    const nodeForRemoval = document.querySelector(`article[data-city="${cityName}"]`);
    nodeForRemoval.classList.toggle('favorites__city--shrink');
    setTimeout(() => {
        nodeForRemoval.remove();
    }, 300);
};

const updateCityList = () => {
    const currentCity = document.querySelector('.weather__location').textContent;
    const oldCityList = localStorage.getItem('favoriteCities');
    let newCityList;

    if (oldCityList === null) newCityList = [];
    else newCityList = JSON.parse(oldCityList);
    if (newCityList.includes(currentCity)) {
        newCityList = newCityList.filter((city) => city !== currentCity);
        removeCity(currentCity);
    } else newCityList.push(currentCity);

    localStorage.setItem('favoriteCities', JSON.stringify(newCityList));
};

const renderFavorite = (favoritesWeather) => {
    for (let i = 0; i < favoritesWeather.length; i++) {
        const favoriteCitiesContainer = document.querySelector('.weather__favorites');
        const cityDiv = document.createElement('article');
        const wrapper = document.createElement('p');
        const name = document.createElement('span');
        const temperature = document.createElement('span');
        const status = document.createElement('p');

        cityDiv.setAttribute('class', 'favorites__city favorites__city--shrink');
        cityDiv.setAttribute('data-listener', 'none');
        cityDiv.setAttribute('data-city', `${favoritesWeather[i].name}`);
        cityDiv.setAttribute('tabindex', '0');
        wrapper.setAttribute('class', 'city__weather-wrapper');
        name.setAttribute('class', 'weather-wrapper__name');
        temperature.setAttribute('class', 'weather-wrapper__temp unit');
        status.setAttribute('class', 'city__status');

        name.textContent = favoritesWeather[i].name;
        temperature.textContent = favoritesWeather[i].temp.currentUnits;
        temperature.setAttribute('data-celsius', favoritesWeather[i].temp.celsius);
        temperature.setAttribute('data-fahrenheit', favoritesWeather[i].temp.fahrenheit);
        status.textContent = favoritesWeather[i].description;

        favoriteCitiesContainer.appendChild(cityDiv);
        cityDiv.appendChild(wrapper);
        wrapper.appendChild(name);
        wrapper.appendChild(temperature);
        cityDiv.appendChild(status);
        
        setTimeout(() => {
            cityDiv.classList.toggle('favorites__city--shrink');
        }, 50);
    }
};

export { updateCityList, renderFavorite };
