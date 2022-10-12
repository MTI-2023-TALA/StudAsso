import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationPageComponent } from './association-page.component';

describe('AssociationPageComponent', () => {
  let component: AssociationPageComponent;
  let fixture: ComponentFixture<AssociationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssociationPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssociationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
