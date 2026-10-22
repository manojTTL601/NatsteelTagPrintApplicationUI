import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CARPETTagPrintingComponent } from './carpettag-printing.component';

describe('CARPETTagPrintingComponent', () => {
  let component: CARPETTagPrintingComponent;
  let fixture: ComponentFixture<CARPETTagPrintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CARPETTagPrintingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CARPETTagPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
