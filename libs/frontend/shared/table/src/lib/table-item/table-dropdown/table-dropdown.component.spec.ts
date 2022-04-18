import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDropdownComponent } from './table-dropdown.component';

describe('TableDropdownComponent', () => {
  let component: TableDropdownComponent;
  let fixture: ComponentFixture<TableDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableDropdownComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
