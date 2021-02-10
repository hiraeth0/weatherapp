const switchUnits = () => {
    const switchButton = document.querySelector('.current-info__switch-units');
    const units = document.querySelectorAll('.unit');
    if (switchButton.dataset.unit === 'celsius') {
        switchButton.setAttribute('data-unit', 'fahrenheit');
        switchButton.textContent = 'fahrenheit';
        for (let i = 0; i < units.length; i++) {
            units[i].style.opacity = '0';
            setTimeout(() => {
                units[i].textContent = units[i].dataset.fahrenheit;
                units[i].style.opacity = '1';
            }, 310);
        }
    } else {
        switchButton.setAttribute('data-unit', 'celsius');
        switchButton.textContent = 'celsius';
        for (let i = 0; i < units.length; i++) {
            units[i].style.opacity = '0';
            setTimeout(() => {
                units[i].textContent = units[i].dataset.celsius;
                units[i].style.opacity = '1';
            }, 310);
        }
    }
};

export default switchUnits;
