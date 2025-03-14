import {
  Body,
  Controller,
  Get,
  HttpCode,
  Ip,
  Post
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ResponseEntity } from 'src/common/entity/response.entity';
import { AuthV1Service } from './auth.v1.service';
import { ReqUserLoginDto } from './dto/req.user.login.dto';
import { ReqUserSaveDto } from './dto/req.user.save.dto';
import { AuthCookies } from './enums/auth.cookies.enum';
import { AuthHeaders } from './enums/auth.headers.enum';

@Controller('api/v1/auth')
export class AuthV1Controller {
  constructor(private readonly authV1Service: AuthV1Service) {}

  @Get()
  helloAuthV1Controller(): string {
    return this.authV1Service.getHello();
  }

  @Post('/save')
  @HttpCode(200)
  @ApiOperation({ summary: '회원가입', description: '고객 회원가입' })
  async save(
    @Body() dto: ReqUserSaveDto,
    @Ip() requestIp: string,
  ): Promise<any> {
    const body = {
      userIdx: await this.authV1Service.save(dto, requestIp),
    };

    return ResponseEntity.of(null, null, body);
  }

  @Post('/login')
  @HttpCode(200)
  @ApiOperation({ summary: '로그인', description: '고객 로그인' })
  async login(
    @Body() dto: ReqUserLoginDto,
    @Ip() requestIp: string,
  ): Promise<any> {
    const { accessToken, refreshToken } = await this.authV1Service.login(
      dto,
      requestIp,
    );

    const headers = {
      [AuthHeaders.ACCESS_TOKEN]: accessToken,
    };

    const cookie = {
      [AuthCookies.REFRESH_TOKEN]: {
        val: refreshToken,
        cookieOptions: { maxAge: 7 * 24 * 60 * 60 * 1000 },
      },
    };

    return ResponseEntity.of(headers, cookie, null);
  }

  @Post('/logout')
  @HttpCode(200)
  @ApiOperation({ summary: '로그아웃', description: '고객 로그아웃' })
  async logout(@Ip() requestIp: string): Promise<any> {
    const cookie = {
      access_token: {
        val: '',
        cookieOptions: { maxAge: 0 },
      },
      refresh_token: {
        val: '',
        cookieOptions: { maxAge: 0 },
      },
    };

    return ResponseEntity.of(null, cookie, null);
  }
}
