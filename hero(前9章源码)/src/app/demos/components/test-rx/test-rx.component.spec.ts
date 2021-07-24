import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRxComponent } from './test-rx.component';

describe('TestRxComponent', () => {
  let component: TestRxComponent;
  let fixture: ComponentFixture<TestRxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestRxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
