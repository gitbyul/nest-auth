import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReqUserSaveDto {
  @IsString()
  @ApiProperty({ description: 'User Email', example: 'test@test.com' })
  email: string;

  @IsString()
  @ApiProperty({ description: 'User Nickname', example: 'test' })
  nickname: string;

  @IsString()
  @ApiProperty({ description: 'User Password', example: 'test1234!@#$' })
  password: string;
}
