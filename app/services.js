import logger from 'winston';
import couchdb from 'couchdb-promises';
import UserValidator from '../src/User/UserValidator';
import UserRepository from '../src/User/UserRepository';
import UserService from '../src/User/UserService';
import UserEntityFactory from '../src/User/UserEntityFactory';
import UserCreate from '../src/Command/UserCreate';
import UuidV4Generator from '../src/Uuid/UuidV4Generator'
import uuidv4 from 'uuid/v4';
import validator from 'validator';

const buildCoudbDbUrl = (config) => {
  let authString = '';

  if (config.couchdb.user.length > 0) {
    authString = `${config.couchdb.user}:${config.couchdb.password}@`;
  }

  return `${config.couchdb.scheme}://${authString}${config.couchdb.host}:${config.couchdb.port}`;
};

const registerServices = (app) => {
  app.logger = logger;
  app.logger.level = app.env === 'prod' ? 'info' : 'debug';

  app.db = () => {
    return couchdb({
      baseUrl: buildCoudbDbUrl(app.config)
    })
  };

  app.user = {
    validator: () => {
      return new UserValidator();
    },
    repository: () => {
      return new UserRepository(app.db(), app.uuidGenerator(), app.user.entityFactory());
    },
    service: () => {
      return new UserService(app.user.repository(), app.user.validator());
    },
    entityFactory: () => {
      return new UserEntityFactory(app.user.validator());
    }
  }

  app.uuidGenerator = () => {
    return new UuidV4Generator(uuidv4);
  };

  app.cli = {
    userCreate: () => {
      return new UserCreate(validator, app.user.service());
    }
  };
};

export default registerServices;
