export class OrderItem {
    id?: number;
    quantity: number;
    product_id: number;
    order_id: number;
    constructor(
        quantity: number,
        product_id: number,
        order_id: number,
        id?: number,
    ) {
        this.order_id = order_id;
        this.product_id = product_id;
        this.quantity = quantity;
        this.id = id;
    }
}