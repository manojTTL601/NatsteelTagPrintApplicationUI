import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BPCTagPrintingComponent } from './bpctag-printing.component';

describe('BPCTagPrintingComponent', () => {
  let component: BPCTagPrintingComponent;
  let fixture: ComponentFixture<BPCTagPrintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BPCTagPrintingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BPCTagPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
