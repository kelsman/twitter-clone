import { ApiProperty } from '@nestjs/swagger';
import { GoogleUser } from '@project/core';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GoogleUserDto implements Partial<GoogleUser> {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Oauth provider',
    required: false,
  })
  provider?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Google user photo url',
    required: true,
    example: 'https://placeholder.com',
  })
  photoUrl?: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'example@outlook.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
  })
  authToken: string;
}
