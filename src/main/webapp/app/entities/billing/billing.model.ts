import { BaseEntity } from './../../shared';

export class Billing implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public customerId?: number,
        public billingDate?: any,
        public quantity?: number,
        public billingAmount?: number,
    ) {
    }
}
