import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { GoogleGuard } from './google.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get()
  @UseGuards(GoogleGuard)
  async googleAuth(@Req() req) {
    // guard will redirect
  }

  @Get('redirect')
  @UseGuards(GoogleGuard)
  googleAuthRedirect(@Req() req) {
    return this.authenticationService.googleLogin(req);
  }
}
