import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JerseySizeGuideComponent } from './jersey-size-guide.component';

describe('JerseySizeGuideComponent', () => {
  let component: JerseySizeGuideComponent;
  let fixture: ComponentFixture<JerseySizeGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JerseySizeGuideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JerseySizeGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
