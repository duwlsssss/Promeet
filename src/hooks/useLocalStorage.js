const useLocalStorage = (key) => {
  const setItem = (value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      throw new Error(error);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : null;
    } catch (error) {
      throw new Error(error);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      throw new Error(error);
    }
  };

  return { setItem, getItem, removeItem };
};

export default useLocalStorage;
