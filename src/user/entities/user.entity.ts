import { Exclude } from "class-transformer";
import { ObjectId } from "mongodb";

export class User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;

    @Exclude()
    password: string;

    phone: string;
    date?: {
        created: number;
        updated?: number;
    }

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
