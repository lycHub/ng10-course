import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSelectorCompComponent } from './custom-selector-comp.component';

describe('CustomSelectorCompComponent', () => {
  let component: CustomSelectorCompComponent;
  let fixture: ComponentFixture<CustomSelectorCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomSelectorCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomSelectorCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
