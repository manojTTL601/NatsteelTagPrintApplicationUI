import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BCPTagPrintingComponent } from './bcptag-printing.component';

describe('BCPTagPrintingComponent', () => {
  let component: BCPTagPrintingComponent;
  let fixture: ComponentFixture<BCPTagPrintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BCPTagPrintingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BCPTagPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
