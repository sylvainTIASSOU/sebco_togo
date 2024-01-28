export class DevisModel {
    name: string;
    lastName: string;
    email: string;
    phone: number;
    address: string;
    postal: string;
    ville: string;
    societe: string;
    demande: string;
    customer_id: number;

    constructor(
        name: string,
        lastName: string,
        email: string,
        phone: number,
        address: string,
        postal: string,
        ville: string,
        societe: string,
        demande: string,
        customer_id: number,

    ) {
        this.name = name;
        this.customer_id = customer_id;
        this.email = email;
        this.demande = demande;
        this.lastName = lastName;
        this.phone = phone;
        this.address = address;
        this.postal = postal;
        this.ville = ville;
        this.societe = societe;
    }
}