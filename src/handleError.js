const handleError = (() => {
  const errorElement = document.querySelector('.search__error');
  let timeoutId;

  return {
    show(message = 'Something went wrong!') {
      clearTimeout(timeoutId);
      errorElement.textContent = message;
      errorElement.classList.remove('invisible');
      timeoutId = setTimeout(() => {
        this.hide();
      }, 4000);
    },
    hide() {
      errorElement.classList.add('invisible');
    },
  };
})();

export default handleError;
