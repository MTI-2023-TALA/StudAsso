import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { AzureStrategy } from './azure.strategy';

@Module({
  imports: [],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, AzureStrategy],
})
export class AuthenticationModule {}
