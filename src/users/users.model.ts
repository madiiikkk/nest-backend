import { ApiProperty } from '@nestjs/swagger';
import {
	BelongsToMany,
	Column,
	DataType,
	HasMany,
	Model,
	Table
} from 'sequelize-typescript';
import { Role } from '../roles/roles.model.js';
import { UserRoles } from '../roles/user-roles.model.js';
import { Post } from '../posts/posts.model.js';

interface UserCreationAttrs {
	email: string;
	password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
	@ApiProperty({ example: '1', description: 'Unique id' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	})
	declare id: number;

	@ApiProperty({ example: 'example@test.com', description: 'Email address' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	declare email: string;

	@ApiProperty({ example: 'Password@123', description: 'User password' })
	@Column({ type: DataType.STRING, allowNull: false })
	declare password: string;

	@ApiProperty({
		example: 'true',
		description: 'Shows user account banned or not'
	})
	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	declare banned: boolean;

	@ApiProperty({ example: 'Banned for fraud', description: 'Ban reason' })
	@Column({ type: DataType.STRING, allowNull: true })
	declare banReason: string;

	@BelongsToMany(() => Role, () => UserRoles)
	declare roles: Role[];

	@HasMany(() => Post)
	posts: Post[];
}
