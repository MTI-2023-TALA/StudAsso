import { AssoIdOfUserDto, AuthDto, GoogleAuthDto, TokenDto } from '@stud-asso/shared/dtos';
import { BadRequestException, Body, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserId, Public, RtGuard } from '@stud-asso/backend-core-auth';

import { AuthService } from './auth.service';
import { SwaggerController } from '@stud-asso/backend/core/swagger';

@SwaggerController('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  async signupLocal(@Body() dto: AuthDto): Promise<TokenDto> {
    try {
      return await this.authService.signupLocal(dto);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  @Public()
  @Post('local/signin')
  async signinLocal(@Body() dto: AuthDto): Promise<TokenDto> {
    return this.authService.signinLocal(dto);
  }

  @Public()
  @Post('google/login')
  async googleLogin(@Body() dto: GoogleAuthDto): Promise<TokenDto> {
    const result = await this.authService.loginGoogleUser(dto.token);
    if (result) {
      return result;
    }
    throw new BadRequestException('Invalid Google Token');
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

  @Post('local/refreshWithAssoId')
  async refreshWithAssoId(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('email') userEmail: string,
    @Body() assoIdDto: AssoIdOfUserDto
  ): Promise<TokenDto> {
    return this.authService.refreshWithAssoId(userId, userEmail, assoIdDto.assoId);
  }
}
