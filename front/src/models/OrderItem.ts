export class OrderItem {
  constructor(
    public id: number = 0,
    public product_name: string = '',
    public price: number = 0,
    public quantity: number = 0
  ) {}
}
