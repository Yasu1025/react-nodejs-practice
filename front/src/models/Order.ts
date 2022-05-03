import { OrderItem } from './OrderItem'
export class Order {
  constructor(
    public id: number = 0,
    public name: string = '',
    public email: string = '',
    public totalPrice: number = 0,
    public order_items: OrderItem[]
  ) {}
}
