import { logger } from './logger';

const processCORSConfiguration = (config: string | undefined) => {
	switch (config) {
		case 'same-origin':
			return 'same-origin';
		case 'same-site':
			return 'same-site';
		case 'cross-origin':
			return 'cross-origin';
		default:
			logger.warn('Invalid or no CORS policy listed in .env file. Defaulting to same-site.');
			return 'same-site';
	}
};

const processKeyConfiguration = (key: string | undefined) => {
	if (!key) {
		logger.error('❌ Cannot start Kirlia: No Key specified in .env file.');
		process.exit(1);
	}

	return key.split(',').map((key) => key.trim());
};

export { processCORSConfiguration, processKeyConfiguration };
