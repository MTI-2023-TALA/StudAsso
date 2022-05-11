import { Pipe, PipeTransform } from '@angular/core';

import { I18nHelper } from './i18n.helper';

@Pipe({ name: 'i18nFr' })
export class I18nPipe implements PipeTransform {
  transform(value: string): string {
    return I18nHelper.getTranslation(value);
  }
}
