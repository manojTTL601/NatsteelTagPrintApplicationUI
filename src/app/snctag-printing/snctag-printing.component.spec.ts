import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SNCTagPrintingComponent } from './snctag-printing.component';

describe('SNCTagPrintingComponent', () => {
  let component: SNCTagPrintingComponent;
  let fixture: ComponentFixture<SNCTagPrintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SNCTagPrintingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SNCTagPrintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
