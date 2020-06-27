import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NullCompComponent } from './null-comp.component';

describe('NullCompComponent', () => {
  let component: NullCompComponent;
  let fixture: ComponentFixture<NullCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NullCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NullCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
