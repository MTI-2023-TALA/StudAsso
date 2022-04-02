import { Component, ComponentRef, OnDestroy, OnInit } from '@angular/core';
import { ToastData, ToastType } from './toast.model';

@Component({
  selector: 'stud-asso-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit, OnDestroy {
  ToastType: typeof ToastType = ToastType;
  cmpRef: ComponentRef<ToastComponent>;
  data: ToastData = {
    type: ToastType.Error,
    title: 'Une erreur est survenue !',
    subTitle: '',
  };
  interval: number;

  ngOnInit(): void {
    this.interval = window.setInterval(() => this.cmpRef?.destroy(), 5000);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  public closeToast() {
    this.cmpRef?.destroy();
  }
}
