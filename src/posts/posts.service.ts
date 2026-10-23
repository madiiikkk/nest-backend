import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto.js';
import { Post } from './posts.model.js';
import { FilesService } from '../files/files.service.js';

@Injectable()
export class PostsService {
	constructor(
		@InjectModel(Post) private postRepository: typeof Post,
		private fileService: FilesService
	) {}

	async create(dto: CreatePostDto, image: Express.Multer.File) {
		const fileName = await this.fileService.createFile(image);
		return this.postRepository.create({ ...dto, image: fileName });
	}
}
