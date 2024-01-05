import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleatsComponent } from './cleats.component';

describe('CleatsComponent', () => {
  let component: CleatsComponent;
  let fixture: ComponentFixture<CleatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CleatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
