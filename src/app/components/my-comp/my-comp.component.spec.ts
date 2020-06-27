import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCompComponent } from './my-comp.component';

describe('MyCompComponent', () => {
  let component: MyCompComponent;
  let fixture: ComponentFixture<MyCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
