
export class OrderModel {
    id?: number;
    status: string;
    custome_id: number;
    quantity: number;
    price: number;
    city: string;
    quarter: string;
    deliveryDate: string;
    indiqueName: string;
    indiqueNumber: number;
    deliveryHours?: string;
    utility?: string;
    codePromo?: string;
    laltitude?: string;
    longitude?: string;
    constructor(
        status: string,
        custome_id: number,
        quantity: number,
        price: number,
        city: string,
        quarter: string,

        deliveryDate: string,
        indiqueName: string,
        indiqueNumber: number,
        deliveryHours: string,
        utility?: string,
        laltitude?: string,
        longitude?: string,
        codePromo?: string,
        id?: number,
    ) {
        this.status = status;
        this.quantity =  quantity;
        this.codePromo = codePromo;
        this.deliveryDate = deliveryDate;
        this.custome_id = custome_id;
        this.city = city;
        this.indiqueName = indiqueName;
        this.indiqueNumber = indiqueNumber;
        this.price = price;
        this.quarter = quarter;
        this.laltitude = laltitude;
        this.longitude = longitude;
        this.deliveryHours = deliveryHours;
        this.utility = utility;
        this.id = id;

    }
}