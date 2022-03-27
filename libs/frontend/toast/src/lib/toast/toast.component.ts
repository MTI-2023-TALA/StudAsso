import { Component } from '@angular/core';
import { ToastData, ToastType } from './toast.model';

@Component({
  selector: 'stud-asso-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  public data: ToastData = {
    type: ToastType.Error,
    title: 'Une erreur est survenue !',
    subTitle: '',
  };
}
