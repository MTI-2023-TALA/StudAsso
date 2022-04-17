import { UseStorage } from './local-storage.decorator';

class LocalStorageDecoratorTest {
  @UseStorage('test') test: boolean;

  constructor() {
    return;
  }
}

describe('LocalStorageDecorator', () => {
  let localStorageTest: LocalStorageDecoratorTest;
  beforeEach(() => {
    localStorage.removeItem('test');
    localStorageTest = new LocalStorageDecoratorTest();
  });

  it('Should be undefined when LocalStorageDecoratorTest is created and no value set to test', () => {
    expect(localStorageTest.test).toBeUndefined();
  });

  it('Should be true when LocalStorageDecoratorTest is created and set to true', () => {
    localStorageTest.test = true;

    expect(localStorageTest.test).toBe(true);
  });

  it('Should be true when LocalStorageDecoratorTest is created and recreated and set to true', () => {
    localStorageTest.test = true;

    const localStorageTest2 = new LocalStorageDecoratorTest();

    expect(localStorageTest2.test).toBe(true);
  });
});
