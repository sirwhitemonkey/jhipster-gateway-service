/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayServiceTestModule } from '../../../test.module';
import { LicenseComponent } from '../../../../../../main/webapp/app/entities/license/license.component';
import { LicenseService } from '../../../../../../main/webapp/app/entities/license/license.service';
import { License } from '../../../../../../main/webapp/app/entities/license/license.model';

describe('Component Tests', () => {

    describe('License Management Component', () => {
        let comp: LicenseComponent;
        let fixture: ComponentFixture<LicenseComponent>;
        let service: LicenseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayServiceTestModule],
                declarations: [LicenseComponent],
                providers: [
                    LicenseService
                ]
            })
            .overrideTemplate(LicenseComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LicenseComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LicenseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new License(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.licenses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
