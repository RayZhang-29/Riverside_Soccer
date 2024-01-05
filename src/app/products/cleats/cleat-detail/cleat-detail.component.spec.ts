import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleatDetailComponent } from './cleat-detail.component';

describe('CleatDetailComponent', () => {
  let component: CleatDetailComponent;
  let fixture: ComponentFixture<CleatDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleatDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CleatDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
