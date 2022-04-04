import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';

const clientID = '077eb444-be5d-4ee1-b6a5-d0acbc4b0f3d';
const tenantID = '3534b3d7-316c-4bc9-9ede-605c860f49d2';

/**
 * Extracts ID token from header and validates it.
 */
@Injectable()
export class AzureStrategy extends PassportStrategy(BearerStrategy, 'azure-ad') {
  constructor() {
    super({
      identityMetadata: `https://login.microsoftonline.com/${tenantID}/v2.0/.well-known/openid-configuration`,
      clientID,
    });
  }

  async validate(data) {
    return data;
  }
}
