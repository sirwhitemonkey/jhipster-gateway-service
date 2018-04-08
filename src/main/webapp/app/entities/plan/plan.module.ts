import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayServiceSharedModule } from '../../shared';
import {
    PlanService,
    PlanPopupService,
    PlanComponent,
    PlanDetailComponent,
    PlanDialogComponent,
    PlanPopupComponent,
    PlanDeletePopupComponent,
    PlanDeleteDialogComponent,
    planRoute,
    planPopupRoute,
    PlanResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...planRoute,
    ...planPopupRoute,
];

@NgModule({
    imports: [
        GatewayServiceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PlanComponent,
        PlanDetailComponent,
        PlanDialogComponent,
        PlanDeleteDialogComponent,
        PlanPopupComponent,
        PlanDeletePopupComponent,
    ],
    entryComponents: [
        PlanComponent,
        PlanDialogComponent,
        PlanPopupComponent,
        PlanDeleteDialogComponent,
        PlanDeletePopupComponent,
    ],
    providers: [
        PlanService,
        PlanPopupService,
        PlanResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayServicePlanModule {}
