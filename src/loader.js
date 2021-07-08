const loader = (() => {
  const main = document.querySelector('.container');

  const loading = document.createElement('div');
  const animation = document.createElement('div');

  loading.classList.add('loading');
  animation.classList.add('loading__animation');

  loading.appendChild(animation);

  return {
    mount() {
      main.classList.add('hidden');
      main.after(loading);
    },

    unmount() {
      main.classList.remove('hidden');
      loading.remove();
    },
  };
})();

export default loader;
