import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComKlarnaComponent } from './checkout-com-klarna.component';
import { of } from 'rxjs';
import { PaymentType } from '../../../../core/model/ApmData';
import createSpy = jasmine.createSpy;
import { CheckoutComApmService } from '../../../../core/services/checkout-com-apm.service';
import { GlobalMessageService, I18nTestingModule, CheckoutDeliveryService } from '@spartacus/core';
import { CheckoutComPaymentService } from '../../../../core/services/checkout-com-payment.service';

const apm = {code: PaymentType.Klarna};

class CheckoutComApmServiceStub {
  getSelectedApmFromState = createSpy('getSelectedApmFromState').and.returnValue(of(apm));
  selectApm = createSpy('selectApm').and.stub();
  getKlarnaInitParams = createSpy('getKlarnaInitParams').and.returnValue(of({}));
}

class MockCheckoutComStore {}

class MockGlobalMessageService {
  add = createSpy();
}

class MockCheckoutDeliveryService {
  getDeliveryAddress() {
    return of({country: 'ES'});
  }
}

class CheckoutComPaymentStub {
  setPaymentAddress = createSpy('setPaymentAddress').and.stub();
  getPaymentAddressFromState = createSpy('getPaymentAddressFromState').and.returnValue(of({}));
}

describe('CheckoutComKlarnaComponent', () => {
  let component: CheckoutComKlarnaComponent;
  let fixture: ComponentFixture<CheckoutComKlarnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckoutComKlarnaComponent],
      imports: [I18nTestingModule],
      providers: [
        {provide: CheckoutComApmService, useClass: CheckoutComApmServiceStub},
        {provide: GlobalMessageService, useClass: MockGlobalMessageService},
        {provide: CheckoutComPaymentService, useClass: CheckoutComPaymentStub},
        {provide: CheckoutDeliveryService, useClass: MockCheckoutDeliveryService},
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComKlarnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
