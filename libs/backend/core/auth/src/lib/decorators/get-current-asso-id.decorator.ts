import { ExecutionContext, UnauthorizedException, createParamDecorator } from '@nestjs/common';

export const getCurrentUserAssociationId = (context: ExecutionContext): number => {
  const request = context.switchToHttp().getRequest();

  const assoId = request.user.assoId;
  if (!assoId) throw new UnauthorizedException();
  return assoId;
};

export const GetCurrentAssoId = createParamDecorator((_: undefined, context: ExecutionContext): number => {
  return getCurrentUserAssociationId(context);
});
