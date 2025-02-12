import { User } from '@prisma/client';

export type CreateUserDTO = Pick<User, 'email' | 'username' | 'password'>;
