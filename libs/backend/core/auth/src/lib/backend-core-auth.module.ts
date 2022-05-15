import { AtStrategy } from './strategies/at.strategy';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { RtStrategy } from './strategies/rt.strategy';

@Module({
  imports: [JwtModule.register({})],
  providers: [AtStrategy, RtStrategy],
  exports: [AtStrategy, RtStrategy, JwtModule.register({})],
})
export class BackendCoreAuthModule {}
