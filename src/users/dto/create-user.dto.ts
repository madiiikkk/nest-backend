import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty({ example: 'user@mail.com', description: 'Email' })
	@IsString({ message: 'Must be a string' })
	@IsEmail({}, { message: 'Incorrect email' })
	readonly email: string;

	@ApiProperty({ example: 'Password@123', description: 'Password' })
	@IsString({ message: 'Must be a string' })
	@Length(4, 16, { message: 'More than 4 char and less than 16 char' })
	readonly password: string;
}
