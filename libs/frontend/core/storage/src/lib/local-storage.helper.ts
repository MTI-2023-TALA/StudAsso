export function setData<Type>(key: string, data: Type) {
  const jsonData = JSON.stringify(data);
  localStorage.setItem(key, jsonData);
}

export function getData(key: string) {
  return localStorage.getItem(key);
}

export function removeData(key: string) {
  return localStorage.removeItem(key);
}
