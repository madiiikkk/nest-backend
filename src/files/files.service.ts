import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { randomUUID } from 'crypto';

@Injectable()
export class FilesService {
	async createFile(file: Express.Multer.File): Promise<string> {
		try {
			const fileName = randomUUID() + path.extname(file.originalname);
			const filePath = path.resolve(process.cwd(), 'static');
			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, { recursive: true });
			}

			fs.writeFileSync(path.join(filePath, fileName), file.buffer);
			return fileName;
		} catch (e) {
			console.log(e);
			throw new HttpException(
				'Internal error',
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}
	}
}
