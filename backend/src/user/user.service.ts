import { PrismaService } from './../prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
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

  async login(loginUserDto: LoginUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: loginUserDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async displayConfugrefiles() {
    return this.configService.get<string>('PORT');
  }
}
