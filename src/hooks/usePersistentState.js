import { useState, useEffect } from "react";
import { StorageManager } from "../utils/storageManager";

const storage = new StorageManager();

export const usePersistentState = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return storage.getItem(key) ?? defaultValue;
  });

  useEffect(() => {
    storage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};
