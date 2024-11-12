import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesSkeletonComponent } from './messages-skeleton.component';

describe('MessagesSkeletonComponent', () => {
  let component: MessagesSkeletonComponent;
  let fixture: ComponentFixture<MessagesSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessagesSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
