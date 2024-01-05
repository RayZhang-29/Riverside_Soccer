import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JerseyFilterComponent } from './jersey-filter.component';

describe('JerseyFilterComponent', () => {
  let component: JerseyFilterComponent;
  let fixture: ComponentFixture<JerseyFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JerseyFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JerseyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
