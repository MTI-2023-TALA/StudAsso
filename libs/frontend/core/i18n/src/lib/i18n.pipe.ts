import { Pipe, PipeTransform } from '@angular/core';

import { I18nHelper } from './i18n.helper';

@Pipe({ name: 'i18n' })
export class I18nPipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    return I18nHelper.getTranslation(value);
  }
}
