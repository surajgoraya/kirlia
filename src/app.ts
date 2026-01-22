import express, { type ErrorRequestHandler, type NextFunction, type Request, type Response } from 'express';
import helmet from 'helmet';
import path from 'path';

import { processCORSConfiguration, processGenericConfiguration, processKeyConfiguration } from './lib/configuration';
import { logger } from './lib/logger';
import { logRequests } from './lib/middleware/requestLogger';
import { getHealthInfo, getRandomGIF } from './lib/services';
import { templates } from './lib/templates';

const app = express();
const port = process.env.PORT || 3000;
app.use(
	helmet({
		crossOriginResourcePolicy: {
			policy: processCORSConfiguration(process.env.CORS_POLICY),
		},
	}),
);

const AUTHORIZED_KEYS = processKeyConfiguration(process.env.KEY);
if (processGenericConfiguration(process.env.IS_PROXIED)) {
	app.enable('trust proxy');
}
if (processGenericConfiguration(process.env.ACCESS_LOG)) {
	app.use(logRequests);
}

//static directory to serve our favicon
app.use(express.static(path.join(process.cwd(), 'src', 'assets')));

/**
 * Middleware to tell google to not index anything returned.
 */
app.use((req, res, next) => {
	res.setHeader('X-Robots-Tag', 'noindex');
	next();
});

app.get('/', async (req, res) => {
	if (req.query.key && AUTHORIZED_KEYS.includes(req.query.key.toString())) {
		const randomGIF = await getRandomGIF();

		if (randomGIF !== undefined) {
			res.setHeader('Cache-Control', 'no-cache');
			res.setHeader('Expires', '0');

			res.sendFile(randomGIF);
		} else {
			logger.error('Unable to get random GIF. More than likely the ./static folder is missing.');
			res.status(500).send(templates.errors.serverError);
		}
	} else {
		logger.warn('Unauthorized access. Requesting IP: ', req.ips.length ? req.ips : req.ip);
		res.status(401).send(templates.errors.notAuthorized);
	}
});

app.get('/health', (req, res) => {
	res.status(200).json(getHealthInfo());
});

//catch all route for 404s
app.use((req, res, next) => {
	res.status(404).send(templates.errors.notFound);
});

app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
	logger.error(
		`Uncaught Error! In ${req.url} - Serving 503.\n\n\t Please report this in GitHub issues. Error below:\n\t`,
		err,
	);
	res.status(503).send(templates.errors.serviceUnavailable);
});

app.listen(port, () => {
	logger.info(
		`Kirlia is listening on port ${port} - Online as of ${new Date().toLocaleDateString()} @ ${new Date().toLocaleTimeString()}`,
	);
});
