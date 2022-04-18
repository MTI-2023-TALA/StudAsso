import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataViewComponent } from './table-data-view.component';

describe('TableDataViewComponent', () => {
  let component: TableDataViewComponent;
  let fixture: ComponentFixture<TableDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableDataViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
