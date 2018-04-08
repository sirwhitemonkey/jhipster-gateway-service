/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayServiceTestModule } from '../../../test.module';
import { LicenseDetailComponent } from '../../../../../../main/webapp/app/entities/license/license-detail.component';
import { LicenseService } from '../../../../../../main/webapp/app/entities/license/license.service';
import { License } from '../../../../../../main/webapp/app/entities/license/license.model';

describe('Component Tests', () => {

    describe('License Management Detail Component', () => {
        let comp: LicenseDetailComponent;
        let fixture: ComponentFixture<LicenseDetailComponent>;
        let service: LicenseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayServiceTestModule],
                declarations: [LicenseDetailComponent],
                providers: [
                    LicenseService
                ]
            })
            .overrideTemplate(LicenseDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LicenseDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LicenseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new License(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.license).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
