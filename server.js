import express from 'express';
import {initRouting} from './app/routing';
import logger from 'winston';

const app = express();

app.env = process.env.APP_ENV || 'prod';
app.port = process.env.APP_PORT || 8080;
app.logger = logger;
app.logger.level = app.env === 'prod' ? 'info' : 'debug';

initRouting(app);

app.listen(app.port);
app.logger.info(`Running on http://localhost:${app.port} in the ${app.env} environment`);
