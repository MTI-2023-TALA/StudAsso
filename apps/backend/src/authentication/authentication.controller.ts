import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

import { AzureGuard } from './azure.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get()
  @UseGuards(AzureGuard)
  async azureAuth(@Req() req): Promise<string> {
    return this.authenticationService.getHello();
  }

  @Get('authentication/callback')
  @UseGuards(AzureGuard)
  azureGoogleRedirect(@Req() req) {
    return this.authenticationService.azureLogin(req);
  }
}
