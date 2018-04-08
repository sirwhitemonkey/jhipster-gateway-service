import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Plan } from './plan.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Plan>;

@Injectable()
export class PlanService {

    private resourceUrl =  SERVER_API_URL + 'licenseservice/api/plans';

    constructor(private http: HttpClient) { }

    create(plan: Plan): Observable<EntityResponseType> {
        const copy = this.convert(plan);
        return this.http.post<Plan>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(plan: Plan): Observable<EntityResponseType> {
        const copy = this.convert(plan);
        return this.http.put<Plan>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Plan>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Plan[]>> {
        const options = createRequestOption(req);
        return this.http.get<Plan[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Plan[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Plan = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Plan[]>): HttpResponse<Plan[]> {
        const jsonResponse: Plan[] = res.body;
        const body: Plan[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Plan.
     */
    private convertItemFromServer(plan: Plan): Plan {
        const copy: Plan = Object.assign({}, plan);
        return copy;
    }

    /**
     * Convert a Plan to a JSON which can be sent to the server.
     */
    private convert(plan: Plan): Plan {
        const copy: Plan = Object.assign({}, plan);
        return copy;
    }
}
