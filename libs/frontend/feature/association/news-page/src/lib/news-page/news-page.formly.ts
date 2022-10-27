import { Form } from '@stud-asso/frontend-shared-formly';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { NewsDto } from '@stud-asso/shared/dtos';

export const createNewsFormly: FormlyFieldConfig[] = [
  {
    key: 'title',
    type: Form.Input,
    props: {
      label: 'Titre',
    },
  },
  {
    key: 'content',
    type: Form.TextArea,
    props: {
      label: 'Contenu',
    },
  },
];

export function updateNewsFormly(news: NewsDto): FormlyFieldConfig[] {
  return [
    {
      key: 'title',
      type: Form.Input,
      defaultValue: news.title,
      props: {
        label: 'Titre',
      },
    },
    {
      key: 'content',
      type: Form.TextArea,
      defaultValue: news.content,
      props: {
        label: 'Contenu',
      },
    },
  ];
}

export interface ICreateNewsFormly {
  title: string;
  content: string;
}
