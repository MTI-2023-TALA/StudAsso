import { AuthDto, TokenDto } from '@stud-asso/shared/dtos';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserId, Public, RtGuard } from '@stud-asso/backend-core-auth';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  async signupLocal(@Body() dto: AuthDto): Promise<TokenDto> {
    return this.authService.signupLocal(dto);
  }

  @Public()
  @Post('local/signin')
  async signinLocal(@Body() dto: AuthDto): Promise<TokenDto> {
    return this.authService.signinLocal(dto);
  }

  @Post('logout')
  async logout(@GetCurrentUserId() userId: number): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  async refreshToken(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string
  ): Promise<TokenDto> {
    return this.authService.refreshToken(userId, refreshToken);
  }
}