import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleRouterOutletComponent } from './simple-router-outlet.component';

describe('SimpleRouterOutletComponent', () => {
  let component: SimpleRouterOutletComponent;
  let fixture: ComponentFixture<SimpleRouterOutletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpleRouterOutletComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleRouterOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
