import express from 'express';
import HomeController from '../../src/Controller/HomeController';

const homeRouting = (app) => {
    const router = express.Router();
    const controller = new HomeController(app.logger, app.db());

    router.get('/', controller.indexAction.bind(controller));

    return router;
};

export default homeRouting;
