import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { JwtPayload } from '../types/jwt-payload.type';

export const getCurrentUserId = (context: ExecutionContext): number => {
  const request = context.switchToHttp().getRequest();
  const user = request.user as JwtPayload;
  return user.sub;
};

export const GetCurrentUserId = createParamDecorator((_: undefined, context: ExecutionContext): number => {
  return getCurrentUserId(context);
});
