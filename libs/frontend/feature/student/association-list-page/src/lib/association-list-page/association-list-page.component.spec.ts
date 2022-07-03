import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationListPageComponent } from './association-list-page.component';

describe('AssociationListPageComponent', () => {
  let component: AssociationListPageComponent;
  let fixture: ComponentFixture<AssociationListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssociationListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssociationListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
