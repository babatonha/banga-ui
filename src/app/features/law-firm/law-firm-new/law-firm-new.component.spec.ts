/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LawFirmNewComponent } from './law-firm-new.component';

describe('LawFirmNewComponent', () => {
  let component: LawFirmNewComponent;
  let fixture: ComponentFixture<LawFirmNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawFirmNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawFirmNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
