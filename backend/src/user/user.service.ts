import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}
  async createUser(data: CreateUserDto) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(data.password, saltOrRounds);

    return await this.prismaService.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hash,
        verify: false,
      },
    });
  }
}
