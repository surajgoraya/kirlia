import type { NextFunction, Request, Response } from 'express';
import { logger } from '../logger';

const logRequests = (request: Request, response: Response, next: NextFunction) => {
	logger.info(
		`${request.method.toUpperCase()}: ${request.originalUrl} - ${request.ips.length ? '[' + request.ips.join(', ') + ']' : request.ip}`,
	);
	next();
};

export { logRequests };
