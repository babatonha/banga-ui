/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyOffersComponent } from './my-offers.component';

describe('MyOffersComponent', () => {
  let component: MyOffersComponent;
  let fixture: ComponentFixture<MyOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
