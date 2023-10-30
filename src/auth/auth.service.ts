import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateUsername } from 'unique-username-generator';
import { AuthType } from './auth.type';

@Injectable()
export class AuthService {
    constructor(
        private database: PrismaService,
        private jwtService: JwtService
    ) { }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.database.user.findFirst({ where: { username } });
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        const payload: AuthType = { admin: false, sub: user.id, username: user.username };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async signUp(name: string) {
        const username = generateUsername('', 0, 25);
        const password = Math.round((Math.random() * 99999) + 100000).toString();

        return await this.database.user.create({
            data: { name, username, password },
            select: { username: true, password: true }
        });
    }
}