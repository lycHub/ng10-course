import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineCompComponent } from './inline-comp.component';

describe('InlineCompComponent', () => {
  let component: InlineCompComponent;
  let fixture: ComponentFixture<InlineCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InlineCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
