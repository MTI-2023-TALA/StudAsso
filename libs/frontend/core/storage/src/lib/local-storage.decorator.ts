import { getData, setData } from './local-storage.helper';

export function UseStorage(storageKey: string) {
  return function (target: any, key: string | symbol) {
    let val = target[key];

    const valStorage = getData(storageKey);
    let firstime = true;
    if (valStorage !== null) {
      val = JSON.parse(valStorage);
    }

    const getter = () => {
      return val;
    };

    const setter = (newVal: any) => {
      val = newVal;
      if (firstime && valStorage) {
        val = JSON.parse(valStorage);
        firstime = false;
        return;
      }
      setData(storageKey, val);
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}
