import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleatFilterComponent } from './cleat-filter.component';

describe('CleatFilterComponent', () => {
  let component: CleatFilterComponent;
  let fixture: ComponentFixture<CleatFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleatFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CleatFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
