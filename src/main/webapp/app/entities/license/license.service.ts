import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { License } from './license.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<License>;

@Injectable()
export class LicenseService {

    private resourceUrl =  SERVER_API_URL + 'licenseservice/api/licenses';

    constructor(private http: HttpClient) { }

    create(license: License): Observable<EntityResponseType> {
        const copy = this.convert(license);
        return this.http.post<License>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(license: License): Observable<EntityResponseType> {
        const copy = this.convert(license);
        return this.http.put<License>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<License>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<License[]>> {
        const options = createRequestOption(req);
        return this.http.get<License[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<License[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: License = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<License[]>): HttpResponse<License[]> {
        const jsonResponse: License[] = res.body;
        const body: License[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to License.
     */
    private convertItemFromServer(license: License): License {
        const copy: License = Object.assign({}, license);
        return copy;
    }

    /**
     * Convert a License to a JSON which can be sent to the server.
     */
    private convert(license: License): License {
        const copy: License = Object.assign({}, license);
        return copy;
    }
}
