import { Controller, applyDecorators } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

export function SwaggerController(prefix: string) {
  return applyDecorators(Controller(prefix), ApiTags(prefix));
}
