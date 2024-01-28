export class CommentModel {
    content: string;
    rating: number;
    customer_id: number;

    constructor(
        content: string,
        rating: number,
        customer_id: number,
    ) {
        this.content = content;
        this.rating = rating;
        this.customer_id = customer_id;
    }
}