export class User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    date?: {
        created: number;
        updated?: number;
    }
}
