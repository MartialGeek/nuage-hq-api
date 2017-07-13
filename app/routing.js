import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import homeRouting from './routing/home';
import expressJWT from 'express-jwt';
import securityRouting from './routing/security';

export const initRouting = (app) => {
    const router = express.Router();
    const logFormat = app.env === 'dev' ? 'dev' : 'combined';

    router.use(logger(logFormat));
    router.use(bodyParser.json());

    router.use(expressJWT({
      secret: app.config.security.secret
    }).unless({
      path: ['/login']
    }));

    app.use(router);
    app.use('/', homeRouting(app));
    app.use('/', securityRouting(app));
};
