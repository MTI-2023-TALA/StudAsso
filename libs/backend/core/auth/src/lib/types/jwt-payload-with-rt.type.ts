import { JwtPayload } from './jwt-payload.type';

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };
