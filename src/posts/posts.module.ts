import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from '../posts/posts.model.js';
import { PostsController } from './posts.controller.js';
import { PostsService } from './posts.service.js';
import { User } from '../users/users.model.js';
import { FilesModule } from '../files/files.module.js';

@Module({
	controllers: [PostsController],
	providers: [PostsService],
	imports: [SequelizeModule.forFeature([User, Post]), FilesModule]
})
export class PostsModule {}
