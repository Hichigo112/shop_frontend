import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocodeModalFormComponent } from './promocode-modal-form.component';

describe('PromocodeModalFormComponent', () => {
  let component: PromocodeModalFormComponent;
  let fixture: ComponentFixture<PromocodeModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromocodeModalFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromocodeModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
