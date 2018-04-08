import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PlanComponent } from './plan.component';
import { PlanDetailComponent } from './plan-detail.component';
import { PlanPopupComponent } from './plan-dialog.component';
import { PlanDeletePopupComponent } from './plan-delete-dialog.component';

@Injectable()
export class PlanResolvePagingParams implements Resolve<any> {

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

export const planRoute: Routes = [
    {
        path: 'plan',
        component: PlanComponent,
        resolve: {
            'pagingParams': PlanResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plans'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'plan/:id',
        component: PlanDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plans'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const planPopupRoute: Routes = [
    {
        path: 'plan-new',
        component: PlanPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plans'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'plan/:id/edit',
        component: PlanPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plans'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'plan/:id/delete',
        component: PlanDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Plans'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
