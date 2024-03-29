export class LocalStorageHelper {
  public static setData<Type>(key: string, data: Type) {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  }

  public static getData<Type>(key: string): Type | null {
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
