import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Billing } from './billing.model';
import { Plan } from '.././plan';
import { BillingPopupService } from './billing-popup.service';
import { BillingService } from './billing.service';
import { Customer, CustomerService } from '.././customer';
import { License, LicenseService } from '.././license';

@Component({
    selector: 'jhi-billing-dialog',
    templateUrl: './billing-dialog.component.html'
})
export class BillingDialogComponent implements OnInit {

    billing: Billing;
    isSaving: boolean;
    billingDateDp: any;
    customers: Customer[];
    licenses: Map<number, License> = new Map<number, License>();

    constructor(
        public activeModal: NgbActiveModal,
        private billingService: BillingService,
        private licenseService: LicenseService,
        private customerService: CustomerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        // test
        this.billing.quantity = 100;
        this.customerService.query()
            .subscribe((res: HttpResponse<Customer[]>) => { this.customers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.billing.id !== undefined) {
            this.subscribeToSaveResponse(
                this.billingService.update(this.billing));
        } else {
            this.subscribeToSaveResponse(
                this.billingService.create(this.billing));
        }
    }

    identify(index, item) {
        return index;
    }

    mapLicense(customerId: number) {
        const customer = this.customers.filter((obj) => (obj.id === customerId))[0];

        if (this.licenses.get(customer.licenseid) == null) {
            this.licenseService.find(customer.licenseid)
                .subscribe((res: HttpResponse<License>) => {
                    const license = res.body;
                    this.licenses.set(customer.licenseid, license);
                    let plan: Plan;
                    plan = license.plan;
                    this.billing.billingAmount = this.billing.quantity * plan.basePrice;
                    this.billing.billingAmount -= this.billing.billingAmount * (plan.discount / 100);

                }, (res: HttpErrorResponse) => this.onError(res.message));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Billing>>) {
        result.subscribe((res: HttpResponse<Billing>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Billing) {
        this.eventManager.broadcast({ name: 'billingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-billing-popup',
    template: ''
})
export class BillingPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private billingPopupService: BillingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.billingPopupService
                    .open(BillingDialogComponent as Component, params['id']);
            } else {
                this.billingPopupService
                    .open(BillingDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
