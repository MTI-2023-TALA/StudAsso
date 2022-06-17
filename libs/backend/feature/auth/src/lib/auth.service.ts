import * as argon from 'argon2';

import { AuthDto, TokenDto, UserDto } from '@stud-asso/shared/dtos';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@stud-asso/backend-core-auth';
import { JwtService } from '@nestjs/jwt';
import { PostgresError } from 'pg-error-enum';
import { UserRepository } from '@stud-asso/backend/core/repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
    private config: ConfigService
  ) {
    return;
  }

  async signupLocal(dto: AuthDto): Promise<TokenDto> {
    const hash = await argon.hash(dto.password);

    let user: UserDto;

    try {
      user = await this.userRepository.createUser(dto.email, dto.email, dto.email, false, hash);
    } catch (error) {
      if (error?.code === PostgresError.UNIQUE_VIOLATION) {
        throw new Error('Email already used');
      }
    }

    console.log(user);
    const tokens = await this._getTokens(user.id, dto.email);
    this._updateRtToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async signinLocal(dto: AuthDto): Promise<TokenDto> {
    const user = await this.userRepository.findOneByEmail(dto.email);
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const passwordMatches = await argon.verify(user.passwordHash, dto.password);
    if (!passwordMatches) {
      throw new Error('Access Denied');
    }

    const tokens = await this._getTokens(user.id, dto.email);
    await this._updateRtToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId: number): Promise<boolean> {
    await this.userRepository.updateRt(userId, null);
    return true;
  }

  async refreshToken(userId: number, rt: string): Promise<TokenDto> {
    const user = await this.userRepository.findOne(userId);
    if (!user || !user.rtHash) {
      throw new ForbiddenException('Access Denied');
    }

    const rtMatches = await argon.verify(user.rtHash, rt);
    if (!rtMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this._getTokens(user.id, user.email);
    await this._updateRtToken(user.id, tokens.refreshToken);

    return tokens;
  }

  private async _updateRtToken(userId: number, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.userRepository.updateRt(userId, hash);
  }

  private async _getTokens(userId: number, email: string): Promise<TokenDto> {
    const jwtPayload: JwtPayload = { sub: userId, email };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}
