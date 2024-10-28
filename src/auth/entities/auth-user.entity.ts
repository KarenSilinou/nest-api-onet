import { User } from "@nest-api-onet/user";

export class AuthUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    date?: {
        created: number;
        updated?: number;
    }

    constructor(partial: Partial<User>) {
        if ('password' in partial) delete partial.password;

        Object.assign(this, partial);
    }
}