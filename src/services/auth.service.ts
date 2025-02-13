import { LoginDTO, RegisterDTO } from '../dtos/auth.dto';
import { prisma } from '../libs/prisma';

class AuthService {
  async register(data: RegisterDTO) {
    const { fullName, ...userData } = data;

    return await prisma.user.create({
      data: {
        ...userData,
        profile: {
          create: {
            fullName,
          },
        },
      },
    });
  }
}

export default new AuthService();
