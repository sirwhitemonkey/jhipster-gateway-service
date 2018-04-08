import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayServiceSharedModule } from '../../shared';
import {
    BillingService,
    BillingPopupService,
    BillingComponent,
    BillingDetailComponent,
    BillingDialogComponent,
    BillingPopupComponent,
    BillingDeletePopupComponent,
    BillingDeleteDialogComponent,
    billingRoute,
    billingPopupRoute,
    BillingResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...billingRoute,
    ...billingPopupRoute,
];

@NgModule({
    imports: [
        GatewayServiceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BillingComponent,
        BillingDetailComponent,
        BillingDialogComponent,
        BillingDeleteDialogComponent,
        BillingPopupComponent,
        BillingDeletePopupComponent,
    ],
    entryComponents: [
        BillingComponent,
        BillingDialogComponent,
        BillingPopupComponent,
        BillingDeleteDialogComponent,
        BillingDeletePopupComponent,
    ],
    providers: [
        BillingService,
        BillingPopupService,
        BillingResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayServiceBillingModule {}
