import { User, UserService } from "@nest-api-onet/user";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { config } from "convict.config";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from "../dtos";
import { AuthUser } from "../entities";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('jwt.secret'),
        });
    }

    async validate({_id, email}: JwtPayload): Promise<AuthUser> {
        const user = await this.userService.findOne({ _id, email });

        return new AuthUser(user);
    }
}