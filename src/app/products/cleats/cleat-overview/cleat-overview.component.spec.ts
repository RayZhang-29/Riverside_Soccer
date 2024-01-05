import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleatOverviewComponent } from './cleat-overview.component';

describe('CleatOverviewComponent', () => {
  let component: CleatOverviewComponent;
  let fixture: ComponentFixture<CleatOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleatOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CleatOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
