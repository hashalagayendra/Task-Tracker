import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from './user.service';
import { Response, Request } from 'express';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, user } = await this.userService.login(loginUserDto);
    res.cookie('Authentication', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    return { message: 'Login successful', user };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'Logout successful' })
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('Authentication');
    return { message: 'Logout successful' };
  }

  @Get('validate')
  @ApiOperation({ summary: 'Validate user token' })
  @ApiResponse({ status: 200, description: 'Token is valid' })
  async validate(@Req() req: Request) {
    const token = req.cookies['Authentication'];
    if (!token) {
      throw new UnauthorizedException('No token found');
    }
    return this.userService.validateToken(token);
  }
}
