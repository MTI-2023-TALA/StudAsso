import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TagComponent } from './tag.component';
import { TagType } from './tag.model';

describe('TagComponent', () => {
  let component: TagComponent;
  let fixture: ComponentFixture<TagComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Html elements', () => {
    it('should have a class tag-error when creating a toast with TagType.Error', () => {
      component.type = TagType.Error;
      fixture.detectChanges();
      expect(de.query(By.css('.tag-error'))).toBeTruthy();
    });

    it('should have a class tag-success when creating a toast with TagType.Success', () => {
      component.type = TagType.Success;
      fixture.detectChanges();
      expect(de.query(By.css('.tag-success'))).toBeTruthy();
    });

    it('should have a class tag-warning when creating a toast with TagType.Warning', () => {
      component.type = TagType.Warning;
      fixture.detectChanges();
      expect(de.query(By.css('.tag-warning'))).toBeTruthy();
    });

    it('should have a class tag-information when creating a toast with TagType.Information', () => {
      component.type = TagType.Information;
      fixture.detectChanges();
      expect(de.query(By.css('.tag-information'))).toBeTruthy();
    });
  });
});
