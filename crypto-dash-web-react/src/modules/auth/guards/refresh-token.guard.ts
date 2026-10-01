/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// guards/refreshToken.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { RefreshModel } from '../models/refresh.model';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token: string = request.cookies?.['refreshToken'];

    if (!token) {
      throw new UnauthorizedException('Refresh токен не найден в cookies');
    }

    try {
      const payload = await this.authService.verifyRefreshToken(token);

      const authModel: RefreshModel = {
        id: payload.sub,
        username: payload.username,
        refreshToken: token,
      };
      request['user'] = authModel;
    } catch {
      throw new UnauthorizedException('Невалидный или просроченный Refresh токен');
    }

    return true;
  }
}
