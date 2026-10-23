import {
	BelongsToMany,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript';
import { User } from '../users/users.model.js';
import { Role } from './roles.model.js';

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	})
	declare id: number;

	@ForeignKey(() => Role)
	@Column({ type: DataType.INTEGER })
	roleid: number;

	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userid: number;
}
