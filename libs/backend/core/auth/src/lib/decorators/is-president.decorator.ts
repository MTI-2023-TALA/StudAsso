import { SetMetadata } from '@nestjs/common';

export const PRESIDENT_KEY = 'president_key';
export const IsPresident = () => SetMetadata(PRESIDENT_KEY, true);
