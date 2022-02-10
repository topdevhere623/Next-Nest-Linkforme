
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth/auth.service';
import { cookieExtractor } from './auth/strategies/jwt.strategy';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        private readonly authService: AuthService,
    ) {}
    async use(req: Request, res: Response, next: NextFunction) {
        const token = cookieExtractor(req);

        if(token){
            const user = await this.authService.verifyUser(req, token)
            req.user = user;
        }

        next();
    }
}
