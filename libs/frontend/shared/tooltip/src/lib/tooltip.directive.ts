import { Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';

enum Placement {
  LEFT = 'left',
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
}

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
      const x = this.getXPosition();
      const y = this.getYPosition();
      this.createTooltipPopup(x, y);
    }, this.delay);
  }

  getXPosition() {
    switch (this.placement) {
      case Placement.LEFT: {
        return this.el.nativeElement.getBoundingClientRect().left - 6;
      }
      case Placement.RIGHT: {
        return this.el.nativeElement.getBoundingClientRect().left + this.el.nativeElement.offsetWidth + 6;
      }
      default: {
        return this.el.nativeElement.getBoundingClientRect().left + this.el.nativeElement.offsetWidth / 2;
      }
    }
  }

  getYPosition() {
    switch (this.placement) {
      case Placement.TOP: {
        return this.el.nativeElement.getBoundingClientRect().top - this.el.nativeElement.offsetHeight + 6;
      }
      case Placement.BOTTOM: {
        return this.el.nativeElement.getBoundingClientRect().top + this.el.nativeElement.offsetHeight + 6;
      }
      default: {
        return this.el.nativeElement.getBoundingClientRect().top + this.el.nativeElement.offsetHeight / 2;
      }
    }
  }

  removePopup(): void {
    if (this.timer) clearTimeout(this.timer);
    if (this.popup) {
      this.popup.remove();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.removePopup();
  }

  @HostListener('click') onClick() {
    this.removePopup();
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
