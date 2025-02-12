import { CreateUserDTO } from '../dtos/user.dto';
import { prisma } from '../libs/prisma';

class UserService {
  async getUsers() {
    return await prisma.user.findMany();
  }

  async createUser(data: CreateUserDTO) {
    return await prisma.user.create({ data });
  }
}

export default new UserService();
