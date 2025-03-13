import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UsersEntityDto {
  @IsString()
  @ApiProperty({ description: 'User Email(Encrypt)' })
  email: string;

  @IsString()
  @ApiProperty({ description: 'User Nickname' })
  nickname: string;

  @IsString()
  @ApiProperty({ description: 'Encrypt User Password(Bcrypt)' })
  password: string;

  @IsString()
  @ApiProperty({ description: 'Create Request Ip(Encrypt)' })
  createdIp: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Update Request Ip(Encrypt)' })
  updatedIp?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Update Request Ip(Encrypt)' })
  lastLoginIp?: string;
}
