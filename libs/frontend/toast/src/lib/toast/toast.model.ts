export enum ToastType {
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
  Information = 'information',
}

export interface ToastData {
  type: ToastType;
  title: string;
  subTitle: string;
}
