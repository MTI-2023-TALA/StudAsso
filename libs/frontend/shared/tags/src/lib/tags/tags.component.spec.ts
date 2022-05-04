import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TagsComponent } from './tags.component';
import { TagsType } from './tags.model';

describe('TagsComponent', () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Html elements', () => {
    it('should have a class tags-error when creating a toast with TagsType.Error', () => {
      component.type = TagsType.Error;
      fixture.detectChanges();
      expect(de.query(By.css('.tags-error'))).toBeTruthy();
    });

    it('should have a class tags-success when creating a toast with TagsType.Success', () => {
      component.type = TagsType.Success;
      fixture.detectChanges();
      expect(de.query(By.css('.tags-success'))).toBeTruthy();
    });

    it('should have a class tags-warning when creating a toast with TagsType.Warning', () => {
      component.type = TagsType.Warning;
      fixture.detectChanges();
      expect(de.query(By.css('.tags-warning'))).toBeTruthy();
    });

    it('should have a class tags-information when creating a toast with TagsType.Information', () => {
      component.type = TagsType.Information;
      fixture.detectChanges();
      expect(de.query(By.css('.tags-information'))).toBeTruthy();
    });
  });
});
