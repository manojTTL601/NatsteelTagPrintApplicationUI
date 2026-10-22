import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabManualComponent } from './cab-manual.component';

describe('CabManualComponent', () => {
  let component: CabManualComponent;
  let fixture: ComponentFixture<CabManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabManualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
