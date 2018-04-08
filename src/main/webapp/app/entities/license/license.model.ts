import { BaseEntity } from './../../shared';

export class License implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public plan?: BaseEntity,
    ) {
    }
}
