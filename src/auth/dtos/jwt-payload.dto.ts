export class JwtPayload {
    _id: string;
    email: string;
    iat?: number;
    exp?: number;
}