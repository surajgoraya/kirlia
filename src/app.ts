import express from 'express';
import helmet from 'helmet';
import path from 'path';

import { processEnvironmentConfig } from '@/lib/configuration';
import { logger } from '@/lib/logger';
import { getHealthInfo, getRandomGIF } from '@/lib/services';
import { templates } from '@/lib/templates';

const app = express();
const port = process.env.PORT || 3000;

if (process.env.IS_PROXIED) {
	app.enable('trust proxy');
}

app.use(
	helmet({
		crossOriginResourcePolicy: {
			policy: processEnvironmentConfig({ config: process.env.CORS_POLICY }),
		},
	}),
);

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
	const randomGIF = await getRandomGIF();

	if (req.query.key && req.query.key === process.env.KEY) {
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

app.listen(port, () => {
	logger.info(
		`Kirlia is listening on port ${port} - Online as of ${new Date().toLocaleDateString()} @ ${new Date().toLocaleTimeString()}`,
	);
});
