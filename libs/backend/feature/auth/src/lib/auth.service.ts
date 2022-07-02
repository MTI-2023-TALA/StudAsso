import * as argon from 'argon2';

import { Auth, google } from 'googleapis';
import { AuthDto, TokenDto, UserDto } from '@stud-asso/shared/dtos';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '@stud-asso/backend-core-auth';
import { JwtService } from '@nestjs/jwt';
import { PostgresError } from 'pg-error-enum';
import { Prisma } from '@prisma/client';
import { UserRepository } from '@stud-asso/backend/core/repository';

@Injectable()
export class AuthService {
  private oauthClient: Auth.OAuth2Client;

  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
    private config: ConfigService
  ) {
    const clientId = config.get('GOOGLE_CLIENT_ID');
    const clientSecret = config.get('GOOGLE_CLIENT_SECRET');
    this.oauthClient = new google.auth.OAuth2(clientId, clientSecret);
  }

  async signupLocal(dto: AuthDto): Promise<TokenDto> {
    const hash = await argon.hash(dto.password);

    let user: UserDto;

    try {
      user = await this.userRepository.createUser(dto.email, dto.email, dto.email, false, hash);
    } catch (error) {
      console.log(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002' && error.meta.target[0] === 'email') {
          throw new Error('Email Already Used');
        }
      }
    }

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

  async loginGoogleUser(token: string): Promise<TokenDto | undefined> {
    const tokenInfo = await this.oauthClient.getTokenInfo(token);
    const user = await this.userRepository.findOneByEmail(tokenInfo.email);
    if (user) {
      const tokens = await this._getTokens(user.id, tokenInfo.email);
      await this._updateRtToken(user.id, tokens.refreshToken);
      return tokens;
    } else {
      const newUser = await this.userRepository.createUser(
        tokenInfo.email,
        tokenInfo.email,
        tokenInfo.email,
        false,
        null
      );
      const tokens = await this._getTokens(newUser.id, tokenInfo.email);
      await this._updateRtToken(newUser.id, tokens.refreshToken);
      return tokens;
    }
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

    const atExpiry = this.config.get<string>('AT_EXPIRY') || '15';
    const rtExpiry = this.config.get<string>('RT_EXPIRY') || '7';

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get('AT_SECRET'),
        expiresIn: `${atExpiry}m`,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: `${rtExpiry}d`,
      }),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}
