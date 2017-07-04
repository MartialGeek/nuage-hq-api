import express from 'express';
import {initRouting} from './app/routing';
import logger from 'winston';
import config from './app/parameters.js';
import couchdb from 'couchdb-promises';

const app = express();

// Main environment
app.env = process.env.APP_ENV || 'prod';
app.port = process.env.APP_PORT || config.port;
app.logger = logger;
app.logger.level = app.env === 'prod' ? 'info' : 'debug';
app.config = config;

// Services definition for dependency injection
const buildCoudbDbUrl = (config) => {
  let authString = '';

  if (config.couchdb.user.length > 0) {
    authString = `${config.couchdb.user}:${config.couchdb.password}@`;
  }

  return `${config.couchdb.scheme}://${authString}${config.couchdb.host}:${config.couchdb.port}`;
};

app.db = couchdb({
  baseUrl: buildCoudbDbUrl(config)
});

initRouting(app);

app.listen(app.port);
app.logger.info(`Running on http://localhost:${app.port} in the ${app.env} environment`);
