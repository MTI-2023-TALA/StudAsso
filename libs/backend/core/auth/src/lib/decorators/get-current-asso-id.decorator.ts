import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const getCurrentUserAssociationId = (context: ExecutionContext): number => {
  const request = context.switchToHttp().getRequest();
  return request.user.assoId;
};

export const GetCurrentAssoId = createParamDecorator((_: undefined, context: ExecutionContext): number => {
  return getCurrentUserAssociationId(context);
});
