export class StorageManager {
  constructor() {
    this.memoryStorage = {};
    this.isLocalStorageAvailable = this.checkLocalStorage();
    this.prefix = "motivationHub_v2_"; // Updated prefix for new structure
  }

  checkLocalStorage() {
    try {
      const test = "__test__";
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(test, test);
        window.localStorage.removeItem(test);
        return true;
      }
    } catch (e) {
      return false;
    }
    return false;
  }

  getItem(key) {
    const fullKey = this.prefix + key;
    if (this.isLocalStorageAvailable) {
      try {
        const item = window.localStorage.getItem(fullKey);
        return item ? JSON.parse(item) : null;
      } catch (e) {
        console.error(`Error reading from localStorage for key: ${fullKey}`, e);
        return null;
      }
    }
    return this.memoryStorage[fullKey] || null;
  }

  setItem(key, value) {
    const fullKey = this.prefix + key;
    if (this.isLocalStorageAvailable) {
      try {
        window.localStorage.setItem(fullKey, JSON.stringify(value));
      } catch (e) {
        console.error(`Error writing to localStorage for key: ${fullKey}`, e);
        this.memoryStorage[fullKey] = value;
      }
    } else {
      this.memoryStorage[fullKey] = value;
    }
  }
}
