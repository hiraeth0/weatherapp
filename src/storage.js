const storage = (() => {
  const getStorage = () => JSON.parse(localStorage.getItem('cities'));
  const setStorage = (value) => localStorage.setItem('cities', JSON.stringify(value));

  if (getStorage() === null) setStorage(['Moscow', 'London', 'New York']);

  return {
    get cities() {
      return getStorage();
    },

    add(name) {
      const list = getStorage();
      if (!list.find((entry) => entry === name)) {
        list.push(name);
        setStorage(list);
      }
    },

    remove(name) {
      const list = getStorage();
      const filtered = list.filter((entry) => entry !== name);
      setStorage(filtered);
    },

    isIncluded(name) {
      return getStorage('cities').includes(name);
    },
  };
})();

export default storage;
