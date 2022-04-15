import { Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';

@Directive({
  selector: '[studAssoTooltip]',
})
export class TooltipDirective implements OnDestroy {
  @Input() studAssoTooltip = '';
  @Input() delay? = 190;

  private popup: HTMLDivElement;
  private timer: NodeJS.Timeout;

  constructor(private el: ElementRef) {}

  ngOnDestroy(): void {
    if (this.popup) this.popup.remove();
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.timer = setTimeout(() => {
      const x = this.el.nativeElement.getBoundingClientRect().left + this.el.nativeElement.offsetWidth / 2; // Get the middle of the element
      const y = this.el.nativeElement.getBoundingClientRect().top + this.el.nativeElement.offsetHeight + 6; // Get the bottom of the element, plus a little extra
      this.createTooltipPopup(x, y);
    }, this.delay);
  }

  @HostListener('mouseleave') onMouseLeave() {
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
  }
}
