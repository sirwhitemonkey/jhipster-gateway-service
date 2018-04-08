import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { License } from './license.model';
import { LicensePopupService } from './license-popup.service';
import { LicenseService } from './license.service';
import { Plan, PlanService } from '../plan';

@Component({
    selector: 'jhi-license-dialog',
    templateUrl: './license-dialog.component.html'
})
export class LicenseDialogComponent implements OnInit {

    license: License;
    isSaving: boolean;

    plans: Plan[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private licenseService: LicenseService,
        private planService: PlanService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.planService.query()
            .subscribe((res: HttpResponse<Plan[]>) => { this.plans = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    identify(index, item) {
        return index;
    }
    save() {
        this.isSaving = true;
        if (this.license.id !== undefined) {
            this.subscribeToSaveResponse(
                this.licenseService.update(this.license));
        } else {
            this.subscribeToSaveResponse(
                this.licenseService.create(this.license));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<License>>) {
        result.subscribe((res: HttpResponse<License>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: License) {
        this.eventManager.broadcast({ name: 'licenseListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPlanById(index: number, item: Plan) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-license-popup',
    template: ''
})
export class LicensePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private licensePopupService: LicensePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.licensePopupService
                    .open(LicenseDialogComponent as Component, params['id']);
            } else {
                this.licensePopupService
                    .open(LicenseDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
