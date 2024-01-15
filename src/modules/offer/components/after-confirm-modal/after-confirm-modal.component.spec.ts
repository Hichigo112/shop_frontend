import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterConfirmModalComponent } from './after-confirm-modal.component';

describe('AfterConfirmModalComponent', () => {
  let component: AfterConfirmModalComponent;
  let fixture: ComponentFixture<AfterConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AfterConfirmModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AfterConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
