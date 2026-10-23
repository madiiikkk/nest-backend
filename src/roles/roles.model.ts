import { ApiProperty } from '@nestjs/swagger';
import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table
} from 'sequelize-typescript';
import { User } from '../users/users.model.js';
import { UserRoles } from './user-roles.model.js';

interface RoleCreationAttrs {
	value: string;
	description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
	@ApiProperty({ example: '1', description: 'Unique id' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	})
	declare id: number;

	@ApiProperty({ example: 'ADMIN', description: 'Role of user' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	declare value: string;

	@ApiProperty({ example: 'DESCRIPTION', description: 'Description of role' })
	@Column({ type: DataType.STRING, allowNull: false })
	declare description: string;

	@BelongsToMany(() => User, () => UserRoles)
	declare users: User[];
}
