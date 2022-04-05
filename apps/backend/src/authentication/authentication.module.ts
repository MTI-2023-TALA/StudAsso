import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, GoogleStrategy],
})
export class AuthenticationModule {}
