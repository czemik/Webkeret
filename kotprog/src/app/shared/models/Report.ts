import { Image } from './Image';
export interface Report {
    id: string,
    amount: number,
    uid: string,
    year: number,
    month: number,
    image: Image,
}