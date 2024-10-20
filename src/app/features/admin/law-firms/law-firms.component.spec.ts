/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LawFirmsComponent } from './law-firms.component';

describe('LawFirmsComponent', () => {
  let component: LawFirmsComponent;
  let fixture: ComponentFixture<LawFirmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LawFirmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LawFirmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
