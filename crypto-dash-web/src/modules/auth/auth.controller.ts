import { BadRequestException, Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { Public } from '../../metas/public';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { LogoutModel } from './models/logout.model';
import { RefreshTokenResponse } from './models/refresh-token-response';
import { RefreshModel } from './models/refresh.model';
import { RegisterModel, RegisterResult } from './models/register.model';
import { LoginModel, UserLoginModel } from './models/user-login.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginModel: LoginModel, @Res({ passthrough: true }) res: Response): Promise<UserLoginModel> {
    const result = await this.authService.login(loginModel.email, loginModel.password);

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true только на production (работает по HTTPS)
      sameSite: 'lax', // Защита от CSRF-атак
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней в миллисекундах
    });
    return result.model;
  }

  @Public()
  @Post('register')
  async register(@Body() model: RegisterModel): Promise<RegisterResult> {
    const result = await this.authService.register(model.email, model.password);
    return new RegisterResult(result);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refreshToken')
  async refreshToken(@Req() req: Request): Promise<RefreshTokenResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const authModel: RefreshModel | undefined = req['user'];
    if (!authModel) {
      throw new BadRequestException();
    }
    return await this.authService.updateAccessToken(authModel.id, authModel.refreshToken);
  }

  @Post('logout')
  @Public()
  async logout(@Body() model: LogoutModel, @Res({ passthrough: true }) res: Response): Promise<void> {
    // await this.authService.logout((req['user'] as AuthModel).id);
    if (model.id) {
      await this.authService.logout(model.id);
    }

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Защита от CSRF-атак
    });
  }
}
