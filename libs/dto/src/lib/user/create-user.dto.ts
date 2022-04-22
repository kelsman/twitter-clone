import { ApiProperty } from '@nestjs/swagger';
import { CreateUser } from '@project/core';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateUserDto implements CreateUser {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ required: true, type: String, example: 'example@gmail.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String, example: 'password' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String, example: 'John Doe' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String, example: 'John Doe' })
  username: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, type: String, example: 'John Doe' })
  bio?: string;

  @IsString()
  @ApiProperty({
    required: false,
    type: String,
    example: 'https://example.com/avatar.png',
  })
  @IsOptional()
  profilePicture?: string;
}
