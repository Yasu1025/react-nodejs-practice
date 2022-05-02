import { Role } from './Role'
export class Product {
  constructor(
    public id: number = 0,
    public name: string = '',
    public description: string = '',
    public image: string = '',
    public price: number = 0
  ) {}
}
