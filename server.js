import express from 'express';
import {initRouting} from './app/routing';
import config from './app/parameters.js';
import registerServices from './app/services';

const app = express();

// Main environment
app.env = process.env.APP_ENV || 'prod';
app.port = process.env.APP_PORT || config.port;
app.config = config;

registerServices(app);
initRouting(app);

app.listen(app.port);
app.logger.info(`Running on http://localhost:${app.port} in the ${app.env} environment`);
