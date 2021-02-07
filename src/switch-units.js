const convertTemp = (temp) => {
    const switchButton = document.querySelector('.current-info__switch-units').dataset.unit;
    let newTemp = temp;
    if (switchButton === 'fahrenheit') newTemp = (newTemp * (9 / 5)) + 32;
    newTemp = Math.round(newTemp);
    if (newTemp > 0) return `+${newTemp}°`;
    return `${newTemp}°`;
};

const switchUnits = () => {
    const switchButton = document.querySelector('.current-info__switch-units');
    const units = document.querySelectorAll('.unit');
    if (switchButton.dataset.unit === 'celsius') {
        switchButton.setAttribute('data-unit', 'fahrenheit');
        switchButton.textContent = 'fahrenheit';
    } else {
        switchButton.setAttribute('data-unit', 'celsius');
        switchButton.textContent = 'celsius';
    }

    for (let i = 0; i < units.length; i++) {
        units[i].style.opacity = '0';
        setTimeout(() => {
            units[i].textContent = convertTemp(units[i].dataset.temp);
            units[i].style.opacity = '1';
        }, 310);
    }
};

export { switchUnits, convertTemp };
