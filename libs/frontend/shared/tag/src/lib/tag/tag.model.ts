export enum TagType {
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
  Information = 'information',
  Default = 'default',
}

export interface Tag {
  type: string;
  message: string | undefined;
  icon?: string;
  shouldDisplayIcon?: boolean;
  shouldBeClickable?: boolean;
  value?: string;
}
