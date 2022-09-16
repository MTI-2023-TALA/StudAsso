import { getData, removeData, setData } from './local-storage.helper';

describe('LocalStorageHelper', () => {
  it('Should be undefined when no data is inside localStorage', () => {
    expect(getData('test')).toBeNull();
  });

  it('Should be true when data is inside localStorage', () => {
    localStorage.setItem('test', 'true');

    expect(getData('test')).toBe(true);
  });

  it('Should be null when removing the data', () => {
    localStorage.removeItem('test');

    expect(getData('test')).toBeNull();
  });

  it('Should be able to set data', () => {
    setData('test', true);

    expect(getData('test')).toBe(true);
  });

  it('Should be able to set data and remove it', () => {
    setData('test', true);
    localStorage.removeItem('test');

    expect(getData('test')).toBeNull();
  });

  it('Should be able to remove data', () => {
    setData('test', true);
    removeData('test');

    expect(getData('test')).toBeNull();
  });
});
