import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Plan } from './plan.model';
import { PlanPopupService } from './plan-popup.service';
import { PlanService } from './plan.service';

@Component({
    selector: 'jhi-plan-dialog',
    templateUrl: './plan-dialog.component.html'
})
export class PlanDialogComponent implements OnInit {

    plan: Plan;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private planService: PlanService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.plan.id !== undefined) {
            this.subscribeToSaveResponse(
                this.planService.update(this.plan));
        } else {
            this.subscribeToSaveResponse(
                this.planService.create(this.plan));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Plan>>) {
        result.subscribe((res: HttpResponse<Plan>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Plan) {
        this.eventManager.broadcast({ name: 'planListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-plan-popup',
    template: ''
})
export class PlanPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private planPopupService: PlanPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.planPopupService
                    .open(PlanDialogComponent as Component, params['id']);
            } else {
                this.planPopupService
                    .open(PlanDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
