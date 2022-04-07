import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { GoogleGuard } from './google.guard';
import { JwtGuard } from './jwt.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get()
  @UseGuards(GoogleGuard)
  async signInWithGoogle(@Req() req) {
    // guard will redirect to /redirect
  }

  @UseGuards(GoogleGuard)
  @Get('redirect')
  async signInWithGoogleRedirect(@Req() req) {
    return this.authenticationService.signInWithGoogle(req.user);
  }
}
