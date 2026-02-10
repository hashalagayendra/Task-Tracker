import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async createUser(data: { name: string; email: string; password: string }) {
    return await this.prismaService.user.create({
      data: {
        name: data.name,
        email: data.email,
        dob: '01/01/2000',
      },
    });
  }
}
