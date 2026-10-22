import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplemeshtaggenerationComponent } from './samplemeshtaggeneration.component';

describe('SamplemeshtaggenerationComponent', () => {
  let component: SamplemeshtaggenerationComponent;
  let fixture: ComponentFixture<SamplemeshtaggenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SamplemeshtaggenerationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SamplemeshtaggenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
