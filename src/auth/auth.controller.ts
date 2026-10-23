import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { AuthService } from './auth.service.js';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/login')
	login(@Body() userLoginDto: CreateUserDto) {
		return this.authService.login(userLoginDto);
	}

	@Post('/registration')
	registration(@Body() userLoginDto: CreateUserDto) {
		return this.authService.registration(userLoginDto);
	}
}
