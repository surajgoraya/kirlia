import { readdirSync } from 'fs';
import path from 'path';

import { logger } from './logger';

function getHealthInfo() {
	const files = readdirSync(path.join(process.cwd(), 'static')).length;
	const version = process.env.npm_package_version;

	return { status: 'alive', GIFs: files, appVersion: version };
}

function getRandomGIF() {
	try {
		const files = readdirSync(path.join(process.cwd(), 'static'));
		const randomIndex = Math.floor(Math.random() * files.length);
		const file = files[randomIndex];

		if (!file) {
			return undefined;
		}

		const filePath = path.join(process.cwd(), 'static', file);
		const fileExt = path.extname(filePath);

		if (fileExt.toLowerCase() !== '.gif') {
			logger.error('Static directory contains a non-GIF file.');
			return undefined;
		}

		return filePath;
	} catch {
		return undefined;
	}
}

export { getHealthInfo, getRandomGIF };
