import {
  IsString,
  IsNumber,
  IsOptional,
  ValidateNested,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class loginAdminDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class Super_admin_dto extends loginAdminDto {}
