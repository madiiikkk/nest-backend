import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module.js';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model.js';
import { RolesModule } from './roles/roles.module.js';
import { Role } from './roles/roles.model.js';
import { UserRoles } from './roles/user-roles.model.js';
import { AuthModule } from './auth/auth.module.js';
import { PostsModule } from './posts/posts.module.js';
import { Post } from './posts/posts.model.js';
import { FilesModule } from './files/files.module.js';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`
		}),
		ServeStaticModule.forRoot({
			rootPath: path.resolve(process.cwd(), 'static')
		}),
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			models: [User, Role, UserRoles, Post],
			autoLoadModels: true,
			sync: { alter: true }
		}),
		UsersModule,
		RolesModule,
		AuthModule,
		PostsModule,
		FilesModule
	]
})
export class AppModule {}
