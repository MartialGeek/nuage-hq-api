import express from 'express';
import SecurityController from '../../src/Controller/SecurityController';

const securityRouting = (app) => {
    const router = express.Router();
    const controller = new SecurityController(app.user.service());

    router.post('/login', controller.loginAction.bind(controller));

    return router;
};

export default securityRouting;
