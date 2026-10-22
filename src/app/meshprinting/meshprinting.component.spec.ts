import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeshprintingComponent } from './meshprinting.component';

describe('MeshprintingComponent', () => {
  let component: MeshprintingComponent;
  let fixture: ComponentFixture<MeshprintingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeshprintingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeshprintingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
