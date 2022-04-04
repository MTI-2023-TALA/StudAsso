import { AuthGuard } from '@nestjs/passport';

export const AzureGuard = AuthGuard('azure-ad');
