import express from 'express';
import {HomeController} from '../../src/Controller/HomeController';

export const homeRouting = (app) => {
    const router = express.Router();
    const controller = new HomeController(app.logger);

    router.get('/', controller.indexAction.bind(controller));

    return router;
};
