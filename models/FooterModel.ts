

class FooterModel  {
    from_name: string;
    from_email: string;
    message: string;

    constructor(from_name: string, from_email: string, message: string) {
        this.from_email = from_email;
        this.from_name = from_name;
        this.message = message;
    }
}

export default FooterModel;