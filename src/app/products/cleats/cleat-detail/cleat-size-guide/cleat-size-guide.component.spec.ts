import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleatSizeGuideComponent } from './cleat-size-guide.component';

describe('CleatSizeGuideComponent', () => {
  let component: CleatSizeGuideComponent;
  let fixture: ComponentFixture<CleatSizeGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleatSizeGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CleatSizeGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
