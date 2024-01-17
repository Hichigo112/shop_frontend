import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmOfferModalComponent } from './confirm-offer-modal.component';

describe('ConfirmOfferModalComponent', () => {
  let component: ConfirmOfferModalComponent;
  let fixture: ComponentFixture<ConfirmOfferModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmOfferModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmOfferModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
