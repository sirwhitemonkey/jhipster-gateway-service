import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatewayServiceCustomerModule } from './customer/customer.module';
import { GatewayServiceLicenseModule } from './license/license.module';
import { GatewayServicePlanModule } from './plan/plan.module';
import { GatewayServiceBillingModule } from './billing/billing.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatewayServiceCustomerModule,
        GatewayServiceLicenseModule,
        GatewayServicePlanModule,
        GatewayServiceBillingModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayServiceEntityModule {}
