import { FR } from './fr';
import { I18nLanguage } from './i18n.type';

export class I18nHelper {
  public static langage = I18nLanguage.fr;

  public static getTranslation(key: string): string {
    if (FR[key as keyof typeof FR]) {
      return FR[key as keyof typeof FR];
    }

    return `Translation not found with key: ${key}`;
  }
}
