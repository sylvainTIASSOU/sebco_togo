export class UserModel {
    customer_id?: number;
    phone?: number;
    password?: string;
    role?: string;
    id?: number;

    constructor(
        customer_id?: number,
        phone?: number,
        password?: string,
        role?: string,
        id?: number,
    ) {
        this.customer_id = customer_id
        this.phone = phone
        this.password = password
        this.role = role
        this.id = id
    }
}