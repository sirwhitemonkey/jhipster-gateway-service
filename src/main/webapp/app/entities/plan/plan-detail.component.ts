import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Plan } from './plan.model';
import { PlanService } from './plan.service';

@Component({
    selector: 'jhi-plan-detail',
    templateUrl: './plan-detail.component.html'
})
export class PlanDetailComponent implements OnInit, OnDestroy {

    plan: Plan;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private planService: PlanService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPlans();
    }

    load(id) {
        this.planService.find(id)
            .subscribe((planResponse: HttpResponse<Plan>) => {
                this.plan = planResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPlans() {
        this.eventSubscriber = this.eventManager.subscribe(
            'planListModification',
            (response) => this.load(this.plan.id)
        );
    }
}
