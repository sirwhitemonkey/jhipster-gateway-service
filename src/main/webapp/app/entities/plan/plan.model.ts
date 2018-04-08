import { BaseEntity } from './../../shared';

export class Plan implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public basePrice?: number,
        public discount?: number,
        public licenses?: BaseEntity[],
    ) {
    }
}
