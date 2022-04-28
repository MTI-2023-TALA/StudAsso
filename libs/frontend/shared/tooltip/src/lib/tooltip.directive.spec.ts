import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { DebugElement } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';

@Component({
  template: ` <h2 [studAssoTooltip]="'simple tooltip'">The simplest</h2>
    <h2 [studAssoTooltip]="'left tooltip'" placement="left">The lefty</h2>
    <h2 [studAssoTooltip]="'right tooltip'" placement="right">The lefty</h2>
    <h2 [studAssoTooltip]="'bottom tooltip'" placement="bottom">The lefty</h2>
    <h2 [studAssoTooltip]="'long tooltip'" delay="300">The longy</h2>`,
})
class TestComponent {}

describe('Tootltip Test', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let des: DebugElement[];
  let elements: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TooltipDirective, TestComponent],
    }).createComponent(TestComponent);

    fixture.detectChanges(); // initial binding
    component = fixture.componentInstance;

    des = fixture.debugElement.queryAll(By.directive(TooltipDirective));
    elements = fixture.debugElement.queryAll(By.css('h2'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all tooltiped elements', () => {
    expect(des.length).toBe(5);
  });

  it('should set first tooltip text', () => {
    const tooltip = des[0].injector.get(TooltipDirective) as TooltipDirective;
    expect(tooltip.studAssoTooltip).toBe('simple tooltip');
    expect(tooltip.delay).toBe(190);
    expect(tooltip.placement).toBeUndefined();
  });

  it('should set left tooltip text and placement', () => {
    const tooltip = des[1].injector.get(TooltipDirective) as TooltipDirective;
    const element = elements[1].nativeElement;
    expect(tooltip.studAssoTooltip).toBe('left tooltip');
    expect(tooltip.placement).toBe('left');
    expect(tooltip.delay).toBe(190);
    expect(tooltip.getXPosition()).toBeLessThanOrEqual(element.getBoundingClientRect().left);
  });

  it('should set right tooltip text and placement', () => {
    const tooltip = des[2].injector.get(TooltipDirective) as TooltipDirective;
    const element = elements[2].nativeElement;
    expect(tooltip.studAssoTooltip).toBe('right tooltip');
    expect(tooltip.placement).toBe('right');
    expect(tooltip.delay).toBe(190);
    expect(tooltip.getXPosition()).toBeGreaterThanOrEqual(element.getBoundingClientRect().right);
  });

  it('should set bottom tooltip text and placement', () => {
    const tooltip = des[3].injector.get(TooltipDirective) as TooltipDirective;
    const element = elements[3].nativeElement;
    expect(tooltip.studAssoTooltip).toBe('bottom tooltip');
    expect(tooltip.placement).toBe('bottom');
    expect(tooltip.delay).toBe(190);
    expect(tooltip.getYPosition()).toBeGreaterThanOrEqual(element.getBoundingClientRect().top);
  });

  it('should set long tooltip text and delay', () => {
    const tooltip = des[4].injector.get(TooltipDirective) as TooltipDirective;
    expect(tooltip.studAssoTooltip).toBe('long tooltip');
    expect(tooltip.delay).toBe('300');
    expect(tooltip.placement).toBeUndefined();
  });
});
