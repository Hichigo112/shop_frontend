import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsModalFormComponent } from './brands-modal-form.component';

describe('BrandsModalFormComponent', () => {
  let component: BrandsModalFormComponent;
  let fixture: ComponentFixture<BrandsModalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsModalFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrandsModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
