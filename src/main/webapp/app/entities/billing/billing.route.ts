import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BillingComponent } from './billing.component';
import { BillingDetailComponent } from './billing-detail.component';
import { BillingPopupComponent } from './billing-dialog.component';
import { BillingDeletePopupComponent } from './billing-delete-dialog.component';

@Injectable()
export class BillingResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const billingRoute: Routes = [
    {
        path: 'billing',
        component: BillingComponent,
        resolve: {
            'pagingParams': BillingResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Billings'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'billing/:id',
        component: BillingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Billings'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const billingPopupRoute: Routes = [
    {
        path: 'billing-new',
        component: BillingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Billings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'billing/:id/edit',
        component: BillingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Billings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'billing/:id/delete',
        component: BillingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Billings'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
