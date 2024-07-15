import { useEffect, useState } from "react";

export const useLocalStorage = (key) => {
  const [data, setData] = useState();

  useEffect(() => {
    const rawResponse = localStorage.getItem(key);
    if (!rawResponse.length) {
      return;
    }
    const response = JSON.parse(rawResponse);

    if (response) {
      setData(response);
    }
  }, []);

  const saveData = (newData) => {
    localStorage.setItem("data", JSON.stringify(newData));
    setData(newData);
  };

  return [data, saveData];
};