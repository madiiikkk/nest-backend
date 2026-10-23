import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
	@IsString({ message: 'Must be a string' })
	readonly title: string;

	@IsString({ message: 'Must be a string' })
	readonly content: string;

	@Type(() => Number)
	@IsNumber({}, { message: 'Must be a number' })
	readonly userId: number;
}
