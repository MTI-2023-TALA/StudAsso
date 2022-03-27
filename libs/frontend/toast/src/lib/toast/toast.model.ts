export enum ToastType {
  Error = 'error',
  Success = 'success',
  Warning = 'warning',
}

export interface ToastData {
  type: ToastType;
  title: string;
  subTitle: string;
}
