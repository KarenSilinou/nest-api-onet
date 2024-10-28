import { User, UserRepository } from '@nest-api-onet/user';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtPayload, LoginDto } from './dtos';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { config } from 'convict.config';
import { AuthUser } from './entities';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ){}

    async login({email, password}: LoginDto) {
        const user = await this.userRepository.getUser({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new NotFoundException('Invalid credentials');
        }

        const authUser = new AuthUser(user);
        return {
            ...authUser,
            accessToken: this.generateToken({_id: user._id, email: user.email})
        }
    }

    private generateToken(payload: JwtPayload, expirationTime = config.get('jwt.expiration')): string {
        return this.jwtService.sign({ _id: payload._id, email: payload.email }, {
            expiresIn: expirationTime,
            secret: config.get('jwt.secret')
        });
    }
}
