import { Moment } from "moment";

export interface Transaction { 
    id: number, 
    name: string,
    date: number,
    amount: number,
    categoryId: number,
}