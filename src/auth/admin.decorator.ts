import { SetMetadata } from '@nestjs/common';

export const ADMIN_AUTH_KEY = 'adminauth';
export const Admin = () => SetMetadata(ADMIN_AUTH_KEY, true);