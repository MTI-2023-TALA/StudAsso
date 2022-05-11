import { I18nHelper } from './i18n.helper';

describe('I18nHelper', () => {
  it('Should not found the translation', () => {
    expect(I18nHelper.getTranslation('test-not-found')).toBe('Translation not found with key: test-not-found');
  });

  it('Should found the translation', () => {
    expect(I18nHelper.getTranslation('test-found')).toBe('This translation is used for test');
  });
});
