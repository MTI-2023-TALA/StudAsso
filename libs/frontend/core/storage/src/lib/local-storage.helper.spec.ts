import { LocalStorageHelper } from './local-storage.helper';

describe('LocalStorageHelper', () => {
  it('Should be undefined when no data is inside localStorage', () => {
    expect(LocalStorageHelper.getData('test')).toBeNull();
  });

  it('Should be true when data is inside localStorage', () => {
    localStorage.setItem('test', 'true');

    expect(LocalStorageHelper.getData('test')).toBe(true);
  });

  it('Should be null when removing the data', () => {
    localStorage.removeItem('test');

    expect(LocalStorageHelper.getData('test')).toBeNull();
  });

  it('Should be able to set data', () => {
    LocalStorageHelper.setData('test', true);

    expect(LocalStorageHelper.getData('test')).toBe(true);
  });

  it('Should be able to set data and remove it', () => {
    LocalStorageHelper.setData('test', true);
    localStorage.removeItem('test');

    expect(LocalStorageHelper.getData('test')).toBeNull();
  });

  it('Should be able to remove data', () => {
    LocalStorageHelper.setData('test', true);
    LocalStorageHelper.removeData('test');

    expect(LocalStorageHelper.getData('test')).toBeNull();
  });
});
