import { Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[studAssoTooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input() studAssoTooltip = '';
  @Input() delay? = 190;
  @Input() placement?: string;

  private popup: HTMLDivElement;
  private timer: NodeJS.Timeout;

  constructor(private el: ElementRef) {}

  ngOnDestroy(): void {
    if (this.popup) this.popup.remove();
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.timer = setTimeout(() => {
      let x = 0;
      let y = 0;
      switch (this.placement) {
        case 'top': {
          x = this.el.nativeElement.getBoundingClientRect().left + this.el.nativeElement.offsetWidth / 2;
          y = this.el.nativeElement.getBoundingClientRect().top - this.el.nativeElement.offsetHeight + 6;
          break;
        }
        case 'left': {
          x = this.el.nativeElement.getBoundingClientRect().left - 6;
          y = this.el.nativeElement.getBoundingClientRect().top + this.el.nativeElement.offsetHeight / 2;
          break;
        }
        case 'right': {
          x = this.el.nativeElement.getBoundingClientRect().left + this.el.nativeElement.offsetWidth + 6;
          y = this.el.nativeElement.getBoundingClientRect().top + this.el.nativeElement.offsetHeight / 2;
          break;
        }
        default: {
          x = this.el.nativeElement.getBoundingClientRect().left + this.el.nativeElement.offsetWidth / 2;
          y = this.el.nativeElement.getBoundingClientRect().top + this.el.nativeElement.offsetHeight + 6;
        }
      }

      this.createTooltipPopup(x, y);
    }, this.delay);
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.timer) clearTimeout(this.timer);
    if (this.popup) {
      this.popup.remove();
    }
  }

  @HostListener('click') onClick() {
    if (this.timer) clearTimeout(this.timer);
    if (this.popup) {
      this.popup.remove();
    }
  }

  private createTooltipPopup(x: number, y: number) {
    const popup = document.createElement('div');
    popup.innerHTML = this.studAssoTooltip;
    popup.setAttribute('class', 'tooltip-container');
    popup.style.top = y.toString() + 'px';
    popup.style.left = x.toString() + 'px';
    document.body.appendChild(popup);
    this.popup = popup;
    if (this.placement == 'left' || this.placement == 'right') {
      y -= popup.clientHeight / 2;
      popup.style.top = y.toString() + 'px';
    }
  }
}
