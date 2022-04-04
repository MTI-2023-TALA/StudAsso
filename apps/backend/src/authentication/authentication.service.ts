import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {
  getHello(): string {
    return 'Hello World!';
  }

  azureLogin(req) {
    if (!req.user) {
      return 'No user from Azure';
    }
    return {
      message: 'User Info from Azure',
      user: req.user,
    };
  }
}
