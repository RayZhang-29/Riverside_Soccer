import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleatAddComponent } from './cleat-add.component';

describe('CleatAddComponent', () => {
  let component: CleatAddComponent;
  let fixture: ComponentFixture<CleatAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleatAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CleatAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
