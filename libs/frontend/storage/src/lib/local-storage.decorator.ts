import { getData, setData } from './local-storage.private.helper';

export function UseStorage(storageKey: string, defaultValue: any = null) {
  return function (target: any, key: string | symbol) {
    let val = target[key];

    const valStorage = getData(storageKey);
    if (valStorage !== null) {
      val = JSON.parse(valStorage);
    } else if (defaultValue) {
      val = defaultValue;
    }

    const getter = () => {
      return val;
    };

    const setter = (newVal: any) => {
      val = newVal;
      setData(storageKey, newVal);
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}
