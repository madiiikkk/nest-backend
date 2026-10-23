import { ApiProperty } from '@nestjs/swagger';

export class BanDto {
	readonly userId: number;

	readonly banReason: string;
}
