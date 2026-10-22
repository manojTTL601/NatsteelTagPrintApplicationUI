import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PRCTagPrintingComponent } from './prctag-printing.component';

describe('PRCTagPrintingComponent', () => {
  let component: PRCTagPrintingComponent;
  let fixture: ComponentFixture<PRCTagPrintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PRCTagPrintingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PRCTagPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
