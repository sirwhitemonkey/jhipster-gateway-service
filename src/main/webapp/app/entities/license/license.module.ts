import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewayServiceSharedModule } from '../../shared';
import {
    LicenseService,
    LicensePopupService,
    LicenseComponent,
    LicenseDetailComponent,
    LicenseDialogComponent,
    LicensePopupComponent,
    LicenseDeletePopupComponent,
    LicenseDeleteDialogComponent,
    licenseRoute,
    licensePopupRoute,
    LicenseResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...licenseRoute,
    ...licensePopupRoute,
];

@NgModule({
    imports: [
        GatewayServiceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        LicenseComponent,
        LicenseDetailComponent,
        LicenseDialogComponent,
        LicenseDeleteDialogComponent,
        LicensePopupComponent,
        LicenseDeletePopupComponent,
    ],
    entryComponents: [
        LicenseComponent,
        LicenseDialogComponent,
        LicensePopupComponent,
        LicenseDeleteDialogComponent,
        LicenseDeletePopupComponent,
    ],
    providers: [
        LicenseService,
        LicensePopupService,
        LicenseResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayServiceLicenseModule {}
