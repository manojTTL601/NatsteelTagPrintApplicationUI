import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportTagComponent } from './export-tag.component';

describe('ExportTagComponent', () => {
  let component: ExportTagComponent;
  let fixture: ComponentFixture<ExportTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
