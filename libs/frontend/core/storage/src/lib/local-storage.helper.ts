export function getData(key: string) {
  const jsonData = localStorage.getItem(key);
  if (!jsonData) {
    return null;
  }
  return JSON.parse(jsonData);
}

export function removeData(key: string) {
  return localStorage.removeItem(key);
}

export class LocalStorageHelper {
  public static setData<Type>(key: string, data: Type) {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  }

  public static getData(key: string) {
    const jsonData = localStorage.getItem(key);
    if (!jsonData) {
      return null;
    }
    return JSON.parse(jsonData);
  }

  public static removeData(key: string) {
    return localStorage.removeItem(key);
  }
}
