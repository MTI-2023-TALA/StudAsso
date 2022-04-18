import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTextComponent } from './table-text.component';

describe('TableTextComponent', () => {
  let component: TableTextComponent;
  let fixture: ComponentFixture<TableTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableTextComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
