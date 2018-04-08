/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayServiceTestModule } from '../../../test.module';
import { PlanComponent } from '../../../../../../main/webapp/app/entities/plan/plan.component';
import { PlanService } from '../../../../../../main/webapp/app/entities/plan/plan.service';
import { Plan } from '../../../../../../main/webapp/app/entities/plan/plan.model';

describe('Component Tests', () => {

    describe('Plan Management Component', () => {
        let comp: PlanComponent;
        let fixture: ComponentFixture<PlanComponent>;
        let service: PlanService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayServiceTestModule],
                declarations: [PlanComponent],
                providers: [
                    PlanService
                ]
            })
            .overrideTemplate(PlanComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlanComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlanService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Plan(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.plans[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
