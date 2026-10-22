import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeshManualTagComponent } from './mesh-manual-tag.component';

describe('MeshManualTagComponent', () => {
  let component: MeshManualTagComponent;
  let fixture: ComponentFixture<MeshManualTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeshManualTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeshManualTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
