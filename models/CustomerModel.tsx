class CustomerModel {
    firstName?: string;
    lastName?: string;
    email?: string;
    type?: string;
    society?: string;
    id?: number;

    constructor(
        firstName?: string,
        lastName?: string,
        email?: string,
        type?: string,
        society?: string,
        id?: number,
    ) {
        this.firstName = firstName;
        this.email = email;
        this.lastName = lastName;
        this.type = type;
        this.society = society;
        this.id = id;
    }
}
export default CustomerModel