/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayServiceTestModule } from '../../../test.module';
import { PlanDetailComponent } from '../../../../../../main/webapp/app/entities/plan/plan-detail.component';
import { PlanService } from '../../../../../../main/webapp/app/entities/plan/plan.service';
import { Plan } from '../../../../../../main/webapp/app/entities/plan/plan.model';

describe('Component Tests', () => {

    describe('Plan Management Detail Component', () => {
        let comp: PlanDetailComponent;
        let fixture: ComponentFixture<PlanDetailComponent>;
        let service: PlanService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GatewayServiceTestModule],
                declarations: [PlanDetailComponent],
                providers: [
                    PlanService
                ]
            })
            .overrideTemplate(PlanDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PlanDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PlanService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Plan(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.plan).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
