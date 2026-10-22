import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CABPrintingComponent } from './cabprinting.component';

describe('CABPrintingComponent', () => {
  let component: CABPrintingComponent;
  let fixture: ComponentFixture<CABPrintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CABPrintingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CABPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
