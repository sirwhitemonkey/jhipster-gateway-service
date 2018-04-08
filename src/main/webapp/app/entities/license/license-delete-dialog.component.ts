import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { License } from './license.model';
import { LicensePopupService } from './license-popup.service';
import { LicenseService } from './license.service';

@Component({
    selector: 'jhi-license-delete-dialog',
    templateUrl: './license-delete-dialog.component.html'
})
export class LicenseDeleteDialogComponent {

    license: License;

    constructor(
        private licenseService: LicenseService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.licenseService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'licenseListModification',
                content: 'Deleted an license'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-license-delete-popup',
    template: ''
})
export class LicenseDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private licensePopupService: LicensePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.licensePopupService
                .open(LicenseDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
