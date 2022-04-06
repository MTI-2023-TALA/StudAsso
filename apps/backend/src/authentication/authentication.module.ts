import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { GoogleStrategy } from './google.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, GoogleStrategy, ConfigService],
})
export class AuthenticationModule {}
