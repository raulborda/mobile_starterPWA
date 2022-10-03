export const saveDataInStorage = async (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  };
  
  export const getDataInStorage = async (key) => {
    try {
      const saved = localStorage.getItem(key);
      const parsedData = JSON.parse(saved);
  
      return parsedData || null;
    } catch (error) {
      return error;
    }
  };
  
  export const removeDataInStorage = async (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {}
  };
  