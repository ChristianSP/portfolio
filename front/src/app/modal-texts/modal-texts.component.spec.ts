import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTextsComponent } from './modal-texts.component';

describe('ModalTextsComponent', () => {
  let component: ModalTextsComponent;
  let fixture: ComponentFixture<ModalTextsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTextsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTextsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
