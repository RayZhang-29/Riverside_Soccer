import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JerseyAddComponent } from './jersey-add.component';

describe('JerseyAddComponent', () => {
  let component: JerseyAddComponent;
  let fixture: ComponentFixture<JerseyAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JerseyAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JerseyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
