import express from 'express';
import logger from 'morgan';
import homeRouting from './routing/home';

export const initRouting = (app) => {
    const router = express.Router();
    const logFormat = app.env === 'dev' ? 'dev' : 'combined';

    router.use(logger(logFormat));
    app.use(router);
    app.use('/', homeRouting(app));
};
