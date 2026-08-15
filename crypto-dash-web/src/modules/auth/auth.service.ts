import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user';
import { RefreshTokenResponse } from './models/refresh-token-response';
import { UserLoginModel } from './models/user-login.model';
import { UserService } from './user.service';

export type TokenPayload = {
  sub: string;
  username: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(email: string, password: string): Promise<{ model: UserLoginModel; refreshToken: string }> {
    const user = await this.userService.findByLogin(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException();
    }
    const payload = this.getPayload(user);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow('SECRET_REFRESH_TOKEN'),
      expiresIn: '7d',
    });
    await this.userService.update(user.id, { refreshToken: refreshToken });
    return {
      model: {
        id: user.id,
        email: user.email,
        accessToken: await this.getAccessToken(payload),
      },
      refreshToken,
    };
  }

  async register(email: string, password: string): Promise<boolean> {
    const newUser = await this.userService.create({ email, password });
    return !!newUser;
  }

  async logout(id: string): Promise<void> {
    await this.userService.update(id, { refreshToken: null });
  }

  async updateAccessToken(userId: string, refreshToken: string): Promise<RefreshTokenResponse> {
    const user = await this.userService.findOne(userId);
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException();
    }
    if (refreshToken !== user.refreshToken) {
      throw new UnauthorizedException();
    }
    const payload = this.getPayload(user);
    return { token: await this.getAccessToken(payload) };
  }

  async verifyToken(refreshToken: string): Promise<TokenPayload> {
    return await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.getOrThrow('SECRET_REFRESH_TOKEN'),
    });
  }

  private getPayload(user: User): TokenPayload {
    return { sub: user.id, username: user.email };
  }

  private async getAccessToken(payload: TokenPayload): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow('SECRET_ACCESS_TOKEN'),
      expiresIn: '2h',
    });
  }
}
