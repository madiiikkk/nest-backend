import {
	Body,
	Controller,
	Get,
	Post,
	UseGuards,
	UsePipes
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UsersService } from './users.service.js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles-auth.decorator.js';
import { AddRoleDto } from './dto/add-role.dto.js';
import { BanDto } from './dto/ban-user.dto.js';
import { ValidationPipe } from '../pipes/validation.pipe.js';

@ApiTags('Users')
@Controller('users')
export class UsersController {
	constructor(private userService: UsersService) {}

	@ApiOperation({ summary: 'Create user' })
	@ApiResponse({ status: 200, type: User })
	@UsePipes(ValidationPipe)
	@Post()
	create(@Body() userDto: CreateUserDto) {
		return this.userService.createUser(userDto);
	}

	@ApiOperation({ summary: 'Get all users' })
	@ApiResponse({ status: 200, type: [User] })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Get()
	getAll() {
		return this.userService.getAllUsers();
	}

	@ApiOperation({ summary: 'Admin can add roles' })
	@ApiResponse({ status: 200, type: [User] })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/role')
	addRole(@Body() dto: AddRoleDto) {
		return this.userService.addRole(dto);
	}

	@ApiOperation({ summary: 'Ban' })
	@ApiResponse({ status: 200, type: [User] })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/ban')
	ban(@Body() dto: BanDto) {
		return this.userService.ban(dto);
	}
}
