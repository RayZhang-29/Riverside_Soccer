import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JerseyOverviewComponent } from './jersey-overview.component';

describe('JerseyOverviewComponent', () => {
  let component: JerseyOverviewComponent;
  let fixture: ComponentFixture<JerseyOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JerseyOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JerseyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
